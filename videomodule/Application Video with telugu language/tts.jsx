/* ============================================================
   SUNO · narration engine
   - Real text-to-speech via the Web Speech API (te-IN / hi-IN / en-IN)
   - A timer master-clock drives caption progression, so the lesson
     still "plays" with synced captions even when a device has no
     Telugu/Hindi voice installed. Speech is best-effort on top.
   ============================================================ */

const LANG_CODE = { te: 'te-IN', hi: 'hi-IN', en: 'en-IN' };

let _voices = [];
function _loadVoices() {
  try { _voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : []; }
  catch (e) { _voices = []; }
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  _loadVoices();
  window.speechSynthesis.onvoiceschanged = _loadVoices;
}

function pickVoice(lang) {
  const code = LANG_CODE[lang] || 'en-IN';
  const base = code.split('-')[0];
  // candidate voices for this language
  const cands = _voices.filter((v) => {
    const vl = (v.lang || '').replace('_', '-').toLowerCase();
    return vl === code.toLowerCase() || vl.startsWith(base + '-') || vl === base;
  });
  const pool = cands.length ? cands : (lang === 'en' ? _voices.filter((v) => (v.lang || '').toLowerCase().startsWith('en')) : []);
  if (!pool.length) return null;
  // rank: prefer natural / neural / online voices and a warm, expressive female timbre
  // (matching the reference — Jessica, “Eloquent”: smooth, measured, warm)
  const warm = /(jessica|samantha|aria|jenny|libby|sonia|neerja|swara|kavya|aditi|ananya|heera|priya|isha|kalpana|shruti|lekha|female|google)/i;
  const hq = /(natural|neural|online|enhanced|premium|google|wavenet)/i;
  const male = /(male|prabhat|hemant|madhur|ravi|guy|david|mark|george|liam)/i;
  const score = (v) => {
    let s = 0; const n = v.name || '';
    if (hq.test(n)) s += 6;
    if (!v.localService) s += 3;            // cloud voices are usually clearer
    if (warm.test(n)) s += 5;               // friendly, warm female timbre
    if (male.test(n)) s -= 4;               // steer away from male voices
    if ((v.lang || '').toLowerCase() === code.toLowerCase()) s += 2;
    return s;
  };
  return pool.slice().sort((a, b) => score(b) - score(a))[0];
}

// warm, friendly defaults tuned to the reference voice (smooth + measured)
const WARM_PITCH = 1.04;
const WARM_RATE = 0.9;
const VOICE_LABEL = 'Jessica · Eloquent (warm)';

// is a real voice available for this language?
function hasVoice(lang) { return !!pickVoice(lang); }

// estimate how long a caption segment should stay on screen (ms)
// matches the slightly-slower warm speaking rate so captions track the voice
// per-language speaking rate — Indic languages read slower for clarity
function effRate(lang, rate = 1) { return (rate || 1) * (lang === 'en' ? 0.92 : 0.78); }

function estimateMs(text, lang, rate) {
  const chars = (text || '').length;
  const ms = Math.min(11000, Math.max(2400, 850 + chars * 82));
  return ms / effRate(lang, rate);
}

