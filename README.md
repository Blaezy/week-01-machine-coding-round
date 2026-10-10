# Interview Practice Tracker

A responsive dashboard for tracking weekly interview-preparation work (DSA, Git, and technical questions plus the machine-coding task). Built with React and Vite. No backend needed.

## Features

- **Dashboard**: total questions, completed DSA problems, completed interview questions (Git + Technical), and machine-coding status.
- **Question tracker**: add questions with category (DSA / Git / Technical), difficulty (Easy / Medium / Hard), and status (Pending / In Progress / Completed). Change status inline or delete a question.
- **Search + filters**: search by title and filter by category, status, and difficulty. All filters combine.
- **Progress**: overall completion ring plus a progress bar per category.
- **Persistence**: data is saved in LocalStorage and survives a refresh.
- **Responsive**: works on desktop and mobile.
- **States**: empty state, no-results state, and form validation (required, 3 to 100 characters, no duplicates within a category).
- **Extras**: one-click "Load Sheet 01 questions" starter list, and per-category progress bars.

## Setup

```bash
npm install
npm run dev      # start dev server
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx                 state, filtering, derived stats
  hooks/useLocalStorage.js
  data/constants.js       categories, statuses, Sheet 01 starter list
  components/
    Dashboard.jsx
    Progress.jsx
    QuestionForm.jsx
    Filters.jsx
    QuestionList.jsx
    QuestionItem.jsx
```

## Assumptions

- "Interview questions completed" counts completed Git and Technical questions; DSA is tracked separately.
- Progress percentage is based only on stored questions, not on the machine-coding status.
- Machine-coding status is a single value stored separately, since it's one task per week.
- Data is per browser. Clearing site data resets the tracker.
