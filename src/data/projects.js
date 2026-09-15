export const featuredProjects = [
  {
    id: 'louis',
    name: 'L.O.U.I.S.',
    tagline: 'Mobile-first IDE',
    status: { label: 'Active development', kind: 'dev' },
    description:
      "A local-first mobile IDE — code editing, project navigation, HTML preview, terminal workflows, search, and Git operations, all running on a phone. Flutter renders the workspace; a Rust engine underneath does the real work.",
    problem: "Developers can't build or run a real project from a mobile device.",
    approach:
      'Flutter UI and domain services bridged to a Rust workspace engine via flutter_rust_bridge, with Drift/SQLite for restorable local state.',
    tech: ['Flutter', 'Dart', 'Rust', 'Riverpod', 'flutter_rust_bridge', 'Drift', 'SQLite'],
    link: null,
  },
  {
    id: 'worship-studio',
    name: 'Worship Studio',
    tagline: 'Desktop control room',
    status: { label: 'Production ready', kind: 'live' },
    description:
      'A Windows-first production app for weekly services — service planning, songs, Scripture, media, themes, timers, and automation, with independent Preview, Program, Audience, and Stage outputs behind typed live commands.',
    problem: "Worship teams needed real production control, with recovery when something goes wrong mid-service.",
    approach:
      "Tauri + React shell where each output path is isolated — one failing screen can't take down the others.",
    tech: ['Tauri', 'Rust', 'React', 'TypeScript', 'SQLite'],
    link: null,
  },
  {
    id: 'ai-resume-analyzer',
    name: 'AI Resume Analyzer',
    tagline: 'Full-stack · AI',
    status: { label: 'Personal project · open source', kind: 'dev' },
    description:
      'Upload a resume, get structured feedback — skills, ATS readiness, strengths, weaknesses — plus a semantic match score against a real job description, not just keyword overlap.',
    problem: 'Keyword-matching ATS tools miss candidates whose resumes just use different words.',
    approach:
      'Sentence-transformer embeddings compared with pgvector cosine similarity; heavy analysis offloaded to Celery workers.',
    tech: [
      'Django REST',
      'React',
      'PyMuPDF',
      'sentence-transformers',
      'PostgreSQL · pgvector',
      'Celery · Redis',
      'Ollama',
    ],
    link: 'https://github.com/Luwisiii/AI-Resume-Analyzer',
  },
]

export const supportingProjects = [
  {
    name: 'Candidate Pipeline',
    tag: 'Newport Williams',
    description:
      'Internal recruiting CRM reading live from Microsoft 365 — candidates, firms, and job orders in one place, matched by a weighted scoring engine over the Graph API.',
    tech: ['Next.js', 'TypeScript', 'Microsoft Graph API', 'Azure Entra SSO'],
    link: null,
  },
  {
    name: 'Leopard-to-SourceWhale Converter',
    tag: 'Newport Williams',
    description:
      'Transforms and prepares recruitment data — leads and attorney bios — for use across downstream business systems.',
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
    'Led frontend and API integration for a Flask app that validates onion-leaf photos and classifies healthy vs. armyworm-infested leaves with a TensorFlow/Keras CNN — including saliency-map explanations so a farmer can see what the model actually saw.',
  tech: ['Flask', 'TensorFlow', 'Keras', 'Bootstrap', 'Jinja'],
  link: 'https://github.com/matsamonte9/OnionLens',
}