// fire-and-forget speech (used by "Listen" + tap-to-hear labels)
function speakText(text, lang, rate = 1) {
  if (!window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_CODE[lang] || 'en-IN';
    const v = pickVoice(lang);
    if (v) u.voice = v;
    // slower + natural pitch for Telugu/Hindi clarity; warm for English
    u.rate = effRate(lang, rate);
    u.pitch = lang === 'en' ? 1.04 : 1.0;
    u.volume = 1;
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}
function stopSpeaking() { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }

// ── useNarration ─────────────────────────────────────────────
// Master clock = setTimeout per segment. Speech runs alongside.
function useNarration(segments, lang, rate) {
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0); // ms into current segment

  const timerRef = React.useRef(null);
  const tickRef = React.useRef(null);
  const startedAt = React.useRef(0);
  const remainingRef = React.useRef(0);
  const idxRef = React.useRef(0);
  const langRef = React.useRef(lang);
  const rateRef = React.useRef(rate);

  const total = segments.length;

  const clearTimers = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  };

  const runSegment = React.useCallback((i, ms) => {
    const seg = segments[i];
    if (!seg) return;
    const text = seg[langRef.current] || seg.en;
    const dur = ms != null ? ms : estimateMs(text, langRef.current, rateRef.current);
    remainingRef.current = dur;
    startedAt.current = Date.now();
    setElapsed(0);

    // best-effort speech
    speakText(text, langRef.current, rateRef.current);

    clearTimers();
    tickRef.current = setInterval(() => {
      setElapsed(Math.min(dur, Date.now() - startedAt.current));
    }, 90);
    timerRef.current = setTimeout(() => {
      const next = i + 1;
      if (next >= total) {
        clearTimers();
        stopSpeaking();
        setPlaying(false);
        setFinished(true);
        setElapsed(dur);
      } else {
        idxRef.current = next;
        setIndex(next);
        runSegment(next);
      }
    }, dur);
  }, [segments, total]);

  const play = React.useCallback(() => {
    if (finished) { // restart
      idxRef.current = 0; setIndex(0); setFinished(false);
      setPlaying(true); runSegment(0); return;
    }
    setPlaying(true);
    // resume mid-segment if we had remaining time
    if (remainingRef.current > 0 && elapsed > 0 && elapsed < remainingRef.current) {
      const rem = remainingRef.current - elapsed;
      runSegment(idxRef.current, rem);
    } else {
      runSegment(idxRef.current);
    }
  }, [finished, elapsed, runSegment]);

  const pause = React.useCallback(() => {
    setPlaying(false);
    clearTimers();
    stopSpeaking();
    // freeze elapsed
    setElapsed(Math.min(remainingRef.current, Date.now() - startedAt.current));
  }, []);

  const toggle = React.useCallback(() => { playing ? pause() : play(); }, [playing, pause, play]);

  const goTo = React.useCallback((i) => {
    const clamped = Math.max(0, Math.min(total - 1, i));
    idxRef.current = clamped; setIndex(clamped); setFinished(false);
    if (playing) runSegment(clamped);
    else { setElapsed(0); remainingRef.current = 0; }
  }, [playing, total, runSegment]);

  const replaySegment = React.useCallback(() => { goTo(idxRef.current); if (!playing) { setPlaying(true); runSegment(idxRef.current); } }, [goTo, playing, runSegment]);
  const restart = React.useCallback(() => { idxRef.current = 0; setIndex(0); setFinished(false); setElapsed(0); remainingRef.current = 0; clearTimers(); stopSpeaking(); setPlaying(false); }, []);

  // keep refs fresh; restart current segment on lang/rate change while playing
  React.useEffect(() => {
    const langChanged = langRef.current !== lang;
    const rateChanged = rateRef.current !== rate;
    langRef.current = lang; rateRef.current = rate;
    if ((langChanged || rateChanged) && playing) runSegment(idxRef.current);
    // eslint-disable-next-line
  }, [lang, rate]);

  React.useEffect(() => () => { clearTimers(); stopSpeaking(); }, []);

  const segDur = remainingRef.current || 1;
  const progress = total ? (index + Math.min(1, elapsed / segDur)) / total : 0;

  return { index, playing, finished, progress, total, play, pause, toggle, goTo, replaySegment, restart };
}

// ── useAudioNarration ─────────────────────────────────────────
// Drives caption progression from a real audio file's currentTime.
// Caption segments are divided evenly across the audio duration.
// Returns the same interface as useNarration so Player can swap transparently.
function useAudioNarration(audioSrc, total) {
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef(null);
  const totalRef = React.useRef(total);
  totalRef.current = total;

  React.useEffect(() => {
    if (!audioSrc) return;
    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const onTime = () => {
      const dur = audio.duration;
      if (!dur || !isFinite(dur)) return;
      const p = audio.currentTime / dur;
      setProgress(p);
      setIndex(Math.min(totalRef.current - 1, Math.floor(p * totalRef.current)));
    };
    const onEnded = () => { setPlaying(false); setFinished(true); setProgress(1); setIndex(totalRef.current - 1); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);
    return () => { audio.pause(); audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('ended', onEnded); };
  }, [audioSrc]);

  const play = React.useCallback(() => {
    if (!audioRef.current) return;
    if (finished) { audioRef.current.currentTime = 0; setFinished(false); setIndex(0); setProgress(0); }
    audioRef.current.play();
    setPlaying(true);
  }, [finished]);

  const pause = React.useCallback(() => { audioRef.current && audioRef.current.pause(); setPlaying(false); }, []);
  const toggle = React.useCallback(() => { playing ? pause() : play(); }, [playing, pause, play]);

  const goTo = React.useCallback((i) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || !isFinite(audio.duration)) return;
    const clamped = Math.max(0, Math.min(totalRef.current - 1, i));
    audio.currentTime = (clamped / totalRef.current) * audio.duration;
    setIndex(clamped); setFinished(false);
  }, []);

  const replaySegment = React.useCallback(() => goTo(index), [goTo, index]);
  const restart = React.useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause(); audioRef.current.currentTime = 0;
    setPlaying(false); setFinished(false); setIndex(0); setProgress(0);
  }, []);

  if (!audioSrc) return null;
  return { index, playing, finished, progress, total, play, pause, toggle, goTo, replaySegment, restart };
}

Object.assign(window, { useNarration, useAudioNarration, speakText, stopSpeaking, hasVoice, pickVoice, LANG_CODE, VOICE_LABEL, estimateMs });
