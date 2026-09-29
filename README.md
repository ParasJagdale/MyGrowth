# MyGrowth

**Your skills. Your progress. Your story.**

MyGrowth is a responsive React application for managing professional learning. It allows a user to organize skills, certifications, learning targets, progress, and the achievements they want to display on a professional profile.

The project was created as a beginner-friendly React learning project and as a frontend demonstration for a manager. It is inspired by modern workplace learning portals, but it is an independent prototype. It is not connected to Cognizant or any internal company system.

## Table of contents

- [Project status](#project-status)
- [Features](#features)
- [Application routes](#application-routes)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [How to use the application](#how-to-use-the-application)
- [Architecture and data flow](#architecture-and-data-flow)
- [Project structure](#project-structure)
- [React concepts demonstrated](#react-concepts-demonstrated)
- [Data models](#data-models)
- [Browser storage](#browser-storage)
- [Testing checklist](#testing-checklist)
- [Presentation walkthrough](#presentation-walkthrough)
- [Current limitations](#current-limitations)
- [Planned roadmap](#planned-roadmap)

## Project status

MyGrowth is currently a polished **frontend prototype**.

It includes real client-side routes, reusable React components, responsive styling, interactive forms, and browser persistence. It does not yet include a backend, database, user authentication, deployment, or a genuinely public profile URL.

## Features

### Professional dashboard

- Enterprise-style responsive interface
- Persistent laptop sidebar
- Mobile-friendly horizontal navigation
- Sticky top navigation bar
- Dashboard hero section
- Animated summary cards
- Responsive goal cards and forms
- Hover, focus, and reduced-motion states

### Multi-page routing

- URL-based navigation with React Router
- Persistent application layout using `Outlet`
- Active navigation styling with `NavLink`
- Redirects for unknown and legacy routes
- Direct URLs for each main area

### Goal management

- Add skills and certifications
- Rename goals
- Remove goals after confirmation
- Change status between Planned, In progress, and Completed
- Choose whether each item appears on the public profile
- Calculate dashboard totals automatically from goal data
- Display useful empty states when no goals exist

### Dynamic goal form

The form changes according to the selected goal type.

For a **Skill**, it displays:

- Skill name autocomplete
- Target date
- Skill level: Beginner, Intermediate, or Advanced
- Learning resource link
- Notes
- Public-profile visibility setting

For a **Certification**, it displays:

- Certification name
- Target date
- Provider autocomplete
- Credential ID
- Earned date
- Public-profile visibility setting

### Logo suggestions

The custom autocomplete component displays logos and suggestions for popular choices.

Skill suggestions:

- React
- Python
- AWS
- Docker
- TypeScript

Certification provider suggestions:

- OpenAI
- Google
- Anthropic
- Microsoft
- GitHub

Users are not limited to these suggestions. They can enter any skill or provider as free text. OpenAI, Microsoft, and AWS use local SVG files, while the other suggestions use Simple Icons URLs. A text fallback appears if an image cannot load.

The autocomplete supports mouse selection and keyboard interaction with Arrow Up, Arrow Down, Enter, and Escape.

### Certification permissions

Provider and Credential ID can be entered while creating a certification. After creation, they are shown as locked, read-only information on the certification card.

The certification title, status, and public visibility can still be updated.

### Profile and privacy

- Dedicated Profile page
- Initials avatar generated from the display name
- Editable name, role, and introduction
- Total-goal and shared-item statistics
- Read-only public-profile preview
- Only explicitly shared goals appear in the preview
- Goals are private by default unless sharing is selected

### Browser persistence

- Goals survive browser refreshes
- Profile changes survive browser refreshes
- Existing sample data can be upgraded through a migration helper
- Demo goals can be restored from the Profile page

## Default demo data

The fictional default profile is:

```text
Name: Paras Jagdale
Role: Program Analyst Trainee
```

The current sample learning plan includes:

- React Fundamentals
- OpenAI Solutions Practitioner
- OpenAI Technical Practitioner
- Build with Gemini
- Next.js Fundamentals

These records are demonstration data and must not be treated as verified real-world credentials.

## Application routes

| URL | Page | Purpose |
| --- | --- | --- |
| `/` | Overview | Dashboard totals, hero section, and priority goals |
| `/skills` | My Skills | Displays only Skill goals |
| `/certifications` | Certifications | Displays only Certification goals |
| `/plan` | Learning Plan | Displays every learning goal |
| `/profile` | Profile | Profile information, editing, statistics, and public preview |

`/public-profile` is retained as a legacy route and redirects to `/profile`. Unknown routes redirect to `/`.

Although the project has multiple URLs, it is still a single-page application. React Router changes the visible page without requesting a completely new HTML document during normal navigation.

The deployed GitHub Pages build uses hash-based routes, for example:

```text
https://parasjagdale.github.io/MyGrowth/#/skills
```

Hash routing allows every page to load correctly when a deployed URL is refreshed.

## Technology

- React 19
- JavaScript and JSX
- React Router DOM 7
- Vite 8
- Standard CSS
- Browser `localStorage`
- ESLint

No component library or CSS framework is used. The interface is implemented with project-owned CSS.

## Getting started

### Requirements

- Node.js
- npm
- A modern browser

### Installation

Open a terminal in the project directory and run:

```sh
npm install
```

### Start the development server

```sh
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Keep the terminal running while using the application.

### Available scripts

```sh
npm run dev      # Start the Vite development server
npm run build    # Create an optimized production frontend build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint checks
```

The `node_modules` directory does not need to be transferred to another computer. Running `npm install` recreates it from `package.json` and `package-lock.json`.

## Deployment

The project is configured for GitHub Pages at:

```text
https://parasjagdale.github.io/MyGrowth/
```

The workflow in `.github/workflows/deploy.yml` automatically installs dependencies, creates the Vite production build, uploads the `dist` directory, and deploys it whenever a change is pushed to `main`.

To enable the first deployment:

1. Open the GitHub repository.
2. Select **Settings**.
3. Select **Pages** under **Code and automation**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and monitor the deployment workflow.

After GitHub Pages is enabled, every future push to `main` deploys automatically.

## How to use the application

### Add a goal

1. Select **Add goal** in the top bar, **Create a new goal** on Overview, or **Add goal** on a goal page.
2. Select Skill or Certification.
3. Complete the fields displayed for that type.
4. Optionally select **Show on public profile**.
5. Select **Add skill** or **Add certification**.

New goals begin with the status `Planned`.

### Use autocomplete suggestions

1. Focus the Skill Name or Provider field.
2. Type to filter the suggestions.
3. Select a suggestion with the mouse, or use the arrow keys and Enter.
4. Continue typing if the required value is not listed.

### Update a goal

- Select **Edit** beside the title to rename it.
- Use the status menu to select Planned, In progress, or Completed.
- Select or clear **Share on public profile**.
- Select **Remove** and confirm to delete the goal.

Changes are reflected across every route because all pages use the same shared goal state.

### Edit the profile

1. Open `/profile` or select the avatar in the top bar.
2. Select **Edit profile**.
3. Update the display name, role, or introduction.
4. Select **Save profile**.

The avatar initials update automatically when the name changes.

### Preview shared information

The Profile page contains a read-only public preview. Only goals with `isPublic: true` are displayed there.

This preview is local. It is not currently available to other people through a public URL.

### Reset demo goals

Open the Profile page and select **Reset demo goals**. After confirmation, the app replaces the current goals with the latest sample data.

This operation does not reset the saved profile.

## Architecture and data flow

The high-level data flow is:

```text
User action
    -> Page or form component
    -> Callback function from App.jsx
    -> React state update
    -> Components re-render
    -> useLocalStorage saves the new value
```

### Application responsibilities

`main.jsx` starts React and renders `App`.

`App.jsx`:

- Owns shared goals and profile state
- Defines the route table
- Handles add, update, delete, reset, and profile-save operations
- Passes data and callback functions to page components

`AppLayout.jsx`:

- Keeps the Sidebar and TopBar visible
- Displays the active route through React Router's `Outlet`
- Owns the Add Goal modal presentation

Page components organize complete screens. Smaller components handle focused interface responsibilities such as forms, cards, navigation, and profile previews.

### Shared state flow

Data travels down through props:

```text
App -> Page -> Section -> Card
```

User actions travel upward through callback props:

```text
Card -> Section -> Page -> App
```

`App` updates the shared state, causing every affected page to display the latest data.

## Project structure

```text
MyGrowth/
  public/
    logos/
      aws.svg
      microsoft.svg
      openai.svg

  src/
    components/
      forms/
        GoalForm.jsx
        LogoAutocomplete.jsx
        ProfileForm.jsx
      goals/
        GoalCard.jsx
        GoalNameEditor.jsx
        LearningSection.jsx
      layout/
        AppLayout.jsx
        DashboardHeader.jsx
        Sidebar.jsx
        SummaryCards.jsx
        TopBar.jsx
      profile/
        PublicProfile.jsx

    data/
      goalSuggestions.js
      initialData.js
      migrateGoals.js
      migrateProfile.js

    hooks/
      useLocalStorage.js

    pages/
      GoalsPage.jsx
      OverviewPage.jsx
      ProfilePage.jsx

    utils/
      goalHelpers.js

    App.css
    App.jsx
    index.css
    main.jsx

  eslint.config.js
  index.html
  package.json
  package-lock.json
  vite.config.js
```

### Important files

| File | Responsibility |
| --- | --- |
| `src/App.jsx` | Shared state, actions, and routes |
| `src/components/layout/AppLayout.jsx` | Persistent application shell and route outlet |
| `src/components/forms/GoalForm.jsx` | Dynamic skill and certification form |
| `src/components/forms/LogoAutocomplete.jsx` | Reusable logo suggestion dropdown |
| `src/components/goals/GoalCard.jsx` | Goal details, status, sharing, and removal controls |
| `src/pages/ProfilePage.jsx` | Profile information, editing, statistics, and preview |
| `src/hooks/useLocalStorage.js` | State initialization and browser persistence |
| `src/data/initialData.js` | Fictional sample profile and goals |
| `src/data/goalSuggestions.js` | Skill and provider suggestions with logo URLs |
| `src/data/migrateGoals.js` | Upgrades older saved sample data |
| `src/data/migrateProfile.js` | Replaces the original Alex Patel sample while preserving user-edited profiles |
| `src/utils/goalHelpers.js` | Filtering, public-goal selection, and summary calculations |
| `src/App.css` | Application components and responsive design |

## React concepts demonstrated

### Components

The interface is divided into reusable components with focused responsibilities.

### Props

Pages and components receive data and callback functions from their parents.

### `useState`

Used for:

- Form values
- Modal visibility
- Inline editing
- Autocomplete visibility and keyboard selection

### `useEffect`

Used by `useLocalStorage` to synchronize React state with browser storage. It is also used by the autocomplete to register and clean up its outside-click listener.

### `useRef`

Used by the autocomplete to identify whether a click happened inside or outside the dropdown.

### Custom hooks

`useLocalStorage` combines state initialization and persistence into a reusable hook.

### Controlled inputs

Form input values come from React state. Input events update that state.

### Conditional rendering

The Goal Form displays different fields for Skills and Certifications. Empty states, modals, edit forms, and public items are also rendered conditionally.

### List rendering

Goals, navigation items, cards, and autocomplete suggestions are rendered from arrays with `.map()`.

### Client-side routing

`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Navigate`, and `Outlet` provide a multi-page experience inside a React SPA.

## Data models

### Skill goal

```js
{
  id: 1,
  title: "React Fundamentals",
  type: "Skill",
  targetDate: "Sep 12",
  status: "In progress",
  isPublic: false,
  skillLevel: "Intermediate",
  learningResourceLink: "https://react.dev/learn",
  notes: "Strengthen component, state, and hooks fundamentals.",
  provider: "",
  credentialId: "",
  earnedDate: ""
}
```

### Certification goal

```js
{
  id: 2,
  title: "OpenAI Solutions Practitioner",
  type: "Certification",
  targetDate: "Sep 30",
  status: "In progress",
  isPublic: true,
  skillLevel: "",
  learningResourceLink: "",
  notes: "",
  provider: "OpenAI",
  credentialId: "OAI-SP-2026",
  earnedDate: ""
}
```

### Profile

```js
{
  displayName: "Paras Jagdale",
  role: "Program Analyst Trainee",
  introduction: "I'm growing my skills in React and cloud technologies."
}
```

## Browser storage

MyGrowth uses two `localStorage` keys:

```text
mygrowth-goals
mygrowth-profile
```

The data is serialized as JSON before it is saved.

### What browser persistence means

Data normally remains after:

- Refreshing the page
- Closing and reopening the browser
- Restarting the computer

Data can be lost when:

- Browser storage is cleared
- A different browser or browser profile is used
- The application is opened under a different origin
- Demo goals are reset

The data does not synchronize across devices.

### Inspect stored data

In Chrome or Edge:

1. Open Developer Tools.
2. Select **Application**.
3. Expand **Local Storage**.
4. Select the local MyGrowth URL.
5. Inspect `mygrowth-goals` or `mygrowth-profile`.

### Manual reset

To remove only saved goals from the browser console:

```js
localStorage.removeItem("mygrowth-goals");
location.reload();
```

To remove only the saved profile:

```js
localStorage.removeItem("mygrowth-profile");
location.reload();
```

Removing storage is permanent for that browser profile. Prefer the application's **Reset demo goals** button when only the learning plan needs to be restored.

## Testing checklist

### Navigation

- [ ] Every sidebar item opens the correct URL.
- [ ] The active navigation item is highlighted.
- [ ] The sidebar and top bar remain visible between routes.
- [ ] Opening a route directly works in the development server.

### Skill creation

- [ ] Skill suggestions display with icons.
- [ ] Suggestions filter as the user types.
- [ ] Keyboard navigation selects a suggestion.
- [ ] A custom skill name can be entered.
- [ ] Skill Level, Resource Link, and Notes are saved.
- [ ] The new skill appears on Skills and Learning Plan.

### Certification creation

- [ ] Provider suggestions display with icons.
- [ ] A custom provider can be entered.
- [ ] Credential ID and Earned Date are saved.
- [ ] The new certification appears on Certifications and Learning Plan.
- [ ] Provider and Credential ID are read-only after creation.

### Goal actions

- [ ] Status changes update the summary cards.
- [ ] Goal titles can be renamed.
- [ ] Canceling a title edit keeps the previous title.
- [ ] Canceling removal keeps the goal.
- [ ] Confirming removal deletes the goal.
- [ ] Sharing can be enabled and disabled.

### Profile

- [ ] Name, role, and introduction can be updated.
- [ ] Avatar initials update with the name.
- [ ] Profile statistics display correct totals.
- [ ] Only shared goals appear in the public preview.
- [ ] Reset demo goals restores current samples.

### Persistence and quality

- [ ] Changes remain after a browser refresh.
- [ ] The interface works at mobile, tablet, and laptop widths.
- [ ] No horizontal page scrolling occurs on mobile.
- [ ] All buttons and inputs have visible keyboard focus.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Presentation walkthrough

A clear manager demonstration can follow this sequence:

1. Introduce the problem: employees need one place to organize professional learning.
2. Show the Overview dashboard and explain the calculated summary cards.
3. Navigate between routes without a page reload.
4. Add a Skill using the logo autocomplete.
5. Add a Certification and show the different fields.
6. Change a goal from Planned to In progress or Completed.
7. Show the dashboard totals updating automatically.
8. Enable **Share on public profile** for one item.
9. Open Profile and show the read-only preview.
10. Edit the profile and demonstrate the updated avatar initials.
11. Refresh the browser to demonstrate persistence.
12. Explain the planned backend architecture and current prototype limits.

Suggested project summary:

> MyGrowth is a responsive React learning-management prototype. It uses React Router for client-side pages, reusable components and hooks for maintainability, dynamic forms for different learning-goal types, and localStorage for browser persistence. Users can manage skills and certifications and control which achievements appear in a professional profile preview.

## Current limitations

- No backend API
- No permanent database
- No registration or sign-in
- No multi-user ownership model
- No synchronization across devices
- No deployed public profile URL
- No server-side privacy enforcement
- No automated test suite yet
- Logo URLs that are not local require an internet connection

Do not enter real employee data, company-confidential information, passwords, or other sensitive information in this prototype.

## Planned roadmap

### Frontend completion

1. Add friendly field-level validation messages.
2. Add search, filtering, and sorting for large learning plans.
3. Add automated component and interaction tests.
4. Complete presentation testing on mobile and laptop layouts.

### Backend phase

The planned architecture is:

```text
React frontend -> Node.js/Express API -> MongoDB Atlas
```

Recommended implementation order:

1. Create an Express server.
2. Add profile and goal API endpoints.
3. Connect MongoDB Atlas from the server.
4. Replace localStorage operations with API requests one feature at a time.
5. Add registration and sign-in.
6. Enforce user ownership and authorization on the server.
7. Add a safe public-profile endpoint that returns only explicitly shared data.
8. Deploy the frontend and backend.

The React frontend must never connect directly to MongoDB Atlas. Database credentials belong in server-side environment configuration.

## Development guidelines

- Keep components focused on one clear responsibility.
- Prefer clear names and small functions.
- Keep state in the closest sensible owner.
- Use props for parent-to-child data flow and callbacks for child-to-parent actions.
- Add hooks only when they solve a real problem.
- Preserve privacy defaults when adding new features.
- Make focused changes instead of replacing the entire application.
- Keep the app working after every incremental update.
- Run lint and build checks before presenting or handing off the project.

## Disclaimer

MyGrowth is an independent educational prototype. It is not an official Cognizant application, does not use Cognizant branding, and is not connected to internal employee systems.
