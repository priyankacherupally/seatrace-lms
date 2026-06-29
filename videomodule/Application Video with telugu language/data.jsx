/* ============================================================
   SUNO · sample content
   Every user-facing learning string is provided in te / hi / en.
   ============================================================ */

// ---- tiny UI strings (the few words of chrome we do show) ----
const STR = {
  appName: { en: 'Suno', hi: 'सुनो', te: 'సునో' },
  tagline: { en: 'Watch · Listen · Learn', hi: 'देखें · सुनें · सीखें', te: 'చూడు · విను · నేర్చుకో' },
  whoText: { en: 'Tap your photo to start', hi: 'शुरू करने के लिए अपनी फ़ोटो दबाएँ', te: 'మొదలుపెట్టడానికి మీ ఫోటోను నొక్కండి' },
  supervisor: { en: 'Supervisor', hi: 'पर्यवेक्षक', te: 'సూపర్‌వైజర్' },
  hello: { en: 'Hello', hi: 'नमस्ते', te: 'నమస్కారం' },
  continue: { en: 'Continue learning', hi: 'सीखना जारी रखें', te: 'నేర్చుకోవడం కొనసాగించండి' },
  topics: { en: 'Topics', hi: 'विषय', te: 'విషయాలు' },
  lessons: { en: 'lessons', hi: 'पाठ', te: 'పాఠాలు' },
  done: { en: 'Done', hi: 'पूरा', te: 'పూర్తయింది' },
  locked: { en: 'Locked', hi: 'बंद', te: 'లాక్' },
  min: { en: 'min', hi: 'मिनट', te: 'నిమి' },
  play: { en: 'Play', hi: 'चलाएँ', te: 'ప్లే' },
  pause: { en: 'Pause', hi: 'रोकें', te: 'ఆపండి' },
  replay: { en: 'Replay', hi: 'फिर से', te: 'మళ్ళీ' },
  speed: { en: 'Speed', hi: 'गति', te: 'వేగం' },
  captions: { en: 'Captions', hi: 'सबटाइटल', te: 'ఉపశీర్షికలు' },
  listen: { en: 'Listen', hi: 'सुनें', te: 'వినండి' },
  offline: { en: 'Saved offline', hi: 'ऑफ़लाइन सेव', te: 'ఆఫ్‌లైన్‌లో సేవ్' },
  download: { en: 'Save offline', hi: 'ऑफ़लाइन सेव करें', te: 'ఆఫ్‌లైన్‌లో సేవ్' },
  share: { en: 'Share', hi: 'शेयर', te: 'షేర్' },
  quizTitle: { en: 'Did you understand?', hi: 'क्या आप समझ गए?', te: 'మీకు అర్థమైందా?' },
  quizSub: { en: 'Answer to finish the lesson', hi: 'पाठ पूरा करने के लिए उत्तर दें', te: 'పాఠం పూర్తి చేయడానికి సమాధానం ఇవ్వండి' },
  correct: { en: 'Correct!', hi: 'सही!', te: 'సరైనది!' },
  tryAgain: { en: 'Try again', hi: 'फिर कोशिश करें', te: 'మళ్ళీ ప్రయత్నించండి' },
  next: { en: 'Next', hi: 'आगे', te: 'తర్వాత' },
  question: { en: 'Question', hi: 'प्रश्न', te: 'ప్రశ్న' },
  wellDone: { en: 'Well done!', hi: 'शाबाश!', te: 'బాగా చేశారు!' },
  lessonComplete: { en: 'Lesson complete', hi: 'पाठ पूरा हुआ', te: 'పాఠం పూర్తయింది' },
  nextLesson: { en: 'Next lesson', hi: 'अगला पाठ', te: 'తదుపరి పాఠం' },
  backHome: { en: 'Home', hi: 'होम', te: 'హోమ్' },
  yourProgress: { en: 'Your progress', hi: 'आपकी प्रगति', te: 'మీ పురోగతి' },
  comingSoon: { en: 'Coming soon', hi: 'जल्द आ रहा है', te: 'త్వరలో వస్తుంది' },
  watchFirst: { en: 'Finish earlier lessons first', hi: 'पहले के पाठ पहले पूरे करें', te: 'ముందుగా మునుపటి పాఠాలను పూర్తి చేయండి' },
};

const FLAG = { te: 'తె', hi: 'हि', en: 'EN' };
const LANG_NAME = { te: 'తెలుగు', hi: 'हिन्दी', en: 'English' };

