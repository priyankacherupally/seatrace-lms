/* ============================================================
   SUNO · app shell — navigation, state, tweaks, theme
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "dark": false,
  "accent": "#2f6fe5",
  "fontSize": 17,
  "labelMode": "both"
}/*EDITMODE-END*/;

const ACCENTS = ['#2f6fe5', '#0e8ca0', '#1f9d57', '#6457d6'];

function lessonKey(c, l) { return `${c}/${l}`; }

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = tw.lang;
  const setLang = (l) => setTweak('lang', l);
  const t = useT(lang);

  const [screen, setScreen] = React.useState('admin');
  const [employee, setEmployee] = React.useState(EMPLOYEES[0]);
  const [catId, setCatId] = React.useState('safety');
  const [lessonId, setLessonId] = React.useState('helmet');
  const [completed, setCompleted] = React.useState(() => new Set(['hygiene/handwash']));
  const [offline, setOffline] = React.useState(() => new Set(['hygiene/handwash']));
  const [quiz, setQuiz] = React.useState({ score: 0, total: 0 });
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  // ---- language bridge + screen control from parent frame ----
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === 'set_lang') setTweak('lang', e.data.lang);
      if (e.data.type === 'set_screen') setScreen(e.data.screen);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [setTweak]);

  // ---- notify parent of screen changes (for header update) ----
  React.useEffect(() => {
    const employeeScreens = ['home', 'category', 'player', 'quiz', 'complete'];
    window.parent.postMessage({
      type: 'screen_changed',
      screen,
      employeeName: employeeScreens.includes(screen) ? employee?.name : null,
    }, '*');
  }, [screen, employee]);

  // ---- theme / accent / type-scale / label-mode ----
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', tw.dark ? 'dark' : 'light');
    root.style.setProperty('--accent', tw.accent);
    root.style.setProperty('--accent-press', `color-mix(in oklch, ${tw.accent} 82%, #000)`);
    root.style.setProperty('--accent-wash', tw.dark
      ? `color-mix(in oklch, ${tw.accent} 26%, var(--surface))`
      : `color-mix(in oklch, ${tw.accent} 12%, #fff)`);
    root.style.setProperty('--fs', `${tw.fontSize}px`);
    root.classList.toggle('mode-icononly', tw.labelMode === 'icon');
  }, [tw.dark, tw.accent, tw.fontSize, tw.labelMode]);

  const notify = React.useCallback((msg, icon = 'check2') => {
    setToast({ msg, icon });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  }, []);

  // ---- progress helpers ----
  const progress = React.useMemo(() => {
    const map = {};
    CATEGORIES.forEach((c) => {
      const done = c.lessons.filter((l) => completed.has(lessonKey(c.id, l.id))).length;
      map[c.id] = Math.round((done / c.lessons.length) * 100);
    });
    return map;
  }, [completed]);

  const isAccessible = React.useCallback((c, idx) => {
    const l = c.lessons[idx];
    if (completed.has(lessonKey(c.id, l.id))) return true;
    if (l.status !== 'locked') return true;
    if (idx > 0 && completed.has(lessonKey(c.id, c.lessons[idx - 1].id))) return true;
    return false;
  }, [completed]);

  const playableLesson = (c, l) => c.lessons.find((x) => x.id === l) && (CATEGORIES.find((cc) => cc.id === c)) ;

  const continueLesson = React.useMemo(() => {
    for (const c of CATEGORIES) {
      for (let i = 0; i < c.lessons.length; i++) {
        const l = c.lessons[i];
        if (!l.script) continue;
        if (!completed.has(lessonKey(c.id, l.id)) && isAccessible(c, i)) {
          return { catId: c.id, lesson: l };
        }
      }
    }
    return null;
  }, [completed, isAccessible]);

  const markComplete = (cid, lid) => setCompleted((prev) => new Set(prev).add(lessonKey(cid, lid)));
  const toggleOffline = (key) => setOffline((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  // ---- navigation ----
  const openCategory = (cid) => { setCatId(cid); setScreen('category'); };
  const openLesson = (cid, lid) => { setCatId(cid); setLessonId(lid); setScreen('player'); };

  const nextLessonOf = (cid, lid) => {
    const c = CATEGORIES.find((x) => x.id === cid);
    const idx = c.lessons.findIndex((l) => l.id === lid);
    for (let i = idx + 1; i < c.lessons.length; i++) {
      if (c.lessons[i].script) return { catId: cid, lessonId: c.lessons[i].id };
    }
    // fall through to next playable incomplete anywhere
    if (continueLesson && continueLesson.lesson.id !== lid) return { catId: continueLesson.catId, lessonId: continueLesson.lesson.id };
    return null;
  };

  // ---- render screen ----
  let view = null;
  if (screen === 'signin') {
    view = <SignIn lang={lang} setLang={setLang}
      onPick={(e) => { setEmployee(e); setScreen('home'); }}
      onSupervisor={() => setScreen('admin')} />;
  } else if (screen === 'home') {
    view = <Home employee={employee} lang={lang} setLang={setLang} t={t} labelMode={tw.labelMode}
      progress={progress} completed={completed} continueLesson={continueLesson}
      onOpenCategory={openCategory} onOpenLesson={openLesson} onLogout={() => setScreen('admin')} />;
  } else if (screen === 'category') {
    view = <CategoryScreen catId={catId} lang={lang} t={t} completed={completed} offline={offline}
      isAccessible={isAccessible} onBack={() => setScreen('home')} onOpenLesson={openLesson}
      onToggleOffline={toggleOffline} notify={notify} />;
  } else if (screen === 'player') {
    view = <Player catId={catId} lessonId={lessonId} lang={lang} setLang={setLang} t={t}
      offline={offline} onToggleOffline={toggleOffline} notify={notify}
      onBack={() => setScreen('category')}
      onFinishWatch={(hasQuiz) => { if (hasQuiz) setScreen('quiz'); else { markComplete(catId, lessonId); setQuiz({ score: 0, total: 0 }); setScreen('complete'); } }} />;
  } else if (screen === 'quiz') {
    view = <Quiz catId={catId} lessonId={lessonId} lang={lang} t={t}
      onBack={() => setScreen('player')}
      onDone={(score, total) => { setQuiz({ score, total }); markComplete(catId, lessonId); setScreen('complete'); }} />;
  } else if (screen === 'complete') {
    const nl = nextLessonOf(catId, lessonId);
    view = <Complete catId={catId} lessonId={lessonId} lang={lang} t={t} score={quiz.score} totalQ={quiz.total}
      nextLesson={nl}
      onReplay={() => setScreen('player')}
      onNext={() => nl && openLesson(nl.catId, nl.lessonId)}
      onHome={() => setScreen('home')} />;
  } else if (screen === 'admin') {
    view = <Admin lang={lang} setLang={setLang} notify={notify}
      onPickWorker={(e) => { setEmployee(e); setScreen('home'); }}
      onExitToApp={() => setScreen('admin')} />;
  }

  return (
    <div style={{ height: '100%' }}>
      {view}

      {/* toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999,
          background: 'var(--ink)', color: 'var(--bg)', boxShadow: 'var(--shadow-3)', fontWeight: 700,
          animation: 'suno-fade-up .25s both', maxWidth: '90vw' }}>
          <Icon name={toast.icon} size={20} stroke={2.4} /> {toast.msg}
        </div>
      )}

      {/* tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Language (voice + captions)" />
        <TweakRadio label="Language" value={tw.lang}
          options={[{ value: 'te', label: 'తె' }, { value: 'hi', label: 'हि' }, { value: 'en', label: 'EN' }]}
          onChange={(v) => setTweak('lang', v)} />
        <TweakSection label="Display" />
        <TweakToggle label="Dark mode" value={tw.dark} onChange={(v) => setTweak('dark', v)} />
        <TweakSlider label="Text size" value={tw.fontSize} min={15} max={22} unit="px" onChange={(v) => setTweak('fontSize', v)} />
        <TweakRadio label="Labels" value={tw.labelMode}
          options={[{ value: 'both', label: 'Icon + text' }, { value: 'icon', label: 'Icon only' }]}
          onChange={(v) => setTweak('labelMode', v)} />
        <TweakSection label="Brand accent" />
        <TweakColor label="Accent" value={tw.accent} options={ACCENTS} onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
