export const featuredProjects = [
  {
    id: 'louis',
    name: 'L.O.U.I.S.',
    tagline: 'Mobile-first IDE',
    status: { label: 'Active development', kind: 'dev' },
    description:
      'A mobile IDE that actually works offline: code editing, project navigation, HTML preview, a real terminal, search, and Git, all on a phone. Flutter draws the workspace. A Rust engine underneath does the actual file and process work.',
    problem: "Code editors on a phone let you edit text, but you can't run a command or preview a page without going back to a laptop.",
    approach:
      'A Rust engine does the real work on the device (files, processes, the terminal) and Flutter is just the UI on top. Nothing needs a server, so it works offline, and Drift/SQLite saves your session so you can close the app and pick up where you left off.',
    tech: ['Flutter', 'Dart', 'Rust', 'Riverpod', 'flutter_rust_bridge', 'Drift', 'SQLite'],
    link: null,
  },
  {
    id: 'worship-studio',
    name: 'Worship Studio',
    tagline: 'Desktop control room',
    status: { label: 'Production ready', kind: 'live' },
    description:
      'A Windows production app for weekly services: planning, songs, Scripture, media, themes, timers, and automation, with Preview, Program, Audience, and Stage outputs that run independently behind typed live commands.',
    problem: 'Worship teams needed real production control, and a fast way to recover when something breaks mid-service.',
    approach:
      "A Tauri + React shell where each output path runs isolated, so one screen crashing doesn't take the rest down with it.",
    tech: ['Tauri', 'Rust', 'React', 'TypeScript', 'SQLite'],
    link: null,
  },
  {
    id: 'ai-resume-analyzer',
    name: 'AI Resume Analyzer',
    tagline: 'Full-stack · AI',
    status: { label: 'Personal project · live demo', kind: 'live' },
    description:
      'Upload a resume and get structured feedback: skills, ATS readiness, strengths, weaknesses, plus a semantic match score against a real job description instead of plain keyword overlap.',
    problem: 'Keyword filters can pass over a qualified resume because it says "built REST APIs" where the job post says "backend development."',
    approach:
      "The resume and job post are both turned into sentence-transformer embeddings and compared with pgvector cosine similarity, so the score follows meaning instead of exact words. The analysis runs in Celery workers, so uploads don't hang.",
    tech: [
      'Django REST',
      'React',
      'PyMuPDF',
      'sentence-transformers',
      'PostgreSQL · pgvector',
      'Celery · Redis',
      'Ollama',
    ],
    link: null,
    demo: 'https://ai-resume-analyzer-40xn.onrender.com/',
  },
]

export const supportingProjects = [
  {
    name: 'Candidate Pipeline',
    tag: 'Newport Williams',
    description:
      'An internal recruiting CRM that reads live from Microsoft 365: candidates, firms, and job orders in one place, matched by a weighted scoring engine over the Graph API.',
    tech: ['Next.js', 'TypeScript', 'Microsoft Graph API', 'Azure Entra SSO'],
    link: null,
  },
  {
    name: 'Leopard-to-SourceWhale Converter',
    tag: 'Newport Williams',
    description:
      'Transforms and cleans up recruitment data, leads and attorney bios, so it can actually be used across the business systems downstream.',
    tech: ['Node.js', 'Puppeteer', 'ExcelJS'],
    link: null,
  },
  {
    name: 'Prokora Admin System',
    tag: 'Prokora Network Solutions',
    description:
      'Flask and MySQL admin system with authentication, role- and permission-based access control, and dynamic CRUD workflows.',
    tech: ['Flask', 'MySQL', 'SQLAlchemy'],
    link: null,
  },
]

export const capstone = {
  name: 'OnionLens — Armyworm Detection',
  tag: 'Capstone · 2024',
  description:
    'Led frontend and API integration for a Flask app that checks onion-leaf photos and classifies healthy vs. armyworm-infested leaves with a TensorFlow/Keras CNN. It also renders saliency maps, so a farmer can actually see what the model was looking at.',
  tech: ['Flask', 'TensorFlow', 'Keras', 'Bootstrap', 'Jinja'],
  link: 'https://github.com/matsamonte9/OnionLens',
}