// ---- employees (sign-in faces) ----
const EMPLOYEES = [
  { id: 'e1', name: 'Ravi Kumar', initials: 'RK', dept: 'Assembly', hue: 18 },
  { id: 'e2', name: 'Lakshmi Devi', initials: 'LD', dept: 'Packaging', hue: 320 },
  { id: 'e3', name: 'Arjun Reddy', initials: 'AR', dept: 'Machine Shop', hue: 210 },
  { id: 'e4', name: 'Sunita Bai', initials: 'SB', dept: 'Quality', hue: 150 },
  { id: 'e5', name: 'Imran Khan', initials: 'IK', dept: 'Welding', hue: 265 },
  { id: 'e6', name: 'Priya Naidu', initials: 'PN', dept: 'Assembly', hue: 35 },
];

// helper to build a 3-lang object
const L = (te, hi, en) => ({ te, hi, en });

// ---- a fully scripted lesson: Safety Helmet ----
const SCRIPT_HELMET = [
  L('నమస్కారం. ఈ పాఠంలో మీ భద్రతా హెల్మెట్‌ను సరిగ్గా ఎలా ధరించాలో నేర్చుకుంటారు.',
    'नमस्ते। इस पाठ में आप सीखेंगे कि अपना सुरक्षा हेलमेट सही तरीके से कैसे पहनें।',
    'Welcome. In this lesson you will learn how to wear your safety helmet correctly.'),
  L('ఎల్లప్పుడూ మీ తలకు సరిపోయే హెల్మెట్‌ను ఎంచుకోండి. అది మరీ వదులుగా లేదా బిగుతుగా ఉండకూడదు.',
    'हमेशा ऐसा हेलमेट चुनें जो आपके सिर पर ठीक बैठे। यह न बहुत ढीला हो और न बहुत कसा हुआ।',
    'Always pick a helmet that fits your head. It should not be too loose or too tight.'),
  L('హెల్మెట్‌ను మీ తలపై నిటారుగా ఉంచండి. ముందు భాగం ముందుకు ఉండాలి.',
    'हेलमेट को अपने सिर पर सीधा रखें। आगे का हिस्सा सामने की ओर होना चाहिए।',
    'Place the helmet straight on your head. The front should face forward.'),
  L('మీరు కదిలినప్పుడు హెల్మెట్ స్థిరంగా ఉండేలా గడ్డం పట్టీని బిగించండి.',
    'चिन स्ट्रैप को कस लें ताकि चलते समय हेलमेट अपनी जगह पर बना रहे।',
    'Tighten the chin strap so the helmet stays in place when you move.'),
  L('పని ప్రారంభించే ముందు హెల్మెట్‌లో పగుళ్లు ఉన్నాయా చూడండి. దెబ్బతిన్న హెల్మెట్‌ను మార్చాలి.',
    'काम शुरू करने से पहले हेलमेट में दरार की जाँच करें। क्षतिग्रस्त हेलमेट को बदलें।',
    'Before work, check the helmet for cracks. A damaged helmet must be replaced.'),
  L('ఉత్పత్తి ప్రాంతంలో ఎల్లప్పుడూ మీ హెల్మెట్ ధరించండి. ఇది మీ తలను సురక్షితంగా ఉంచుతుంది.',
    'उत्पादन क्षेत्र में हर समय अपना हेलमेट पहनें। इससे आपका सिर सुरक्षित रहता है।',
    'Wear your helmet at all times in the production area. This keeps your head safe.'),
];

const QUIZ_HELMET = [
  {
    q: L('ఉత్పత్తి ప్రాంతంలో మీ హెల్మెట్‌ను ఎప్పుడు ధరించాలి?',
         'उत्पादन क्षेत्र में आपको अपना हेलमेट कब पहनना चाहिए?',
         'When should you wear your helmet in the production area?'),
    options: [
      { icon: 'clock', label: L('అన్ని వేళలా', 'हर समय', 'All the time'), correct: true },
      { icon: 'eye', label: L('సూపర్‌వైజర్ చూస్తున్నప్పుడు', 'जब पर्यवेक्षक देख रहा हो', 'Only when the supervisor watches') },
      { icon: 'cup', label: L('విరామ సమయంలో మాత్రమే', 'केवल ब्रेक के दौरान', 'Only during a break') },
    ],
  },
  {
    q: L('పగుళ్లు ఉన్న హెల్మెట్‌తో ఏం చేయాలి?',
         'दरार वाले हेलमेट का क्या करें?',
         'What should you do with a cracked helmet?'),
    options: [
      { icon: 'refresh', label: L('దాన్ని మార్చాలి', 'उसे बदल दें', 'Replace it'), correct: true },
      { icon: 'check', label: L('వాడటం కొనసాగించాలి', 'उपयोग जारी रखें', 'Keep using it') },
      { icon: 'brush', label: L('దానిపై పెయింట్ వేయాలి', 'उस पर पेंट कर दें', 'Paint over it') },
    ],
  },
];

