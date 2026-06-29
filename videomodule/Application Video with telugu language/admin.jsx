/* ============================================================
   SEATRACE · Training admin (no side-nav)
   Flow:  Video Library (upload + grid)  →  tap a video  →
          Video Editor (video plays on top, timestamped
          transcript editing live below, synced to playback).
   Dashboard (KPIs) + Completion report reachable via links.
   ============================================================ */

// ---------- time helpers ----------
const pad2 = (n) => String(n).padStart(2, '0');
const fmtTime = (sec) => `${pad2(Math.floor(sec / 60))}:${pad2(Math.floor(Math.max(0, sec) % 60))}`;
const parseTime = (str) => {
  const m = String(str).split(':').map(Number);
  if (m.length === 2) return (m[0] || 0) * 60 + (m[1] || 0);
  if (m.length === 3) return (m[0] || 0) * 3600 + (m[1] || 0) * 60 + (m[2] || 0);
  return Number(str) || 0;
};
function parseTranscript(raw) {
  const out = [];
  const blocks = raw.replace(/\r/g, '').split(/\n\s*\n/);
  const tc = /(\d{1,2}:)?\d{1,2}:\d{2}[.,]\d{1,3}\s*-->/;
  blocks.forEach((b) => {
    const lines = b.split('\n').map((l) => l.trim()).filter(Boolean);
    const tIdx = lines.findIndex((l) => tc.test(l));
    if (tIdx === -1) return;
    const startRaw = lines[tIdx].split('-->')[0].trim().replace(',', '.');
    const start = fmtTime(parseTime(startRaw.split('.')[0]));
    const text = lines.slice(tIdx + 1).join(' ');
    if (text) out.push({ start, text });
  });
  return out;
}

const L = (te, hi, en) => ({ start: '', te, hi, en });
const withTimes = (rows, gap = 6) => rows.map((r, i) => ({ ...r, start: fmtTime(i * gap) }));

// ---------- seed transcripts (timed, 3 languages) ----------
const ROWS_SHOES = [
  { start: '00:00', te: 'భద్రతా బూట్లు ఎందుకు ముఖ్యమో తెలుసుకుందాం.', hi: 'आइए जानें कि सुरक्षा जूते क्यों ज़रूरी हैं।', en: 'Let us learn why safety shoes are important.' },
  { start: '00:06', te: 'ప్లాంట్‌లోకి వెళ్లే ముందు ఎల్లప్పుడూ బూట్లు ధరించండి.', hi: 'प्लांट में जाने से पहले हमेशा जूते पहनें।', en: 'Always wear shoes before entering the plant.' },
  { start: '00:13', te: 'బూట్లు మీ పాదాలను పడే వస్తువుల నుండి కాపాడతాయి.', hi: 'जूते आपके पैरों को गिरने वाली चीज़ों से बचाते हैं।', en: 'Shoes protect your feet from falling objects.' },
  { start: '00:20', te: 'తడి నేలపై జారకుండా సరైన బూట్లు సాయపడతాయి.', hi: 'सही जूते गीली ज़मीन पर फिसलने से बचाते हैं।', en: 'Proper shoes stop you from slipping on wet floors.' },
];
const ROWS_HELMET = [
  { start: '00:00', te: 'నమస్కారం. మీ భద్రతా హెల్మెట్‌ను సరిగ్గా ఎలా ధరించాలో నేర్చుకోండి.', hi: 'नमस्ते। अपना सुरक्षा हेलमेट सही तरीके से पहनना सीखें।', en: 'Welcome. Learn how to wear your safety helmet correctly.' },
  { start: '00:07', te: 'మీ తలకు సరిపోయే హెల్మెట్‌ను ఎంచుకోండి.', hi: 'अपने सिर पर ठीक बैठने वाला हेलमेट चुनें।', en: 'Choose a helmet that fits your head well.' },
  { start: '00:14', te: 'నిటారుగా ఉంచి, ముందు భాగం ముందుకు ఉంచి, పట్టీ బిగించండి.', hi: 'इसे सीधा रखें, आगे का हिस्सा सामने रखें और स्ट्रैप कसें।', en: 'Place it straight, front forward, and tighten the strap.' },
  { start: '00:21', te: 'పని ముందు పగుళ్లు చూడండి. దెబ్బతిన్నదాన్ని మార్చండి.', hi: 'काम से पहले दरार जाँचें। क्षतिग्रस्त को बदलें।', en: 'Check for cracks before work. Replace a damaged helmet.' },
];
const ROWS_HANDWASH = [
  { start: '00:00', te: 'శుభ్రమైన చేతులు మన ఉత్పత్తిని సురక్షితంగా ఉంచుతాయి. సరిగ్గా కడుక్కుందాం.', hi: 'साफ़ हाथ हमारे उत्पाद को सुरक्षित रखते हैं। सही तरीके से धोएँ।', en: 'Clean hands keep our product safe. Let us wash correctly.' },
  { start: '00:06', te: 'మీ చేతులను శుభ్రమైన నీటితో తడపండి.', hi: 'अपने हाथ साफ़ पानी से गीला करें।', en: 'Wet your hands with clean water.' },
  { start: '00:12', te: 'సబ్బు రాసి కనీసం ఇరవై సెకన్లు రుద్దండి.', hi: 'साबुन लगाकर कम से कम बीस सेकंड रगड़ें।', en: 'Apply soap and rub for at least twenty seconds.' },
  { start: '00:19', te: 'వేళ్ల మధ్య శుభ్రం చేసి, కడిగి తుడవండి.', hi: 'उंगलियों के बीच साफ़ करें, फिर धोकर पोंछें।', en: 'Clean between fingers, then rinse and dry.' },
];
const ROWS_GLOVES = [
  { start: '00:00', te: 'చేతి గ్లౌజులను ఎప్పుడు, ఎలా ధరించాలో నేర్చుకోండి.', hi: 'हाथ के दस्ताने कब और कैसे पहनें, सीखें।', en: 'Learn when and how to wear hand gloves.' },
  { start: '00:06', te: 'పదునైన లేదా వేడి వస్తువులకు ముందు గ్లౌజులు ధరించండి.', hi: 'तेज़ या गरम चीज़ों से पहले दस्ताने पहनें।', en: 'Wear gloves before handling sharp or hot objects.' },
  { start: '00:12', te: 'గ్లౌజులు చిరిగితే కొత్త జత తీసుకోండి.', hi: 'दस्ताने फटे हों तो नई जोड़ी लें।', en: 'If gloves are torn, take a new pair.' },
];

