# Interview Practice Tracker

A responsive, multi-page dashboard for tracking weekly interview-preparation work (DSA, Git, technical questions and a weekly machine-coding round). Built with React, Vite, React Router and Tailwind CSS. No backend.

## Features

**Required by the sheet**
- **Dashboard**: total questions, completed DSA problems, completed interview questions, a weekly progress chart, weekly activity, a submission overview and a progress card per section, including Machine Coding.
- **Question tracker**: add questions with category (DSA / Git / Technical), difficulty (Easy / Medium / Hard) and status (Pending / In Progress / Completed).
- **Search + filters**: search by title; filter by category, status and difficulty.
- **Progress**: completion percentage on the dashboard, a bar per section, and a weekly chart.
- **Persistence**: everything is saved in LocalStorage.
- **Responsive UI**: desktop sidebar layout and a mobile drawer menu.
- **States**: empty state, no-results state, and form validation (required, 3 to 100 characters, no duplicates within a category).

**Extras**
- Sidebar pages: Dashboard, DSA, Git & GitHub, Full-Stack Technical, Machine Coding.
- Multiple weeks: add Week 02, 03 and so on, and switch between them. Each week keeps its own questions and its own machine-coding round.
- Add question popup, theme toggle (dark / cream light), and Undo after deleting a question.
- Machine Coding: one coding round per week with your own title, description, up to four tags and a list of features (each with a difficulty). Every feature is a trackable question: it appears on the Machine Coding page, in the all-categories tracker on the dashboard, and in the dashboard totals. Round progress is derived from its features; there is no round-level status.

## Stack

- React 18 + Vite 5
- React Router 7 (`react-router`, `BrowserRouter`) for URL routing
- Tailwind CSS 4 (`@tailwindcss/vite`), with the two themes kept as CSS variables in `src/index.css`
- `lucide-react` for icons
- React Hook Form + Zod for the question and coding-round forms

## Setup

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Routes

`/dashboard`, `/dsa`, `/git`, `/technical`, `/machine`. `/` redirects to `/dashboard`, and unknown URLs show a
not-found page. Old `/#/dsa` style bookmarks redirect to the matching path. `vercel.json` rewrites every path to
`index.html`, so direct links and refreshes work on Vercel.

## Structure

```
src/
  main.jsx                   BrowserRouter + app mount
  App.jsx                    route table
  context/AppContext.jsx     tracker data, open modal and toast, shared through useApp()
  pages/                     Dashboard, MachineCoding, NotFound
  components/
    layout/                  AppLayout (Outlet), Sidebar, Header, AppModals
    questions/               QuestionCard, QuestionList, QuestionFilters, QuestionsPanel,
                             QuestionForm, QuestionSection (DSA / Git / Technical pages)
    machine-coding/          CodingRoundHeader, CodingFeatureList, CodingRoundForm,
                             CodingRoundEmptyState
    dashboard/               ProgressOverview, ProgressCard, Charts
    weeks/                   ManageWeeks
    common/                  Button, Card, Band, ProgressBar, Tag, EmptyState, Field, Modal, Toast
  hooks/
    useTracker.js            weeks, questions and rounds; all mutations
    useLocalStorage.js       useState mirrored into storage
    useTheme.js              theme state applied to <html data-theme>
    useRouteKey.js           first path segment of the current URL
  services/storageService.js LocalStorage access and saved-data migrations
  utils/
    progress.js              percentages, round progress, stats
    questionHelpers.js       tracker-item view, filtering, weekly activity
    styles.js                class helpers (cx, category and status classes)
  data/
    constants.js             categories, statuses, section copy, route keys
    initialData.js           Sheet 01 starter list, week factory
```

## Data model

Weeks are stored under `ipt:weeks`. Each week holds its manually added `questions` and at most one `round`:

```
round   { id, weekId, title, subtitle, tags[], features[], createdAt, updatedAt }
feature { id, roundId, title, status, difficulty, completedAt, updatedAt }
```

A feature's `status` (Pending / In Progress / Completed) is the only record of whether it is done. The global
tracker does not store Machine Coding entries: it builds them on the fly from `week.round.features` with the same
ids (category `Machine`), so the Machine Coding page, the tracker and the dashboard always read one record.
Status changes from any of them go through the same `changeStatus` action.

Saved data from earlier versions (features stored as `{ label, done }` and a manual round `status`) is converted on
load: `label` becomes `title`, `done` becomes `Completed` / `Pending`, and the round status is dropped.

## Assumptions

- "Interview questions completed" counts Git and Technical; DSA is tracked separately.
- Machine coding is one user-created round per week. Round progress is the share of its features that are Completed.
- Features are added, renamed, re-rated and removed only in the Edit Coding Round form. Their cards have a status control but no delete button, on the Machine Coding page and in the global tracker.
- Features have a difficulty (default Medium) so the difficulty filter works on them.
- Weekly activity is counted from completion timestamps recorded from this version onward, so earlier completions are not shown.
- Only the very first fixed-checklist version (a `machine` key on the week) is not carried over. Rounds from the previous version are migrated as described above.
- Week 01 starts with the Sheet 01 questions loaded; new weeks start empty.
- Data is per browser. Clearing site data resets the tracker.