// ---- Hand gloves lesson ----
const SCRIPT_GLOVES = [
  L('ఈ పాఠంలో చేతి గ్లౌజులను ఎప్పుడు, ఎలా వాడాలో నేర్చుకుంటారు.',
    'इस पाठ में आप सीखेंगे कि हाथ के दस्ताने कब और कैसे पहनें।',
    'In this lesson you will learn when and how to wear hand gloves.'),
  L('పదునైన లేదా వేడి వస్తువులను పట్టుకునే ముందు ఎల్లప్పుడూ గ్లౌజులు ధరించండి.',
    'तेज़ या गरम चीज़ें पकड़ने से पहले हमेशा दस्ताने पहनें।',
    'Always wear gloves before handling sharp or hot objects.'),
  L('మీ చేతి కొలతకు సరిపోయే గ్లౌజులను ఎంచుకోండి.',
    'अपने हाथ के नाप के अनुसार दस्ताने चुनें।',
    'Choose gloves that match the size of your hand.'),
  L('గ్లౌజులు చిరిగిపోయి ఉంటే వాటిని వాడకండి, కొత్తవి తీసుకోండి.',
    'अगर दस्ताने फटे हों तो उन्हें न पहनें, नए लें।',
    'If the gloves are torn, do not use them — take a new pair.'),
  L('పని పూర్తయ్యాక గ్లౌజులను సరైన చోట ఉంచండి.',
    'काम पूरा होने के बाद दस्ताने सही जगह रखें।',
    'After finishing work, keep the gloves in their proper place.'),
];

const QUIZ_GLOVES = [
  {
    q: L('గ్లౌజులు చిరిగిపోయి ఉంటే ఏం చేయాలి?', 'अगर दस्ताने फटे हों तो क्या करें?', 'What if the gloves are torn?'),
    options: [
      { icon: 'refresh', label: L('కొత్త జత తీసుకోండి', 'नई जोड़ी लें', 'Take a new pair'), correct: true },
      { icon: 'check', label: L('అలాగే వాడండి', 'वैसे ही पहनें', 'Wear them anyway') },
      { icon: 'drop', label: L('నీళ్లతో కడగండి', 'पानी से धो लें', 'Wash with water') },
    ],
  },
];

// ---- Hand washing (hygiene) lesson ----
const SCRIPT_HANDWASH = [
  L('పరిశుభ్రత చాలా ముఖ్యం. చేతులు సరిగ్గా ఎలా కడగాలో చూద్దాం.',
    'स्वच्छता बहुत ज़रूरी है। आइए देखें कि हाथ सही तरीके से कैसे धोएँ।',
    'Cleanliness is very important. Let us see how to wash hands correctly.'),
  L('మొదట చేతులను శుభ్రమైన నీటితో తడపండి.',
    'पहले हाथों को साफ़ पानी से गीला करें।',
    'First, wet your hands with clean water.'),
  L('సబ్బు రాసి కనీసం ఇరవై సెకన్లపాటు రుద్దండి.',
    'साबुन लगाकर कम से कम बीस सेकंड तक रगड़ें।',
    'Apply soap and rub for at least twenty seconds.'),
  L('వేళ్ల మధ్య, గోళ్ల కింద కూడా శుభ్రం చేయండి.',
    'उंगलियों के बीच और नाखूनों के नीचे भी साफ़ करें।',
    'Clean between the fingers and under the nails too.'),
  L('చివరగా నీటితో కడిగి శుభ్రమైన గుడ్డతో తుడవండి.',
    'अंत में पानी से धोकर साफ़ कपड़े से पोंछें।',
    'Finally, rinse with water and wipe with a clean cloth.'),
];

const QUIZ_HANDWASH = [
  {
    q: L('సబ్బుతో ఎంత సేపు చేతులు రుద్దాలి?', 'साबुन से कितनी देर हाथ रगड़ें?', 'How long should you rub with soap?'),
    options: [
      { icon: 'clock', label: L('కనీసం 20 సెకన్లు', 'कम से कम 20 सेकंड', 'At least 20 seconds'), correct: true },
      { icon: 'clock', label: L('2 సెకన్లు', '2 सेकंड', '2 seconds') },
      { icon: 'cup', label: L('అవసరం లేదు', 'ज़रूरत नहीं', 'No need') },
    ],
  },
];