const VIDEOS_INIT = [
  { id: 'v1', title: 'Wearing Safety Shoes', catId: 'safety', status: 'published', dur: '0:46', rows: ROWS_SHOES },
  { id: 'v2', title: 'Wearing a Safety Helmet', catId: 'safety', status: 'published', dur: '0:42', rows: ROWS_HELMET },
  { id: 'v3', title: 'Hand Washing', catId: 'hygiene', status: 'published', dur: '0:34', rows: ROWS_HANDWASH },
  { id: 'v4', title: 'Using Hand Gloves', catId: 'safety', status: 'draft', dur: '0:30', rows: ROWS_GLOVES },
];

// ===================================================================
//  ADMIN root
// ===================================================================
function Admin({ lang, setLang, notify, onExitToApp, onPickWorker }) {
  const [view, setView] = React.useState('library');
  const [videos, setVideos] = React.useState(VIDEOS_INIT);
  const [activeId, setActiveId] = React.useState(null);
  const active = videos.find((v) => v.id === activeId);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data && e.data.type === 'set_view') setView(e.data.view);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  React.useEffect(() => {
    window.parent.postMessage({ type: 'video_view_changed', view }, '*');
  }, [view]);

  const crumbBase = ['Home Screen', 'Training'];
  const crumb = view === 'library' ? [...crumbBase, 'Videos']
    : view === 'editor' ? [...crumbBase, 'Videos', active ? active.title : '']
    : view === 'dash' ? [...crumbBase, 'Dashboard']
    : [...crumbBase, 'Completion Report'];

  const addVideo = (file) => {
    const id = 'v' + Date.now();
    const title = file && file.name ? file.name.replace(/\.[^.]+$/, '') : 'Untitled training video';
    const src = file ? URL.createObjectURL(file) : null;
    const nv = { id, title, catId: 'safety', status: 'draft', dur: '0:00', src, rows: [{ start: '00:00', end: '00:05', te: '', hi: '', en: '' }], justAdded: true };
    setVideos((vs) => [nv, ...vs]);
    setActiveId(id);
    setView('editor');
    notify('Video added — set timestamps and captions below', 'check2');
  };
  const openVideo = (v) => { setActiveId(v.id); setVideos((vs) => vs.map((x) => x.id === v.id ? { ...x, justAdded: false } : x)); setView('editor'); };
  const saveVideo = (id, patch) => setVideos((vs) => vs.map((v) => v.id === id ? { ...v, ...patch } : v));

  return (
    <StShell onHome={() => setView('library')} onLogout={onExitToApp} breadcrumb={crumb} maxWidth={view === 'editor' ? 1640 : undefined} lang={lang} setLang={setLang}>
      {view === 'library' && <VideoLibrary lang={lang} videos={videos} onUpload={addVideo} onOpen={openVideo} onDash={() => setView('dash')} onReportGo={() => setView('report')} onPickWorker={onPickWorker} />}
      {view === 'editor' && active && <VideoEditor key={active.id} video={active} lang={lang} setLang={setLang} notify={notify}
        onBack={() => setView('library')} onSave={(patch) => { saveVideo(active.id, patch); notify('Saved', 'check2'); }} />}
      {view === 'dash' && <TrainingDash lang={lang} onBack={() => setView('library')} onNew={() => setView('library')} onReport={() => setView('report')} />}
      {view === 'report' && <CompletionReport lang={lang} onBack={() => setView('library')} />}
    </StShell>
  );
}

// ---------- metric helpers ----------
function matrixStats() {
  let completed = 0, inprog = 0, notstarted = 0, sum = 0, n = 0;
  PROGRESS_MATRIX.forEach((r) => CATEGORIES.forEach((c) => {
    const v = r.vals[c.id] || 0; sum += v; n++;
    if (v >= 100) completed++; else if (v > 0) inprog++; else notstarted++;
  }));
  return { completed, inprog, notstarted, avg: Math.round(sum / n) };
}
const empOverall = (r) => { const vals = CATEGORIES.map((c) => r.vals[c.id] || 0); return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length); };
const catName = (id, lang) => { const c = CATEGORIES.find((x) => x.id === id); return c ? tx(c.name, lang) : id; };
const catTint = (id) => { const c = CATEGORIES.find((x) => x.id === id); return c ? c.tint : 210; };

