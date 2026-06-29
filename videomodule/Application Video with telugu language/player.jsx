/* ============================================================
   SUNO · Player · Quiz · Complete
   ============================================================ */

const SPEEDS = [0.8, 1, 1.25];

function Player({ catId, lessonId, lang, setLang, t, offline, onToggleOffline, onBack, onFinishWatch, notify }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  const lesson = cat.lessons.find((l) => l.id === lessonId);
  const segments = lesson.script || [];
  const [rate, setRate] = React.useState(1);
  const [cc, setCc] = React.useState(true);
  const audioNar = useAudioNarration(lesson.audioSrc || null, segments.length);
  const ttsNar = useNarration(audioNar ? [] : segments, lang, rate);
  const nar = audioNar || ttsNar;
  const voiceOk = audioNar ? true : hasVoice(lang);
  const offKey = `${catId}/${lessonId}`;
  const isOff = offline.has(offKey);

  // auto-start TTS narration; audio files require a user gesture so skip auto-play for those
  React.useEffect(() => {
    if (audioNar) return; // audio-backed lessons wait for the user to tap Play
    const id = setTimeout(() => nar.play(), 450);
    return () => clearTimeout(id);
    /* eslint-disable-next-line */
  }, []);

  const cur = segments[nar.index] || {};
  const curText = tx(cur, lang);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <IconButton icon="back" label="Back" onClick={() => { stopSpeaking(); onBack(); }} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={langClass(lang)} style={{ fontWeight: 800, fontSize: '1.05rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx(lesson.name, lang)}</div>
          <div className={langClass(lang)} style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', fontWeight: 600 }}>{tx(cat.name, lang)}</div>
        </div>
      </header>

      <div className="scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px 18px 32px' }}>
          {/* video + captions */}
          <div style={{ position: 'relative' }}>
            <VideoFrame icon={cat.icon} label={`${cat.id} / ${lesson.id}`} playing={nar.playing && !nar.finished}>
              {/* center play/pause */}
              {!nar.finished && (
                <button onClick={nar.toggle} aria-label={nar.playing ? t('pause') : t('play')} style={{
                  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', cursor: 'pointer',
                  background: nar.playing ? 'transparent' : 'rgba(14,26,36,.28)', border: 'none', transition: 'background .2s',
                }}>
                  {!nar.playing && (
                    <span style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)',
                      display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-3)', animation: 'suno-pop .3s both' }}>
                      <Icon name="play" size={40} />
                    </span>
                  )}
                </button>
              )}

              {/* end overlay */}
              {nar.finished && (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim)', backdropFilter: 'blur(3px)',
                  display: 'grid', placeItems: 'center', padding: 20 }}>
                  <div style={{ textAlign: 'center', color: '#fff', animation: 'suno-fade-up .35s both' }}>
                    <div style={{ width: 64, height: 64, margin: '0 auto 14px', borderRadius: '50%', background: 'var(--good)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)' }}>
                      <Icon name="check2" size={34} stroke={3} />
                    </div>
                    <div className={langClass(lang)} style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16 }}>{tx(STR.lessonComplete, lang)}</div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <BigButton kind="ghost" icon="replay" onClick={nar.play} style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1.5px solid rgba(255,255,255,.4)' }}>{t('replay')}</BigButton>
                      {lesson.quiz
                        ? <BigButton icon="badge" onClick={() => { stopSpeaking(); onFinishWatch(true); }}>{tx(STR.quizTitle, lang)}</BigButton>
                        : <BigButton icon="check2" onClick={() => { stopSpeaking(); onFinishWatch(false); }}>{t('done')}</BigButton>}
                    </div>
                  </div>
                </div>
              )}

              {/* caption overlay */}
              {cc && !nar.finished && curText && (
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '34px 18px 16px',
                  background: 'linear-gradient(transparent, rgba(8,16,22,.82))' }}>
                  <p key={nar.index} className={langClass(lang)} style={{ margin: '0 auto', maxWidth: 720, textAlign: 'center',
                    color: '#fff', fontSize: 'clamp(1.05rem, 2.6vw, 1.5rem)', fontWeight: 700, lineHeight: 1.4,
                    textShadow: '0 1px 8px rgba(0,0,0,.5)', animation: 'suno-fade-up .3s both' }}>{curText}</p>
                </div>
              )}
            </VideoFrame>
          </div>

          {/* timeline (segment cells) */}
          <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
            {segments.map((_, i) => {
              const fill = i < nar.index ? 1 : i === nar.index ? Math.max(0, Math.min(1, nar.progress * nar.total - i)) : 0;
              return (
                <button key={i} onClick={() => nar.goTo(i)} aria-label={`Section ${i + 1}`} style={{
                  flex: 1, height: 8, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer',
                  background: 'var(--line)', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: `${fill * 100}%`, background: 'var(--accent)', borderRadius: 999, transition: 'width .12s linear' }} />
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.78rem', color: 'var(--ink-faint)', fontWeight: 600 }}>
            <span>{Math.min(nar.index + 1, nar.total)} / {nar.total}</span>
            <span className={langClass(lang)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SpeakButton text={curText} lang={lang} size={28} title={t('replay')} /> {t('listen')}
            </span>
          </div>

          {/* controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 22, flexWrap: 'wrap' }}>
            <IconButton icon="replay" label={t('replay')} onClick={nar.replaySegment} size={54} />
            <button onClick={nar.toggle} aria-label={nar.playing ? t('pause') : t('play')} style={{
              width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)',
              border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)' }}>
              <Icon name={nar.playing ? 'pause' : 'play'} size={34} />
            </button>
            {/* speed */}
            <button onClick={() => setRate(SPEEDS[(SPEEDS.indexOf(rate) + 1) % SPEEDS.length])}
              title={t('speed')} style={{
                minWidth: 54, height: 54, borderRadius: 999, padding: '0 16px', border: '1.5px solid var(--line)',
                background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', fontWeight: 800, fontSize: '0.98rem',
                display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="speed" size={20} /> {rate}×
            </button>
            <IconButton icon="cc" label={t('captions')} onClick={() => setCc((v) => !v)} active={cc} size={54} />
          </div>

          {/* secondary actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18 }}>
            <BigButton size="sm" kind={isOff ? 'soft' : 'ghost'} icon={isOff ? 'check2' : 'download'} onClick={() => { onToggleOffline(offKey); notify(isOff ? tx(STR.download, lang) : tx(STR.offline, lang), 'check2'); }}>
              {isOff ? tx(STR.offline, lang) : tx(STR.download, lang)}
            </BigButton>
            <BigButton size="sm" kind="ghost" icon="share" onClick={() => notify(tx(STR.share, lang), 'share')}>{t('share')}</BigButton>
          </div>

          {/* voice note */}
          {audioNar ? (
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
              <Icon name="sound" size={16} />
              <span>AI voice narration · captions sync to audio</span>
            </div>
          ) : !voiceOk && (
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
              <Icon name="sound" size={16} />
              <span>Captions in {LANG_NAME[lang]} are timed; spoken voice uses this device's installed voices.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────
function Quiz({ catId, lessonId, lang, t, onDone, onBack }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  const lesson = cat.lessons.find((l) => l.id === lessonId);
  const quiz = lesson.quiz || [];
  const [qi, setQi] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [firstTry, setFirstTry] = React.useState(true);
  const [score, setScore] = React.useState(0);
  const q = quiz[qi];

  // read the question aloud whenever it changes
  React.useEffect(() => { const id = setTimeout(() => speakText(tx(q.q, lang), lang, 1), 350); return () => clearTimeout(id); }, [qi, lang]);

  const correctIdx = q.options.findIndex((o) => o.correct);
  const pick = (i) => {
    speakText(tx(q.options[i].label, lang), lang, 1);
    setPicked(i);
    if (i === correctIdx) { if (firstTry) setScore((s) => s + 1); }
    else setFirstTry(false);
  };
  const next = () => {
    if (qi + 1 >= quiz.length) { stopSpeaking(); onDone(score + (picked === correctIdx && firstTry ? 0 : 0), quiz.length); }
    else { setQi(qi + 1); setPicked(null); setFirstTry(true); }
  };
  const isRight = picked === correctIdx;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
        <IconButton icon="back" label="Back" onClick={() => { stopSpeaking(); onBack(); }} size={44} />
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {quiz.map((_, i) => (
            <span key={i} style={{ width: i === qi ? 26 : 9, height: 9, borderRadius: 999,
              background: i < qi ? 'var(--good)' : i === qi ? 'var(--accent)' : 'var(--line)', transition: 'all .3s' }} />
          ))}
        </div>
        <div style={{ width: 44 }} />
      </header>

      <div className="scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '8px 20px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className={langClass(lang)} style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{tx(STR.quizTitle, lang)}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0 26px' }}>
            <h1 key={qi} className={langClass(lang)} style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 800, margin: 0, textAlign: 'center', lineHeight: 1.3, animation: 'suno-fade-up .35s both' }}>{tx(q.q, lang)}</h1>
            <SpeakButton text={tx(q.q, lang)} lang={lang} size={44} />
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {q.options.map((o, i) => {
              const chosen = picked === i;
              const reveal = picked != null;
              const good = reveal && i === correctIdx;
              const bad = reveal && chosen && i !== correctIdx;
              return (
                <button key={i} onClick={() => (!isRight ? pick(i) : null)} disabled={isRight && !chosen} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 'var(--r-md)',
                  cursor: isRight ? 'default' : 'pointer', textAlign: 'left',
                  border: `2px solid ${good ? 'var(--good)' : bad ? 'var(--bad)' : 'var(--line)'}`,
                  background: good ? 'var(--good-wash)' : bad ? 'var(--bad-wash)' : 'var(--surface)',
                  boxShadow: 'var(--shadow-1)', transition: 'all .18s',
                  animation: bad ? 'suno-pop .3s' : 'none',
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--r-sm)', flexShrink: 0, display: 'grid', placeItems: 'center',
                    background: good ? 'var(--good)' : bad ? 'var(--bad)' : 'var(--accent-wash)',
                    color: good || bad ? '#fff' : 'var(--accent)' }}>
                    <Icon name={good ? 'check2' : bad ? 'x' : o.icon} size={28} stroke={2.4} />
                  </div>
                  <span className={langClass(lang)} style={{ flex: 1, fontSize: '1.12rem', fontWeight: 700 }}>{tx(o.label, lang)}</span>
                  <SpeakButton text={tx(o.label, lang)} lang={lang} size={36} />
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {picked != null && (
            <div style={{ marginTop: 22, textAlign: 'center', animation: 'suno-fade-up .3s both' }}>
              {isRight ? (
                <>
                  <div className={langClass(lang)} style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--good)', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Icon name="check2" size={24} stroke={3} /> {tx(STR.correct, lang)}
                  </div>
                  <BigButton icon="fwd" size="lg" onClick={next}>{qi + 1 >= quiz.length ? t('done') : t('next')}</BigButton>
                </>
              ) : (
                <div className={langClass(lang)} style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--bad)' }}>{tx(STR.tryAgain, lang)}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Complete ─────────────────────────────────────────────────
function Complete({ catId, lessonId, lang, t, score, totalQ, nextLesson, onReplay, onNext, onHome }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  const lesson = cat.lessons.find((l) => l.id === lessonId);
  const stars = totalQ ? Math.max(1, Math.round((score / totalQ) * 3)) : 3;
  React.useEffect(() => { const id = setTimeout(() => speakText(tx(STR.wellDone, lang), lang, 1), 400); return () => clearTimeout(id); }, []);
  return (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 460, animation: 'suno-fade-up .4s both' }}>
        <div style={{ width: 110, height: 110, margin: '0 auto 22px', borderRadius: '50%', background: 'var(--good)',
          display: 'grid', placeItems: 'center', color: '#fff', boxShadow: 'var(--shadow-3)', animation: 'suno-pop .5s both', position: 'relative' }}>
          <Icon name="trophy" size={56} stroke={2} />
          <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '3px solid var(--good)', opacity: 0.4, animation: 'suno-ripple 1.4s ease-out infinite' }} />
        </div>
        <h1 className={langClass(lang)} style={{ fontSize: '1.9rem', fontWeight: 800, margin: '0 0 6px' }}>{tx(STR.wellDone, lang)}</h1>
        <p className={langClass(lang)} style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', margin: '0 0 18px', fontWeight: 600 }}>{tx(lesson.name, lang)}</p>

        {totalQ > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 26 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ color: i < stars ? 'var(--warn)' : 'var(--line)', animation: `suno-pop .4s ${0.3 + i * 0.15}s both` }}>
                <Icon name="star" size={40} stroke={2} style={{ fill: i < stars ? 'var(--warn)' : 'none' }} />
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {nextLesson && <BigButton icon="fwd" size="lg" full onClick={onNext}>{tx(STR.nextLesson, lang)}</BigButton>}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <BigButton kind="ghost" icon="replay" onClick={onReplay}>{t('replay')}</BigButton>
            <BigButton kind="ghost" icon="home" onClick={onHome}>{t('backHome')}</BigButton>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Player, Quiz, Complete });
