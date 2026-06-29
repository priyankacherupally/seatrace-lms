/* ============================================================
   SEATRACE · app chrome — logo, shell (sidebar + topbar +
   breadcrumb), page header, and form primitives.
   The "Training" module lives inside the SEATRACE product.
   ============================================================ */

// ── Logo: wave mark in a ring + SEA·TRACE wordmark ───────────
function StLogo({ size = 34, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <path d="M9 27c3.2 0 3.2-4 6.4-4s3.2 4 6.4 4 3.2-4 6.4-4 3.2 4 6.4 4 3.2-4 6.4-4"
          fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M11 20.5c2.6 0 2.6-3 5.2-3s2.6 3 5.2 3 2.6-3 5.2-3 2.6 3 5.2 3"
          fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      </svg>
      {showText && (
        <div style={{ fontWeight: 800, fontSize: size * 0.5, letterSpacing: '-.01em', lineHeight: 1 }}>
          <span style={{ color: 'var(--ink)' }}>SEA</span><span style={{ color: 'var(--accent)' }}>TRACE</span>
        </div>
      )}
    </div>
  );
}

// sidebar items — the Training module (film) is the active one in this prototype
const ST_NAV = [
  { id: 'home', icon: 'home' },
  { id: 'forms', icon: 'doc' },
  { id: 'edit', icon: 'editdoc' },
  { id: 'users', icon: 'usergear' },
  { id: 'reports', icon: 'chart' },
  { id: 'training', icon: 'film' },
  { id: 'lab', icon: 'flask' },
];

// ── Shell: scrollable main (no topbar, no breadcrumb) ────────
function StShell({ active = 'training', breadcrumb, onHome, onLogout, onNav, maxWidth, lang, setLang, children }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <main className="scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '24px 0 40px', maxWidth, margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

// ── page header: back-chevron box + title + right slot ───────
function StPageHeader({ title, onBack, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
      {onBack && (
        <button onClick={onBack} aria-label="Back" style={{ width: 48, height: 48, borderRadius: 0,
          border: '1.5px solid var(--line)', background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer',
          display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="back" size={22} />
        </button>
      )}
      <h1 style={{ fontSize: 'var(--h1)', fontWeight: 700, margin: 0, flex: 1, minWidth: 160 }}>{title}</h1>
      {right}
    </div>
  );
}

function StCard({ children, style, pad = 24 }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-1)', padding: pad, ...style }}>{children}</div>
  );
}

// ── form primitives ──────────────────────────────────────────
function StButton({ children, icon, onClick, kind = 'primary', disabled, style, size = 'md' }) {
  const pad = size === 'lg' ? '13px 26px' : '11px 20px';
  const kinds = {
    primary: { background: 'var(--accent)', color: 'var(--on-accent)', border: '1.5px solid var(--accent)' },
    outline: { background: 'var(--surface)', color: 'var(--ink)', border: '1.5px solid var(--line)' },
    soft: { background: 'var(--accent-wash)', color: 'var(--accent)', border: '1.5px solid transparent' },
    danger: { background: 'var(--bad-wash)', color: 'var(--bad)', border: '1.5px solid transparent' },
  }[kind];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: pad,
      borderRadius: 0, fontWeight: 700, fontSize: 'var(--body)', cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1, transition: 'filter .15s, transform .1s', whiteSpace: 'nowrap', ...kinds, ...style,
    }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
      {icon && <Icon name={icon} size={18} stroke={2.2} />}{children}
    </button>
  );
}

function StFieldRow({ label, children, hint }) {
  return (
    <label style={{ display: 'block' }}>
      {label && <span style={{ display: 'block', fontWeight: 600, fontSize: 'var(--small)', color: 'var(--ink-soft)', marginBottom: 7 }}>{label}</span>}
      {children}
      {hint && <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--ink-faint)', marginTop: 5 }}>{hint}</span>}
    </label>
  );
}

// date-range pill (display only)
function StDateRange({ value = '01/01/2026  -  01/04/2026' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 0,
      border: '1.5px solid var(--line)', background: 'var(--surface)', color: 'var(--ink-soft)', fontWeight: 500, fontSize: '0.95rem' }}>
      <span>{value}</span>
      <Icon name="calendar" size={20} style={{ color: 'var(--accent)' }} />
    </div>
  );
}

Object.assign(window, { StLogo, StShell, StPageHeader, StCard, StButton, StFieldRow, StDateRange });
