# LabelFlow 🎵

**The ultimate record label management platform** built for modern independent labels. Manage artists, plan campaigns, track analytics, generate AI-powered content, and run complete label operations — all in one sleek React application.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rhythrosalabs.github.io/labelflow)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vite.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## ✨ Features

LabelFlow ships with **15 fully functional modules** out of the box:

| Module | Description |
|--------|-------------|
| 📊 **Dashboard** | Real-time overview of label stats, activity feed, upcoming events & AI insights |
| 🎤 **Artists** | Manage roster cards with streaming stats, growth trends & artist profiles |
| 📣 **Campaigns** | Track marketing campaigns with progress bars, budgets & performance metrics |
| 📁 **Assets** | Filter and organise audio, images, video and document files |
| 📅 **Schedule** | Interactive calendar with drag-into-month navigation & upcoming events list |
| 📒 **Contacts** | Industry CRM — save managers, promoters, radio, press & brand contacts |
| ⭐ **Opportunities** | AI-powered discovery for sync deals, festivals, grants & playlist placements |
| 📝 **Notes** | Categorised notes editor for meetings, ideas & campaign notes |
| ✅ **To-Do & Workflows** | Drag-and-drop Kanban board with priority-colour task cards |
| 🤖 **AI Artist Development** | Generate a complete artist profile, album concept & merch line with AI |
| ✍️ **AI Blog Writer** | Full rich-text editor with AI content generation, chat assistant & blog library |
| 👕 **AI Merch Mockups** | Generate product mockups for tees, hoodies, mugs, posters & more |
| 📚 **Resources** | Categorised link/document library with add/delete functionality |
| 📍 **Street Marketing** | AI-powered city location scouting for poster drops and street activations |
| 📈 **Analytics** | Chart.js-powered streaming growth, audience geography & revenue mix |

---

## 🖥️ Screenshots

### Dashboard
> Live stats, activity feed, upcoming events & AI insights at a glance.

![Dashboard](docs/screenshots/dashboard.png)

### Artists Roster
> Cards for each artist with streaming stats and growth trends.

![Artists](docs/screenshots/artists.png)

### AI Blog Writer
> Full rich-text editor with AI chat assistant, style selector & blog library.

![AI Blog Writer](docs/screenshots/ai-blog-writer.png)

### Kanban To-Do Board
> Drag cards between To Do → In Progress → Review → Done columns.

![Kanban Board](docs/screenshots/todos.png)

### Street Marketing (Spot-Spotter)
> Search any city for AI-recommended street marketing locations with match scores.

![Spot Spotter](docs/screenshots/spot-spotter.png)

### Analytics
> Chart.js streaming growth, audience geography heat map & revenue doughnut.

![Analytics](docs/screenshots/analytics.png)

> 📸 *To capture your own screenshots, run the app locally and visit `http://localhost:5173`*

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 ([download](https://nodejs.org))
- **npm** ≥ 9 (bundled with Node)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/RhythrosaLabs/labelflow.git
cd labelflow/labelflow-react

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env
# Edit .env with your values

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build       # outputs to dist/
npm run preview     # preview production build locally
```

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and fill in the values for any AI integrations you want to enable:

```bash
cp labelflow-react/.env.example labelflow-react/.env
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for live AI generation | Optional |
| `VITE_APP_NAME` | Overrides the app display name | Optional |

> ⚠️ **Security:** Never commit your `.env` file. It is excluded via `.gitignore`. All API keys must be prefixed with `VITE_` to be exposed to the browser — never use server-side secrets in a Vite frontend.

---

## 🗂️ Project Structure

```
labelflow/
├── labelflow-react/          # ← Main React app (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/     # One file per feature module
│   │   │   │   ├── DashboardSection.jsx
│   │   │   │   ├── ArtistsSection.jsx
│   │   │   │   ├── CampaignsSection.jsx
│   │   │   │   ├── AssetsSection.jsx
│   │   │   │   ├── ScheduleSection.jsx
│   │   │   │   ├── ContactsSection.jsx
│   │   │   │   ├── OpportunitiesSection.jsx
│   │   │   │   ├── NotesSection.jsx
│   │   │   │   ├── AIArtistSection.jsx
│   │   │   │   ├── AIBlogWriterSection.jsx
│   │   │   │   ├── MerchMockupsSection.jsx
│   │   │   │   ├── ResourcesSection.jsx
│   │   │   │   ├── TodosSection.jsx
│   │   │   │   ├── SpotSpotterSection.jsx
│   │   │   │   └── AnalyticsSection.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MainContent.jsx
│   │   ├── App.jsx           # Root component + FloatingAI
│   │   ├── labelflow.css     # Core design system
│   │   └── integrated_styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── labelflow/                # Original vanilla HTML prototype
├── ai_merch_mockup_maker_by_rhythrosa_labs/
├── cardspots___find_perfect_flyer_locations_by_rhythrosa_labs/
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev) |
| Build Tool | [Vite 7](https://vite.dev) |
| Charts | [Chart.js](https://chartjs.org) (CDN) |
| Icons | [Font Awesome 6](https://fontawesome.com) (CDN) |
| Fonts | [Google Fonts – Inter](https://fonts.google.com/specimen/Inter) |
| Styling | Custom CSS design system (dark theme, CSS variables) |
| State | React `useState` / `useEffect` (no external state library) |

---

## 🔒 Security

- **No secrets are committed** — all sensitive keys go in `.env` (gitignored)
- **No external API calls** by default — all AI responses are simulated locally, keeping the app safe to open-source
- **XSS prevention** — user-generated HTML is only rendered where explicitly safe via `dangerouslySetInnerHTML` on static data
- **No telemetry** — the app makes no external network requests unless you configure an API key
- **CDN integrity** — Font Awesome is loaded with `integrity` and `crossorigin` attributes for subresource integrity

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repository
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙌 Credits

Built by **[Rhythrosa Labs](https://github.com/RhythrosaLabs)** — crafting tools for independent music creators.

> *"The music industry runs on relationships, creativity, and hustle. LabelFlow powers all three."*
