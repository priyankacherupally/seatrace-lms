/* ============================================================
   SUNO · icon set — simple stroke icons, currentColor
   ============================================================ */

const ICON_PATHS = {
  // category
  helmet: <><path d="M3 13a9 9 0 0 1 18 0" /><path d="M2 13h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" /><path d="M9 4.5A8.9 8.9 0 0 1 12 4a8.9 8.9 0 0 1 3 .5" /></>,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3" /></>,
  drop: <><path d="M12 3c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10z" /></>,
  badge: <><path d="m12 3 2.5 1.7 3-.2.9 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.9-3-.2L12 21l-2.5-1.7-3 .2-.9-2.9L3.2 15l1-2.8-1-2.8 2.4-1.8.9-2.9 3 .2z" /><path d="m9 12 2 2 4-4" /></>,
  alert: <><path d="M12 3 2.5 19.5h19z" /><path d="M12 10v4.5" /><circle cx="12" cy="17.3" r="0.3" /></>,
  // quiz / misc
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.6" /></>,
  cup: <><path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M16 9.5h2.5a2 2 0 0 1 0 4H16" /><path d="M6 3.5v1.5M10 3.5v1.5M14 3.5v1.5" /></>,
  refresh: <><path d="M20 11a8 8 0 1 0-.5 4" /><path d="M20 4v5h-5" /></>,
  brush: <><path d="M9 14c-2 0-3 1.5-3 4 2.5 0 4-1 4-3" /><path d="m10.5 12.5 7-7a2 2 0 0 1 3 3l-7 7z" /></>,
  // player
  play: <><path d="M7 4.5 19 12 7 19.5z" /></>,
  pause: <><rect x="6.5" y="5" width="4" height="14" rx="1.2" /><rect x="13.5" y="5" width="4" height="14" rx="1.2" /></>,
  replay: <><path d="M4 12a8 8 0 1 0 2.5-5.8" /><path d="M4 4v4h4" /></>,
  speed: <><path d="M5 18a9 9 0 1 1 14 0" /><path d="m12 13 4-4" /><circle cx="12" cy="13" r="1.1" /></>,
  cc: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 10.5a2.5 2.5 0 1 0 0 3M17.5 10.5a2.5 2.5 0 1 0 0 3" /></>,
  download: <><path d="M12 4v10" /><path d="m7.5 10 4.5 4 4.5-4" /><path d="M5 18.5h14" /></>,
  cloudup: <><path d="M6.6 18.5a4.2 4.2 0 0 1-.7-8.13 6 6 0 0 1 11.62-1.2A4 4 0 0 1 17.4 18.5" /><path d="M12 21V9.5" /><path d="m8.5 12.5 3.5-3.5 3.5 3.5" /></>,
  check2: <><path d="M5 12.5 10 17 19 7" /></>,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6" /></>,
  // chrome
  back: <><path d="M15 5l-7 7 7 7" /></>,
  fwd: <><path d="M9 5l7 7-7 7" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 9.5V20h12V9.5" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="9.5" rx="2.4" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  sound: <><path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z" /><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a8 8 0 0 1 0 11" /></>,
  soundOff: <><path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z" /><path d="m16 9.5 4 4M20 9.5l-4 4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  upload: <><path d="M12 16V5" /><path d="m7.5 9.5 4.5-4.5 4.5 4.5" /><path d="M5 19.5h14" /></>,
  chart: <><path d="M4 4v16h16" /><rect x="7.5" y="12" width="2.8" height="5" rx="0.6" /><rect x="12.5" y="8" width="2.8" height="9" rx="0.6" /><rect x="17.5" y="14" width="2.8" height="3" rx="0.6" /></>,
  film: <><rect x="3" y="5" width="18" height="14" rx="2.4" /><path d="M8 5v14M16 5v14M3 12h18M3 8.5h5M16 8.5h5M3 15.5h5M16 15.5h5" /></>,
  x: <><path d="M6 6l12 12M18 6 6 18" /></>,
  star: <><path d="m12 4 2.5 5 5.5.8-4 3.9 1 5.5-5-2.6L7.5 19l1-5.5-4-3.9 5.5-.8z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  gearAdmin: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" /></>,
  moon: <><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></>,
  people: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 6a3 3 0 0 1 0 5.5M21 19a5.5 5.5 0 0 0-4-5.3" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 15.5h6" /></>,
  trophy: <><path d="M7 4h10v3a5 5 0 0 1-10 0z" /><path d="M7 5H4.5v1.5a3 3 0 0 0 3 3M17 5h2.5v1.5a3 3 0 0 1-3 3" /><path d="M12 12v3M9 19h6M10 19l.5-4M14 19l-.5-4" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" /></>,
  logout: <><path d="M14 4.5H6.5A1.5 1.5 0 0 0 5 6v12a1.5 1.5 0 0 0 1.5 1.5H14" /><path d="M17 8.5 20.5 12 17 15.5" /><path d="M20 12h-9" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.4" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></>,
  flask: <><path d="M9 3.5h6M10 3.5v6L5.5 18a2 2 0 0 0 1.8 2.9h9.4A2 2 0 0 0 18.5 18L14 9.5v-6" /><path d="M7.7 14.5h8.6" /></>,
  editdoc: <><path d="M13 3.5H6.5v17h11V8" /><path d="M13 3.5 17.5 8H13z" /><path d="m15.5 12.5 2.2 2.2-4 4H11.5v-2.2z" /></>,
  usergear: <><circle cx="10" cy="8" r="3.4" /><path d="M4 19.5a6 6 0 0 1 9.5-4.2" /><circle cx="17.5" cy="17.5" r="2.4" /><path d="M17.5 13.8v1.3M17.5 19.9v1.3M21.2 17.5h-1.3M15.1 17.5h-1.3" /></>,
  expand: <><path d="M14 4.5h5.5V10M19.5 4.5 13.5 10.5M10 19.5H4.5V14M4.5 19.5l6-6" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" /></>,
  pdf: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M8.5 17v-3.5h1.2a1.2 1.2 0 0 1 0 2.4H8.5M13 17v-3.5h1.8M13 15.3h1.4" /></>,
};

function Icon({ name, size = 24, stroke = 2, fill = false, style, className }) {
  const p = ICON_PATHS[name];
  if (!p) return null;
  const solid = name === 'play' || name === 'pause';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
         fill={solid ? 'currentColor' : 'none'} stroke={solid ? 'none' : 'currentColor'}
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'block', flexShrink: 0, ...style }} aria-hidden="true">
      {p}
    </svg>
  );
}

window.Icon = Icon;