// ===================================================================
//  VIDEO LIBRARY  (opening screen)
// ===================================================================
function VideoLibrary({ lang, videos, onUpload, onOpen, onDash, onReportGo, onPickWorker }) {
  const fileRef = React.useRef(null);
  const pickFile = () => fileRef.current && fileRef.current.click();
  return (
    <div style={{ animation: 'suno-fade-up .4s both' }}>
      {/* full-width upload banner (priority) */}
      <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUpload(f); e.target.value = ''; }} />
      <button onClick={pickFile} style={{ width: '100%', border: '2px dashed var(--line)', borderRadius: 'var(--r-lg)',
        background: '#ffffff', cursor: 'pointer', padding: '46px 20px', marginBottom: 26,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: 'var(--ink)', transition: 'border-color .15s, background .15s' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-wash)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = '#ffffff'; }}>
        <Icon name="cloudup" size={48} stroke={1.8} style={{ color: 'var(--accent)' }} />
        <div style={{ fontWeight: 700, fontSize: 'var(--h2)' }}>Upload a Video</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--ink-faint)' }}>MP4 · up to 500 MB · opens for transcript editing right after upload</div>
      </button>

      <h2 style={{ fontSize: 'var(--h2)', fontWeight: 700, margin: '0 0 14px' }}>Your videos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 264px)', gap: 18, marginBottom: 26 }}>
        {videos.map((v) => {
          const langs = ['te', 'hi', 'en'].filter((lg) => v.rows.some((r) => (r[lg] || '').trim()));
          return (
            <button key={v.id} onClick={() => onOpen(v)} style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-lg)',
              width: '100%',
              border: v.justAdded ? '1.5px solid var(--accent)' : '1px solid var(--line)', background: 'var(--surface)', padding: 0,
              overflow: 'hidden', boxShadow: 'var(--shadow-1)', transition: 'transform .14s, box-shadow .14s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}>
              {/* thumb */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg-2)', display: 'grid', placeItems: 'center',
                color: `oklch(0.55 0.1 ${catTint(v.catId)})`,
                backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 12px, color-mix(in oklch, var(--line) 55%, transparent) 12px 13px)' }}>
                <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface)', display: 'grid', placeItems: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-2)' }}>
                  <Icon name="play" size={22} />
                </span>
                <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: 'rgba(15,23,36,.7)', padding: '2px 8px', borderRadius: 6 }}>{v.dur}</span>
                {v.justAdded && <span style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.68rem', fontWeight: 800, color: 'var(--on-accent)', background: 'var(--accent)', padding: '3px 8px', borderRadius: 999 }}>JUST ADDED</span>}
              </div>
              {/* meta */}
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, flexShrink: 0,
                    color: v.status === 'published' ? 'var(--good)' : 'var(--warn)', background: v.status === 'published' ? 'var(--good-wash)' : 'var(--warn-wash)' }}>
                    {v.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-faint)', marginTop: 3 }}>{catName(v.catId, lang)}</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
                  {langs.length ? langs.map((lg) => (
                    <span key={lg} className={langClass(lg)} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'var(--accent-wash)', color: 'var(--accent)' }}>{FLAG[lg]}</span>
                  )) : <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)', fontStyle: 'italic' }}>No transcript yet</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* who's watching — worker picker (start a lesson) */}
      {onPickWorker && (
        <div style={{ marginTop: 38 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 'var(--h2)', fontWeight: 700, margin: 0 }}>Who&rsquo;s watching?</h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--ink-faint)' }}>Tap your photo to start a lesson</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 264px)', gap: 18 }}>
            {EMPLOYEES.slice(0, 5).map((e) => (
              <button key={e.id} onClick={() => onPickWorker(e)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                padding: '18px 12px', borderRadius: 'var(--r-lg)', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-1)', transition: 'transform .14s, box-shadow .14s' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.transform = ''; ev.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}>
                <Avatar name={e.name} initials={e.initials} hue={e.hue} size={64} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{e.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{e.dept}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===================================================================
//  Caption timeline — drag to move, drag edges to resize (mouse)
// ===================================================================
function CaptionTimeline({ rows, setRows, tab, active, time, totalDur, onSeek, onSelect }) {
  const trackRef = React.useRef(null);
  const drag = React.useRef(null);
  const [, force] = React.useReducer((x) => x + 1, 0);
  const dur = Math.max(totalDur, 1);

  const pct = (sec) => `${Math.max(0, Math.min(100, (sec / dur) * 100))}%`;

  const onDown = (e, i, mode) => {
    e.preventDefault(); e.stopPropagation();
    const rect = trackRef.current.getBoundingClientRect();
    const r = rows[i];
    drag.current = { i, mode, rectLeft: rect.left, rectW: rect.width, startX: e.clientX, s0: parseTime(r.start), e0: parseTime(r.end || '') || parseTime(r.start) + 3 };
    onSelect && onSelect(i);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
  const onMove = (e) => {
    const d = drag.current; if (!d) return;
    const deltaSec = ((e.clientX - d.startX) / d.rectW) * dur;
    const MIN = 0.8;
    setRows((rs) => rs.map((r, idx) => {
      if (idx !== d.i) return r;
      let s = d.s0, en = d.e0;
      if (d.mode === 'move') { const len = d.e0 - d.s0; s = d.s0 + deltaSec; en = s + len; if (s < 0) { s = 0; en = len; } if (en > dur) { en = dur; s = dur - len; } }
      else if (d.mode === 'start') { s = Math.max(0, Math.min(d.e0 - MIN, d.s0 + deltaSec)); }
      else if (d.mode === 'end') { en = Math.min(dur, Math.max(d.s0 + MIN, d.e0 + deltaSec)); }
      return { ...r, start: fmtTime(s), end: fmtTime(en) };
    }));
    force();
  };
  const onUp = () => { drag.current = null; window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };

  const seekToX = (e) => {
    if (drag.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const sec = ((e.clientX - rect.left) / rect.width) * dur;
    onSeek && onSeek(sec);
  };

  // ruler ticks
  const step = dur <= 20 ? 2 : dur <= 60 ? 5 : 10;
  const ticks = []; for (let s = 0; s <= dur; s += step) ticks.push(s);

  return (
    <div style={{ padding: '4px 22px 16px' }}>
      {/* ruler */}
      <div style={{ position: 'relative', height: 18, marginLeft: 2, marginBottom: 4 }}>
        {ticks.map((s) => (
          <span key={s} style={{ position: 'absolute', left: pct(s), transform: 'translateX(-50%)', fontSize: '0.68rem', color: 'var(--ink-faint)', fontVariantNumeric: 'tabular-nums' }}>{fmtTime(s)}</span>
        ))}
      </div>
      {/* track */}
      <div ref={trackRef} onPointerDown={seekToX} style={{ position: 'relative', height: 56, borderRadius: 10, background: 'var(--surface-2)',
        border: '1px solid var(--line)', overflow: 'hidden', cursor: 'pointer',
        backgroundImage: ticks.map((s) => `linear-gradient(90deg, transparent calc(${(s / dur) * 100}% - 0.5px), var(--line-soft) calc(${(s / dur) * 100}%), transparent calc(${(s / dur) * 100}% + 0.5px))`).join(',') }}>
        {rows.map((r, i) => {
          const s = parseTime(r.start), en = parseTime(r.end || '') || s + 3;
          const isActive = i === active;
          const label = (r[tab] || '').trim() || `Line ${i + 1}`;
          return (
            <div key={i} onPointerDown={(e) => onDown(e, i, 'move')} title={label}
              style={{ position: 'absolute', top: 6, bottom: 6, left: pct(s), width: `calc(${((en - s) / dur) * 100}% )`,
                borderRadius: 7, background: isActive ? 'var(--accent)' : 'color-mix(in oklch, var(--accent) 60%, var(--surface))',
                color: '#fff', border: isActive ? '2px solid #fff' : '1px solid color-mix(in oklch, var(--accent) 75%, #000)',
                boxShadow: isActive ? 'var(--shadow-2)' : 'none', cursor: 'grab', display: 'flex', alignItems: 'center',
                padding: '0 9px', overflow: 'hidden', userSelect: 'none', touchAction: 'none' }}>
              {/* left handle */}
              <span onPointerDown={(e) => onDown(e, i, 'start')} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 9, cursor: 'ew-resize', background: 'rgba(255,255,255,.35)', borderRadius: '7px 0 0 7px' }} />
              <span className={langClass(tab)} style={{ fontSize: '0.74rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pointerEvents: 'none' }}>{label}</span>
              {/* right handle */}
              <span onPointerDown={(e) => onDown(e, i, 'end')} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 9, cursor: 'ew-resize', background: 'rgba(255,255,255,.35)', borderRadius: '0 7px 7px 0' }} />
            </div>
          );
        })}
        {/* playhead */}
        <div style={{ position: 'absolute', top: -2, bottom: -2, left: pct(time), width: 2, background: 'var(--bad)', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ position: 'absolute', top: -4, left: -5, width: 12, height: 10, borderRadius: 3, background: 'var(--bad)' }} />
        </div>
      </div>
      <div style={{ fontSize: '0.76rem', color: 'var(--ink-faint)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="mic" size={14} /> Drag a block to move it · drag its edges to change start &amp; end · click the track to seek
      </div>
    </div>
  );
}

// ===================================================================
//  VIDEO EDITOR — video plays on top, timestamped transcript below
// ===================================================================
function VideoEditor({ video, lang, setLang, notify, onBack, onSave }) {
  const [title, setTitle] = React.useState(video.title);
  const [catId, setCatId] = React.useState(video.catId);
  const [rows, setRows] = React.useState(video.rows.length ? video.rows : [{ start: '00:00', end: '00:05', te: '', hi: '', en: '' }]);
  // language is shared with the global top-bar switcher (single source of truth)
  const tab = lang; const setTab = setLang;
  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [videoDur, setVideoDur] = React.useState(0);
  const [importOpen, setImportOpen] = React.useState(false);
  const [srt, setSrt] = React.useState('');
  const [voiceOffset, setVoiceOffset] = React.useState(0);

  const hasVideo = !!video.src;
  const videoRef = React.useRef(null);
  const rowsRef = React.useRef(rows); rowsRef.current = rows;
  const tabRef = React.useRef(tab); tabRef.current = tab;
  const activeRef = React.useRef(0);
  const cutRef = React.useRef(false);
  const voiceOffsetRef = React.useRef(0); voiceOffsetRef.current = voiceOffset;
  const timerRef = React.useRef(null);
  const t0Ref = React.useRef(0);

  const starts = rows.map((r) => parseTime(r.start));
  const lastEnd = rows.length ? parseTime(rows[rows.length - 1].end || '') || (starts[starts.length - 1] + 5) : 5;
  const totalDur = hasVideo && videoDur ? videoDur : lastEnd;
  const endOf = (i) => rows[i].end || (rows[i + 1] ? rows[i + 1].start : fmtTime(parseTime(rows[i].start) + 5));

  const activeIdxAt = (sec, rws) => { let idx = 0; rws.forEach((r, i) => { if (parseTime(r.start) <= sec + 0.001) idx = i; }); return idx; };
  // offset scale: -0.75 (slowest) … 0 (neutral) … 1 (fastest)  ->  rate 0.25…2.0
  const baseRate = () => Math.max(0.25, 1 + voiceOffsetRef.current);
  const blockSecOf = (r) => Math.max(0.6, (parseTime(r.end || '') || parseTime(r.start) + 5) - parseTime(r.start));
  // rate that makes the line's voice fill exactly its block window
  const fitRate = (text, blockSec) => Math.max(0.5, Math.min(4, estimateMs(text || ' ', tabRef.current, 1) / (blockSec * 1000)));
  // during timed playback the voice ADJUSTS to the block: at least the user's speed,
  // faster if the block is short so it always fits the given time
  const speakIdx = (i) => {
    const r = rowsRef.current[i]; if (!r) return; cutRef.current = false;
    const text = r[tabRef.current] || '';
    const rate = Math.max(baseRate(), fitRate(text, blockSecOf(r)));
    speakText(text, tabRef.current, rate);
  };
  // cut the voice when the playhead passes the active line's END (so trimming a block trims the audio)
  const cutAtEnd = (sec, cur, idx) => {
    const endSec = parseTime(cur[idx]?.end || '') || (parseTime(cur[idx]?.start || 0) + 5);
    if (!cutRef.current && sec >= endSec) { stopSpeaking(); cutRef.current = true; }
  };

  // ---- mock clock (videos without a real file) ----
  const stopClock = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } stopSpeaking(); };
  const startClock = (fromSec) => {
    stopClock();
    t0Ref.current = Date.now() - fromSec * 1000;
    const startIdx = activeIdxAt(fromSec, rowsRef.current);
    activeRef.current = startIdx; setActive(startIdx); speakIdx(startIdx);
    timerRef.current = setInterval(() => {
      const sec = (Date.now() - t0Ref.current) / 1000;
      const cur = rowsRef.current;
      const dur = (parseTime(cur[cur.length - 1]?.end || '') || (parseTime(cur[cur.length - 1]?.start || 0) + 5));
      if (sec >= dur) { setTime(dur); setPlaying(false); stopClock(); return; }
      setTime(sec);
      const idx = activeIdxAt(sec, cur);
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); speakIdx(idx); }
      else { cutAtEnd(sec, cur, idx); }
    }, 100);
  };

  // ---- real <video> sync ----
  const onVideoTime = (ct) => {
    setTime(ct);
    const idx = activeIdxAt(ct, rowsRef.current);
    if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); speakIdx(idx); }
    else { cutAtEnd(ct, rowsRef.current, idx); }
  };

  const play = () => { if (hasVideo) { videoRef.current && videoRef.current.play(); } else { setPlaying(true); startClock(time >= totalDur ? 0 : time); } };
  const pause = () => { if (hasVideo) { videoRef.current && videoRef.current.pause(); } else { setPlaying(false); stopClock(); } };
  const toggle = () => (playing ? pause() : play());
  const seek = (i) => {
    const sec = parseTime(rows[i].start);
    setActive(i); activeRef.current = i; setTime(sec);
    if (hasVideo) { if (videoRef.current) videoRef.current.currentTime = sec; if (playing) speakIdx(i); }
    else if (playing) startClock(sec);
  };
  const restart = () => { if (hasVideo) { if (videoRef.current) videoRef.current.currentTime = 0; } else { setTime(0); setActive(0); activeRef.current = 0; if (playing) startClock(0); } };
  const seekSec = (sec) => {
    const clamped = Math.max(0, Math.min(totalDur, sec));
    setTime(clamped);
    const idx = activeIdxAt(clamped, rowsRef.current);
    setActive(idx); activeRef.current = idx;
    if (hasVideo) { if (videoRef.current) videoRef.current.currentTime = clamped; }
    else if (playing) startClock(clamped);
  };

  React.useEffect(() => () => stopClock(), []);
  React.useEffect(() => { if (playing) speakIdx(activeRef.current); /* eslint-disable-next-line */ }, [tab]);

  const setCell = (i, key, val) => setRows((rs) => rs.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  const addRow = () => setRows((rs) => { const st = rs.length ? parseTime(rs[rs.length - 1].end || '') || parseTime(rs[rs.length - 1].start) + 6 : 0; return [...rs, { start: fmtTime(st), end: fmtTime(st + 5), te: '', hi: '', en: '' }]; });
  const delRow = (i) => setRows((rs) => rs.length > 1 ? rs.filter((_, idx) => idx !== i) : rs);
  const listenAll = () => { pause(); restart(); setTimeout(play, 60); };
  const doImport = () => {
    const parsed = parseTranscript(srt);
    if (!parsed.length) { notify('No timecodes found', 'x'); return; }
    setRows(parsed.map((p, i, arr) => ({ start: p.start, end: arr[i + 1] ? arr[i + 1].start : fmtTime(parseTime(p.start) + 5), te: tab === 'te' ? p.text : '', hi: tab === 'hi' ? p.text : '', en: tab === 'en' ? p.text : '' })));
    setImportOpen(false); setSrt(''); notify(`Imported ${parsed.length} timed captions`, 'check2');
  };
  const langReady = (lg) => rows.some((r) => (r[lg] || '').trim());
  const curText = rows[active]?.[tab] || '';
  const COLS = '40px 80px 80px 1fr 70px';

  React.useEffect(() => {
    return () => { stopClock(); stopSpeaking(); };
  }, []);

  return (
    <div style={{ animation: 'suno-fade-up .4s both' }}>
      {/* ---- video player (top) ---- */}
      <StCard style={{ marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 22, alignItems: 'start' }} className="nv-grid">
          <div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--r-md)', overflow: 'hidden', background: hasVideo ? '#000' : 'var(--bg-2)' }}>
              {hasVideo ? (
                <video ref={videoRef} src={video.src} muted playsInline preload="metadata"
                  onLoadedMetadata={(e) => setVideoDur(e.target.duration || 0)}
                  onTimeUpdate={(e) => onVideoTime(e.target.currentTime)}
                  onPlay={() => { setPlaying(true); speakIdx(activeRef.current); }}
                  onPause={() => { setPlaying(false); stopSpeaking(); }}
                  onEnded={() => { setPlaying(false); stopSpeaking(); }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--ink-faint)',
                  backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklch, var(--line) 55%, transparent) 14px 15px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.7 }}>
                    <Icon name="film" size={52} stroke={1.5} />
                    <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem' }}>// {title}</code>
                  </div>
                </div>
              )}
              {playing && <SoundWave />}
              <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', cursor: 'pointer', background: playing ? 'transparent' : 'rgba(15,23,36,.28)', border: 'none' }}>
                {!playing && <span style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-3)' }}><Icon name="play" size={36} /></span>}
              </button>
              {curText && (
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '30px 16px 14px', background: 'linear-gradient(transparent, rgba(8,16,22,.82))', pointerEvents: 'none' }}>
                  <p key={active} className={langClass(tab)} style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 'clamp(.98rem, 2vw, 1.2rem)', fontWeight: 700, textShadow: '0 1px 8px rgba(0,0,0,.5)' }}>{curText}</p>
                </div>
              )}
            </div>
            {/* scrubber */}
            <div style={{ height: 8, borderRadius: 999, background: 'var(--line)', marginTop: 12, overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', width: `${Math.min(100, (time / (totalDur || 1)) * 100)}%`, background: 'var(--accent)', borderRadius: 999, transition: 'width .12s linear' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
              <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)' }}>
                <Icon name={playing ? 'pause' : 'play'} size={26} />
              </button>
              <button className="st-icon-btn" title="Restart" onClick={restart} style={{ width: 46, height: 46 }}><Icon name="replay" size={22} /></button>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-soft)', fontWeight: 600 }}>{fmtTime(time)} / {fmtTime(totalDur)}</span>
            </div>
          </div>

          {/* details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <StFieldRow label="Title"><input className="st-field" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '9px 12px' }} /></StFieldRow>
            <StFieldRow label="Topic">
              <select className="st-field" value={catId} onChange={(e) => setCatId(e.target.value)} style={{ padding: '9px 12px' }}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</select>
            </StFieldRow>
            <div style={{ display: 'flex', gap: 6 }}>
              {['te', 'hi', 'en'].map((lg) => (
                <span key={lg} className={langClass(lg)} style={{ flex: 1, textAlign: 'center', padding: '7px', borderRadius: 8, fontWeight: 700, fontSize: '0.78rem', background: langReady(lg) ? 'var(--good-wash)' : 'var(--surface-2)', color: langReady(lg) ? 'var(--good)' : 'var(--ink-faint)' }}>
                  {langReady(lg) && <Icon name="check2" size={12} stroke={3} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />}{LANG_NAME[lg]}
                </span>
              ))}
            </div>
            {/* voice speed */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink-soft)', marginBottom: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="mic" size={15} /> Voice speed</span>
                <span style={{ fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                  {voiceOffset === 0 ? 'Neutral' : `${voiceOffset > 0 ? '+' : ''}${voiceOffset}×`}
                </span>
              </div>
              <input type="range" min={-0.75} max={1} step={0.25} value={voiceOffset}
                onChange={(e) => { const v = parseFloat(e.target.value); setVoiceOffset(v); if (playing) { stopSpeaking(); cutRef.current = false; const r = rowsRef.current[activeRef.current]; if (r) speakText(r[tabRef.current] || '', tabRef.current, Math.max(0.25, 1 + v)); } }}
                style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--ink-faint)', marginTop: 2 }}>
                <span>Slower</span><span>Neutral</span><span>Fast</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--ink-faint)', marginTop: 8, lineHeight: 1.45 }}>
                The voice auto‑adjusts to fit each block — drag a block shorter on the timeline and the voice speeds up to fit that time.
              </div>
            </div>
          </div>
        </div>
      </StCard>

      {/* ---- timestamped transcript (below) ---- */}
      <StCard pad={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 'var(--h2)', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>Transcript &amp; Timestamps</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['te', 'hi', 'en'].map((lg) => (
              <button key={lg} onClick={() => setTab(lg)} className={langClass(lg)} style={{ padding: '7px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', background: tab === lg ? 'var(--accent)' : 'var(--surface-2)', color: tab === lg ? 'var(--on-accent)' : 'var(--ink-soft)' }}>{LANG_NAME[lg]}</button>
            ))}
            <StButton kind="outline" size="md" icon="upload" onClick={() => setImportOpen((v) => !v)}>Import .srt</StButton>
            <StButton kind="soft" size="md" icon="play" onClick={listenAll}>Play all</StButton>
          </div>
        </div>

        {importOpen && (
          <div style={{ margin: '0 22px 14px', padding: 14, borderRadius: 'var(--r-md)', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <textarea value={srt} onChange={(e) => setSrt(e.target.value)} rows={4} placeholder={'Paste .srt / .vtt here\n\n1\n00:00:00,000 --> 00:00:05,000\nWelcome to the lesson'} className="st-field" style={{ resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '0.82rem' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
              <StButton kind="outline" size="md" onClick={() => setImportOpen(false)}>Cancel</StButton>
              <StButton size="md" icon="check2" onClick={doImport}>Parse &amp; fill</StButton>
            </div>
          </div>
        )}

        {/* draggable timeline */}
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <CaptionTimeline rows={rows} setRows={setRows} tab={tab} active={active} time={time} totalDur={totalDur} onSeek={seekSec} onSelect={(i) => { setActive(i); activeRef.current = i; }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, padding: '10px 22px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-soft)', background: 'var(--surface-2)', borderTop: '1px solid var(--line)' }}>
          <span>#</span><span>Start</span><span>End</span><span>Caption ({LANG_NAME[tab]})</span><span style={{ textAlign: 'right' }}>Voice</span>
        </div>
        <div>
          {rows.map((r, i) => {
            const isActive = i === active;
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, padding: '10px 22px', alignItems: 'center',
                borderTop: '1px solid var(--line-soft)', background: isActive ? 'var(--accent-wash)' : 'transparent',
                boxShadow: isActive ? 'inset 3px 0 0 var(--accent)' : 'none', transition: 'background .15s' }}>
                <button onClick={() => seek(i)} title="Jump to" style={{ background: 'none', border: 'none', cursor: 'pointer', color: isActive ? 'var(--accent)' : 'var(--ink-faint)', fontWeight: 700, fontSize: '0.92rem' }}>{i + 1}</button>
                <input className="st-field" value={r.start} onChange={(e) => setCell(i, 'start', e.target.value)} style={{ padding: '8px 8px', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }} />
                <input className="st-field" value={endOf(i)} onChange={(e) => setCell(i, 'end', e.target.value)} style={{ padding: '8px 8px', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }} />
                <input className={`st-field ${langClass(tab)}`} value={r[tab] || ''} onChange={(e) => setCell(i, tab, e.target.value)} placeholder="Write here…" style={{ padding: '8px 12px' }} />
                <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button className="st-icon-btn" title="Listen (fits this block)" onClick={() => speakText(r[tab] || '', tab, Math.max(Math.max(0.25, 1 + voiceOffset), fitRate(r[tab] || '', blockSecOf(r))))} style={{ color: 'var(--accent)', width: 32, height: 32 }}><Icon name="sound" size={17} /></button>
                  <button className="st-icon-btn" title="Delete" onClick={() => delRow(i)} style={{ color: 'var(--ink-faint)', width: 32, height: 32 }}><Icon name="x" size={16} /></button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '12px 22px' }}>
          <StButton kind="soft" size="md" icon="plus" onClick={addRow}>Add line</StButton>
        </div>
      </StCard>

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <StButton kind="outline" size="lg" onClick={() => { stopClock(); stopSpeaking(); onBack(); }}>Cancel</StButton>
          <StButton size="lg" icon="check2" onClick={() => { stopClock(); stopSpeaking(); onSave({ title, catId, rows, status: 'published', dur: fmtTime(totalDur) }); }}>Save &amp; publish</StButton>
        </div>
      </div>
    </div>
  );
}