// ---- categories + lessons ----
// status: 'done' | 'progress' | 'open' | 'locked'  (per the signed-in demo employee)
const CATEGORIES = [
  {
    id: 'safety', icon: 'helmet', tint: 18,
    name: L('భద్రత', 'सुरक्षा', 'Safety'),
    lessons: [
      { id: 'helmet', name: L('భద్రతా హెల్మెట్ ధరించడం', 'सुरक्षा हेलमेट पहनना', 'Wearing a Safety Helmet'), min: 3, status: 'open', script: SCRIPT_HELMET, quiz: QUIZ_HELMET, audioSrc: 'uploads/speech.aac' },
      { id: 'gloves', name: L('చేతి గ్లౌజులు వాడటం', 'हाथ के दस्ताने पहनना', 'Using Hand Gloves'), min: 2, status: 'open', script: SCRIPT_GLOVES, quiz: QUIZ_GLOVES },
      { id: 'fire', name: L('అగ్ని భద్రత ప్రాథమికాలు', 'अग्नि सुरक्षा की बुनियादी बातें', 'Fire Safety Basics'), min: 4, status: 'locked' },
      { id: 'lift', name: L('సరిగ్గా బరువు ఎత్తడం', 'सही तरीके से वज़न उठाना', 'Lifting Loads Safely'), min: 3, status: 'locked' },
    ],
  },
  {
    id: 'machine', icon: 'gear', tint: 210,
    name: L('యంత్రం నడపడం', 'मशीन चलाना', 'Machine Operation'),
    lessons: [
      { id: 'startup', name: L('యంత్రాన్ని ఆన్ చేయడం', 'मशीन चालू करना', 'Starting the Machine'), min: 4, status: 'open', script: SCRIPT_GLOVES, quiz: QUIZ_GLOVES },
      { id: 'jam', name: L('జామ్ అయితే ఏం చేయాలి', 'जाम होने पर क्या करें', 'What to Do During a Jam'), min: 3, status: 'locked' },
      { id: 'clean-mc', name: L('యంత్రాన్ని శుభ్రం చేయడం', 'मशीन की सफ़ाई', 'Cleaning the Machine'), min: 3, status: 'locked' },
    ],
  },
  {
    id: 'hygiene', icon: 'drop', tint: 150,
    name: L('పరిశుభ్రత', 'स्वच्छता', 'Hygiene'),
    lessons: [
      { id: 'handwash', name: L('చేతులు కడుక్కోవడం', 'हाथ धोना', 'Hand Washing'), min: 2, status: 'open', script: SCRIPT_HANDWASH, quiz: QUIZ_HANDWASH },
      { id: 'uniform', name: L('శుభ్రమైన యూనిఫామ్', 'साफ़ वर्दी', 'Clean Uniform'), min: 2, status: 'locked' },
    ],
  },
  {
    id: 'quality', icon: 'badge', tint: 265,
    name: L('నాణ్యత తనిఖీ', 'गुणवत्ता जाँच', 'Quality Check'),
    lessons: [
      { id: 'inspect', name: L('ఉత్పత్తిని తనిఖీ చేయడం', 'उत्पाद की जाँच', 'Inspecting a Product'), min: 4, status: 'locked' },
      { id: 'reject', name: L('తిరస్కరణ గుర్తించడం', 'रिजेक्ट पहचानना', 'Spotting a Reject'), min: 3, status: 'locked' },
    ],
  },
  {
    id: 'emergency', icon: 'alert', tint: 30,
    name: L('అత్యవసరం', 'आपातकाल', 'Emergency'),
    lessons: [
      { id: 'evacuate', name: L('సురక్షితంగా బయటకు వెళ్లడం', 'सुरक्षित रूप से बाहर निकलना', 'Safe Evacuation'), min: 3, status: 'locked' },
      { id: 'firstaid', name: L('ప్రథమ చికిత్స ప్రాథమికాలు', 'प्राथमिक चिकित्सा', 'First Aid Basics'), min: 5, status: 'locked' },
    ],
  },
];

// admin: employees x category completion (0..100)
const PROGRESS_MATRIX = [
  { id: 'e1', vals: { safety: 100, machine: 60, hygiene: 100, quality: 40, emergency: 0 } },
  { id: 'e2', vals: { safety: 80, machine: 20, hygiene: 100, quality: 0, emergency: 0 } },
  { id: 'e3', vals: { safety: 100, machine: 100, hygiene: 50, quality: 60, emergency: 20 } },
  { id: 'e4', vals: { safety: 60, machine: 0, hygiene: 100, quality: 100, emergency: 0 } },
  { id: 'e5', vals: { safety: 40, machine: 80, hygiene: 0, quality: 0, emergency: 0 } },
  { id: 'e6', vals: { safety: 100, machine: 40, hygiene: 100, quality: 20, emergency: 0 } },
];

Object.assign(window, {
  STR, FLAG, LANG_NAME, EMPLOYEES, CATEGORIES, PROGRESS_MATRIX,
});
