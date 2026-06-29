/* ============================================================
   SUNO · employee flow — Sign-in · Home · Category
   ============================================================ */

// ── Sign-in: tap your face (no typing) ───────────────────────
function SignIn({ lang, setLang, onPick, onSupervisor }) {
  return (
    <div className="scroll" style={{ height: '100%', overflowY: 'auto', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 20px 40px', minHeight: '100%',
        display: 'flex', flexDirection: 'column' }}>

        <div style={{ textAlign: 'center', margin: '10px 0 22px', animation: 'suno-fade-up .5s both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <h1 className={langClass(lang)} style={{ fontSize: '1.55rem', fontWeight: 800, margin: 0, letterSpacing: '-.01em' }}>
              {tx(STR.whoText, lang)}
            </h1>
            <SpeakButton text={tx(STR.whoText, lang)} lang={lang} title="Listen" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {EMPLOYEES.map((e, i) => (
            <button key={e.id} onClick={() => onPick(e)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '22px 14px', borderRadius: 'var(--r-lg)', cursor: 'pointer',
              background: 'var(--surface)', border: '1.5px solid var(--line)', boxShadow: 'var(--shadow-1)',
              transition: 'transform .14s, box-shadow .14s', animation: `suno-fade-up .5s ${i * 0.05}s both`,
            }}
              onMouseEnter={(ev) => { ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
              onMouseLeave={(ev) => { ev.currentTarget.style.transform = ''; ev.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}>
              <Avatar name={e.name} initials={e.initials} hue={e.hue} size={74} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{e.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>{e.dept}</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 30, display: 'flex', justifyContent: 'center' }}>
          <button onClick={onSupervisor} style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, padding: '11px 20px', borderRadius: 999,
            background: 'transparent', border: '1.5px solid var(--line)', color: 'var(--ink-soft)',
            fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer',
          }}>
            <Icon name="lock" size={18} /> {tx(STR.supervisor, lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── brand mark (SEATRACE logo + Training tag) ────────────────
function Brand({ lang, size = 'md' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <StLogo size={size === 'lg' ? 40 : 32} />
      <span className="brand-tag" style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--accent)',
        background: 'var(--accent-wash)', padding: '3px 9px', borderRadius: 999, letterSpacing: '.05em' }}>TRAINING</span>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────
function Home({ employee, lang, setLang, t, labelMode, progress, completed, onOpenCategory, onOpenLesson, onLogout, continueLesson }) {
  const showText = labelMode === 'both';
  return (
    <div className="scroll" style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ padding: '24px 0 48px' }}>

        {/* continue card */}
        {continueLesson && (
          <button onClick={() => onOpenLesson(continueLesson.catId, continueLesson.lesson.id)} style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', marginBottom: 30,
            borderRadius: 'var(--r-lg)', padding: 18, display: 'flex', alignItems: 'center', gap: 18,
            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklch, var(--accent) 78%, #000))',
            color: 'var(--on-accent)', boxShadow: 'var(--shadow-2)', animation: 'suno-fade-up .45s both',
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 'var(--r-md)', background: 'rgba(255,255,255,.18)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon name="play" size={30} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.85, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }} className={langClass(lang)}>{t('continue')}</div>
              <div className={langClass(lang)} style={{ fontSize: '1.22rem', fontWeight: 800, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx(continueLesson.lesson.name, lang)}</div>
            </div>
            <Icon name="fwd" size={26} style={{ opacity: 0.9 }} />
          </button>
        )}

        {/* topics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <h2 className={langClass(lang)} style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0 }}>{t('topics')}</h2>
          <SpeakButton text={tx(STR.topics, lang)} lang={lang} size={32} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {CATEGORIES.map((c, i) => {
            const pct = progress[c.id] || 0;
            const total = c.lessons.length;
            const doneN = c.lessons.filter((l) => completed.has(`${c.id}/${l.id}`)).length;
            return (
              <div key={c.id} style={{ animation: `suno-fade-up .45s ${i * 0.05}s both` }}>
                <div role="button" tabIndex={0} onClick={() => onOpenCategory(c.id)}
                  onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onOpenCategory(c.id); } }} style={{
                  width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-lg)', padding: 18,
                  background: 'var(--surface)', border: '1.5px solid var(--line)', boxShadow: 'var(--shadow-1)',
                  display: 'flex', flexDirection: 'column', gap: 14, transition: 'transform .14s, box-shadow .14s',
                }}
                  onMouseEnter={(ev) => { ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
                  onMouseLeave={(ev) => { ev.currentTarget.style.transform = ''; ev.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center',
                      background: `oklch(0.95 0.04 ${c.tint})`, color: `oklch(0.5 0.13 ${c.tint})` }}>
                      <Icon name={c.icon} size={30} stroke={2} />
                    </div>
                    <ProgressRing value={pct} size={44} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className={langClass(lang)} style={{ fontWeight: 800, fontSize: '1.18rem', flex: 1, lineHeight: 1.15 }}>{tx(c.name, lang)}</div>
                    <SpeakButton text={tx(c.name, lang)} lang={lang} size={34} />
                  </div>
                  <div className={langClass(lang)} style={{ fontSize: '0.86rem', color: 'var(--ink-faint)', fontWeight: 600 }}>
                    {doneN}/{total} {t('lessons')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Category → list of lessons ───────────────────────────────
function CategoryScreen({ catId, lang, t, completed, offline, isAccessible, onBack, onOpenLesson, onToggleOffline, notify }) {
  const c = CATEGORIES.find((x) => x.id === catId);
  const doneN = c.lessons.filter((l) => completed.has(`${c.id}/${l.id}`)).length;
  return (
    <div className="scroll" style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ padding: '18px 0 44px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <IconButton icon="back" label="Back" onClick={onBack} />
          <div style={{ width: 50, height: 50, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center',
            background: `oklch(0.95 0.04 ${c.tint})`, color: `oklch(0.5 0.13 ${c.tint})` }}>
            <Icon name={c.icon} size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 className={langClass(lang)} style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>{tx(c.name, lang)}</h1>
            <div className={langClass(lang)} style={{ fontSize: '0.84rem', color: 'var(--ink-faint)', fontWeight: 600 }}>{doneN}/{c.lessons.length} {t('lessons')} · {t('done')}</div>
          </div>
          <SpeakButton text={tx(c.name, lang)} lang={lang} />
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {c.lessons.map((l, i) => {
            const isDone = completed.has(`${c.id}/${l.id}`);
            const access = isAccessible(c, i);
            const isOff = offline.has(`${c.id}/${l.id}`);
            return (
              <div key={l.id} style={{ animation: `suno-fade-up .4s ${i * 0.05}s both` }}>
                <button
                  onClick={() => access ? onOpenLesson(c.id, l.id) : notify(tx(STR.watchFirst, lang), 'lock')}
                  style={{
                    width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-md)', padding: 12,
                    display: 'flex', alignItems: 'center', gap: 14, border: '1.5px solid var(--line)',
                    background: access ? 'var(--surface)' : 'var(--surface-2)', opacity: access ? 1 : 0.72,
                    boxShadow: 'var(--shadow-1)', transition: 'transform .12s',
                  }}
                  onMouseDown={(ev) => access && (ev.currentTarget.style.transform = 'scale(.99)')}
                  onMouseUp={(ev) => (ev.currentTarget.style.transform = '')}
                  onMouseLeave={(ev) => (ev.currentTarget.style.transform = '')}>
                  {/* thumb */}
                  <div style={{ width: 96, flexShrink: 0, position: 'relative' }}>
                    <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 10, overflow: 'hidden',
                      background: 'var(--bg-2)', display: 'grid', placeItems: 'center', color: 'var(--ink-faint)',
                      backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 8px, color-mix(in oklch, var(--line) 55%, transparent) 8px 9px)' }}>
                      {access ? <Icon name="play" size={22} /> : <Icon name="lock" size={20} />}
                    </div>
                  </div>
                  {/* text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={langClass(lang)} style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.2 }}>{tx(l.name, lang)}</div>
                    <div className={langClass(lang)} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--ink-faint)', fontWeight: 600, marginTop: 4 }}>
                      <Icon name="clock" size={15} /> {l.min} {t('min')}
                      {!access && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>· <Icon name="lock" size={13} /> {t('locked')}</span>}
                    </div>
                  </div>
                  {/* right status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {access && (
                      <span onClick={(e) => { e.stopPropagation(); onToggleOffline(`${c.id}/${l.id}`); }}
                        title={isOff ? tx(STR.offline, lang) : tx(STR.download, lang)} style={{
                          width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center',
                          color: isOff ? 'var(--good)' : 'var(--ink-faint)', cursor: 'pointer',
                          background: isOff ? 'var(--good-wash)' : 'transparent' }}>
                        <Icon name={isOff ? 'check2' : 'download'} size={20} stroke={2.2} />
                      </span>
                    )}
                    {isDone
                      ? <ProgressRing value={100} size={40} />
                      : <Icon name="fwd" size={22} style={{ color: 'var(--ink-faint)' }} />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SignIn, Brand, Home, CategoryScreen });