// ===================================================================
//  DASHBOARD (KPIs) — reachable via "Dashboard" link
// ===================================================================
function TrainingDash({ lang, onBack, onNew, onReport }) {
  const s = matrixStats();
  return (
    <div style={{ animation: 'suno-fade-up .4s both' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 18 }}>
        <StCard>
          <div style={{ fontSize: 'var(--h3)', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 10 }}>Completion Rate</div>
          <div style={{ fontSize: '3.4rem', fontWeight: 700, lineHeight: 1 }}>{s.avg}%</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, color: 'var(--good)', fontWeight: 600, fontSize: '0.92rem' }}>
            <span style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '9px solid var(--good)' }} />Up 6% since last onboarding batch
          </div>
        </StCard>
        <StCard>
          <div style={{ fontSize: 'var(--h3)', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 10 }}>Lessons Tracking</div>
          <div style={{ fontSize: '3.4rem', fontWeight: 700, lineHeight: 1 }}>{Math.round((s.completed + s.inprog) / (s.completed + s.inprog + s.notstarted) * 100)}%</div>
          <div style={{ height: 9, borderRadius: 999, background: 'var(--line)', overflow: 'hidden', marginTop: 16 }}>
            <span style={{ display: 'block', height: '100%', width: `${Math.round((s.completed + s.inprog) / (s.completed + s.inprog + s.notstarted) * 100)}%`, background: 'var(--accent)', borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: '0.86rem', color: 'var(--ink-soft)', marginTop: 10, fontWeight: 500 }}>{s.completed + s.inprog} of {s.completed + s.inprog + s.notstarted} lessons on track</div>
        </StCard>
        <StCard>
          <div style={{ fontSize: 'var(--h3)', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 14 }}>Total Languages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['te', 20], ['hi', 4], ['en', 5]].map(([lg, n]) => (
              <div key={lg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span className={langClass(lg)} style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: '0.78rem', fontWeight: 800, background: 'var(--accent-wash)', color: 'var(--accent)' }}>{FLAG[lg]}</span>
                  <span className={langClass(lg)} style={{ fontWeight: 600, fontSize: '0.82rem' }}>{LANG_NAME[lg]}</span>
                </span>
                <span><b style={{ fontSize: '1.35rem', fontWeight: 700 }}>{n}</b> <span style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>people</span></span>
              </div>
            ))}
          </div>
        </StCard>
        <StCard>
          <div style={{ fontSize: 'var(--h3)', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 16 }}>Module Status</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
            {[['Completed', s.completed, 'var(--good)'], ['In-progress', s.inprog, 'var(--warn)'], ['Not started', s.notstarted, 'var(--ink-faint)']].map(([l, v, c]) => (
              <div key={l}><div style={{ fontSize: '2.6rem', fontWeight: 700, lineHeight: 1, color: c }}>{v}</div><div style={{ fontSize: '0.86rem', color: 'var(--ink-soft)', marginTop: 8, fontWeight: 500 }}>{l}</div></div>
            ))}
          </div>
        </StCard>
      </div>
      <StCard pad={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
          <h2 style={{ fontSize: 'var(--h2)', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>Training Completion</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="st-table">
            <thead><tr>
              <th>Employee</th><th>Department</th>
              {CATEGORIES.map((c) => <th key={c.id} className={langClass(lang)} style={{ textAlign: 'center' }}>{tx(c.name, lang)}</th>)}
              <th>Status</th><th style={{ textAlign: 'center' }}>Overall</th>
            </tr></thead>
            <tbody>
              {PROGRESS_MATRIX.map((r) => {
                const emp = EMPLOYEES.find((e) => e.id === r.id); const o = empOverall(r);
                const st = o >= 80 ? ['On track', 'var(--good)', 'var(--good-wash)'] : o >= 40 ? ['In progress', 'var(--warn)', 'var(--warn-wash)'] : ['Behind', 'var(--bad)', 'var(--bad-wash)'];
                return (
                  <tr key={r.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 11 }}><Avatar name={emp.name} initials={emp.initials} hue={emp.hue} size={36} /><span style={{ fontWeight: 600 }}>{emp.name}</span></div></td>
                    <td style={{ color: 'var(--ink-soft)' }}>{emp.dept}</td>
                    {CATEGORIES.map((c) => {
                      const v = r.vals[c.id] || 0;
                      const col = v >= 100 ? 'var(--good)' : v >= 50 ? 'var(--accent)' : v > 0 ? 'var(--warn)' : 'var(--ink-faint)';
                      const bg = v >= 100 ? 'var(--good-wash)' : v >= 50 ? 'var(--accent-wash)' : v > 0 ? 'var(--warn-wash)' : 'transparent';
                      return <td key={c.id} style={{ textAlign: 'center' }}><span style={{ display: 'inline-block', minWidth: 46, padding: '5px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.82rem', color: col, background: bg }}>{v}%</span></td>;
                    })}
                    <td><span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '5px 11px', borderRadius: 999, color: st[1], background: st[2] }}>{st[0]}</span></td>
                    <td style={{ textAlign: 'center' }}><ProgressRing value={o} size={42} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </StCard>
    </div>
  );
}

// ===================================================================
//  COMPLETION REPORT
// ===================================================================
function CompletionReport({ lang, onBack }) {
  return (
    <div style={{ animation: 'suno-fade-up .4s both' }}>
      <StCard pad={0}>
        <div style={{ overflowX: 'auto' }}>
          <table className="st-table">
            <thead><tr><th>Employee</th><th>Department</th>{CATEGORIES.map((c) => <th key={c.id} className={langClass(lang)} style={{ textAlign: 'center' }}>{tx(c.name, lang)}</th>)}<th style={{ textAlign: 'center' }}>Overall</th></tr></thead>
            <tbody>
              {PROGRESS_MATRIX.map((r) => {
                const emp = EMPLOYEES.find((e) => e.id === r.id); const o = empOverall(r);
                return (
                  <tr key={r.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 11 }}><Avatar name={emp.name} initials={emp.initials} hue={emp.hue} size={34} /><span style={{ fontWeight: 600 }}>{emp.name}</span></div></td>
                    <td style={{ color: 'var(--ink-soft)' }}>{emp.dept}</td>
                    {CATEGORIES.map((c) => {
                      const v = r.vals[c.id] || 0;
                      const col = v >= 100 ? 'var(--good)' : v >= 50 ? 'var(--accent)' : v > 0 ? 'var(--warn)' : 'var(--ink-faint)';
                      const bg = v >= 100 ? 'var(--good-wash)' : v >= 50 ? 'var(--accent-wash)' : v > 0 ? 'var(--warn-wash)' : 'transparent';
                      return <td key={c.id} style={{ textAlign: 'center' }}><span style={{ display: 'inline-block', minWidth: 46, padding: '5px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.82rem', color: col, background: bg }}>{v}%</span></td>;
                    })}
                    <td style={{ textAlign: 'center' }}><ProgressRing value={o} size={42} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </StCard>
    </div>
  );
}

Object.assign(window, { Admin });
