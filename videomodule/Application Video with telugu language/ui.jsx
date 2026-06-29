/* ============================================================
   SUNO · shared UI components
   ============================================================ */

// localized-string getter
const tx = (obj, lang) => (obj ? (obj[lang] != null ? obj[lang] : obj.en) : '');
const langClass = (lang) => (lang === 'te' ? 'lang-te' : lang === 'hi' ? 'lang-hi' : '');
// shorthand for chrome strings
const useT = (lang) => React.useCallback((key) => tx(STR[key], lang), [lang]);

// ── Avatar ───────────────────────────────────────────────────
function Avatar({ name, initials, hue = 210, size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'grid', placeItems: 'center',
      background: `linear-gradient(150deg, oklch(0.7 0.12 ${hue}), oklch(0.55 0.13 ${hue}))`,
      color: '#fff', fontWeight: 700, fontSize: size * 0.36,
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,.35)', letterSpacing: '.02em',
    }} aria-label={name}>{initials}</div>
  );
}

// ── ProgressRing ─────────────────────────────────────────────
function ProgressRing({ value = 0, size = 44, stroke = 4, children, color = 'var(--accent)' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const done = value >= 100;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={done ? 'var(--good)' : color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
          style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.4,1,.4,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        fontSize: size * 0.28, fontWeight: 700, color: done ? 'var(--good)' : 'var(--ink-soft)' }}>
        {children != null ? children : (done ? <Icon name="check2" size={size * 0.4} stroke={3} /> : `${Math.round(value)}%`)}
      </div>
    </div>
  );
}

// ── SpeakButton — tap to hear a localized label ──────────────
function SpeakButton({ text, lang, size = 38, title }) {
  const [on, setOn] = React.useState(false);
  return (
    <button title={title} aria-label={title || 'Listen'} onClick={(e) => {
      e.stopPropagation();
      speakText(text, lang, 1);
      setOn(true); setTimeout(() => setOn(false), 900);
    }} style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      border: '1.5px solid var(--line)', background: on ? 'var(--accent)' : 'var(--surface)',
      color: on ? 'var(--on-accent)' : 'var(--accent)', cursor: 'pointer',
      display: 'grid', placeItems: 'center', transition: 'all .18s',
      boxShadow: 'var(--shadow-1)',
    }}>
      <Icon name="sound" size={size * 0.5} stroke={2} />
    </button>
  );
}

// ── language pills (TE / HI / EN) ────────────────────────────
function LangPills({ lang, onChange, compact = false }) {
  const langs = ['te', 'hi', 'en'];
  return (
    <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface-2)',
      borderRadius: 999, border: '1px solid var(--line)' }} role="radiogroup" aria-label="Language">
      {langs.map((l) => {
        const active = l === lang;
        return (
          <button key={l} role="radio" aria-checked={active} onClick={() => onChange(l)}
            className={langClass(l)} style={{
              border: 'none', cursor: 'pointer', borderRadius: 999,
              padding: compact ? '6px 12px' : '8px 16px',
              fontSize: compact ? '0.82rem' : '0.95rem', fontWeight: 700,
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? 'var(--on-accent)' : 'var(--ink-soft)',
              transition: 'all .18s', minWidth: 44, lineHeight: 1.1,
              boxShadow: active ? 'var(--shadow-1)' : 'none',
            }}>
            <div style={{ fontSize: compact ? '1rem' : '1.15rem' }}>{FLAG[l]}</div>
            {!compact && <div style={{ fontSize: '0.62rem', fontWeight: 600, opacity: 0.85, marginTop: 1 }}>{LANG_NAME[l]}</div>}
          </button>
        );
      })}
    </div>
  );
}

// ── video placeholder (striped) ──────────────────────────────
function VideoFrame({ icon = 'film', label = 'training video', playing = false, children, radius = 'var(--r-md)' }) {
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: radius,
      overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--line)',
      backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklch, var(--line) 55%, transparent) 14px 15px)',
      display: 'grid', placeItems: 'center', color: 'var(--ink-faint)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.7 }}>
        <Icon name={icon} size={56} stroke={1.5} />
        <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.74rem', letterSpacing: '.04em' }}>// {label}</code>
      </div>
      {playing && <SoundWave />}
      {children}
    </div>
  );
}

// animated equalizer overlay shown while narrating
function SoundWave({ bars = 5 }) {
  return (
    <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'flex-end',
      gap: 4, height: 26, padding: '6px 10px', borderRadius: 999, background: 'rgba(0,0,0,.4)',
      backdropFilter: 'blur(4px)' }} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ width: 3.5, background: '#fff', borderRadius: 2,
          animation: `suno-eq ${0.7 + (i % 3) * 0.18}s ease-in-out ${i * 0.12}s infinite` }} />
      ))}
    </div>
  );
}

// ── generic buttons ──────────────────────────────────────────
function BigButton({ icon, children, onClick, kind = 'primary', full = false, size = 'md', disabled = false, style }) {
  const pad = size === 'lg' ? '18px 28px' : size === 'sm' ? '10px 16px' : '14px 22px';
  const fs = size === 'lg' ? '1.15rem' : size === 'sm' ? '0.9rem' : '1.02rem';
  const styles = {
    primary: { background: 'var(--accent)', color: 'var(--on-accent)', border: 'none', boxShadow: 'var(--shadow-2)' },
    soft: { background: 'var(--accent-wash)', color: 'var(--accent)', border: 'none' },
    ghost: { background: 'var(--surface)', color: 'var(--ink)', border: '1.5px solid var(--line)' },
    quiet: { background: 'transparent', color: 'var(--ink-soft)', border: 'none' },
  }[kind];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: pad, fontSize: fs, fontWeight: 700, borderRadius: 999, cursor: disabled ? 'default' : 'pointer',
      width: full ? '100%' : 'auto', opacity: disabled ? 0.45 : 1, transition: 'transform .12s, filter .15s',
      ...styles, ...style,
    }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
      {icon && <Icon name={icon} size={size === 'lg' ? 24 : 20} stroke={2.4} />}
      {children}
    </button>
  );
}

function IconButton({ icon, onClick, label, active = false, size = 48, iconSize, kind = 'ghost', style }) {
  const styles = {
    ghost: { background: 'var(--surface)', color: 'var(--ink)', border: '1.5px solid var(--line)' },
    solid: { background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' },
    plain: { background: 'transparent', color: 'var(--ink-soft)', border: 'none' },
  }[kind];
  return (
    <button onClick={onClick} aria-label={label} title={label} style={{
      width: size, height: size, borderRadius: '50%', display: 'grid', placeItems: 'center',
      cursor: 'pointer', flexShrink: 0, transition: 'all .15s',
      ...(active ? { background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' } : styles),
      ...style,
    }}>
      <Icon name={icon} size={iconSize || size * 0.46} stroke={2.2} />
    </button>
  );
}

// label that hides text in icon-only mode
function MaybeLabel({ show, className, children, style }) {
  if (!show) return null;
  return <span className={className} style={style}>{children}</span>;
}

Object.assign(window, {
  tx, langClass, useT, Avatar, ProgressRing, SpeakButton, LangPills,
  VideoFrame, SoundWave, BigButton, IconButton, MaybeLabel,
});
