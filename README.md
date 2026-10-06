# Sunday Web

Main workspace web application for Sunday.

| Attribute | Value |
| --- | --- |
| Owner | Web Platform Team |
| Lifecycle | Production |
| Depends on | sunday-api |

Sunday brings a team's boards and people into one shared workspace.
Home provides a workspace overview, Boards shows projects and their collaborators,
and Members lists the whole workspace team. Guests collaborate alongside members
and are identified by a small role badge in the shared member list.

## Getting started

Use Node.js 22.12 or newer and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Environment variables

Copy `.env.example` to `.env.local` if you want to configure API access.

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL for sunday-api, such as `http://localhost:3000`. Leave empty to use bundled Acme workspace data. |

Restart Vite after changing environment variables. Vite embeds these variables
into the client bundle; never put secrets in them.

## Development commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm test` | Run all frontend tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally |

## Architecture

React and TypeScript power the application, with Vite handling development and
production bundling. The shared shell contains workspace branding and a header.
React Router provides Home, Boards, and Members navigation. The dashboard shows
workspace counts and boards ordered by their most recent update. Styling uses
plain CSS without a UI framework.

`src/services/api.ts` is the sole API access boundary. It exposes the same typed
interface for bundled data and the remote sunday-api service:

| Method | Endpoint | Response |
| --- | --- | --- |
| GET | `/workspaces/:id` | `Workspace` |
| GET | `/workspaces/:id/members` | `Member[]` |
| GET | `/workspaces/:id/boards` | `Board[]` |
| GET | `/boards/:id/members` | `Member[]` |

Responses are direct JSON objects or arrays matching `src/models/workspace.ts`,
not envelope objects. The remote client checks response shapes and HTTP status.
Configured API failures show an error with a retry action; they do not silently
switch to bundled data. Requests are canceled when the loading component unmounts.
The local implementation returns independent copies of its data.

The application opens the Acme workspace (`acme`). Workspace and board data load
through the service layer; pages remain presentation components. For a separately
hosted API, configure CORS for the frontend origin on sunday-api. This application
does not implement a sign-in flow or send authentication credentials; integrate
the deployment's authentication contract before enabling a protected API.

Production hosts must serve `index.html` for client-side routes such as `/boards`
and `/members`. `npm run preview` provides this behavior locally.

## Project structure

```text
src/
  components/   Shared application UI
  data/         Workspace data
  models/       TypeScript domain models
  pages/        Route-level screens
  services/     Typed API boundary and local implementation
  test/         Test setup
  App.test.tsx  Workspace screen and navigation tests
  App.tsx       Application entry
  main.tsx      React and routing setup
  styles.css    Application styling
.github/
  CODEOWNERS    Web Platform Team ownership
  workflows/    Frontend validation
```

## Testing

Vitest and React Testing Library run five tests in jsdom. They cover the Acme
dashboard and counts, navigation, the shared internal/guest member list, board
collaboration, loading and retry behavior, and the API endpoint and validation
contract. Tests always use local workspace data unless they explicitly stub fetch;
they do not require a running backend.

```sh
npm test
npm run typecheck
npm run build
```

GitHub Actions installs from the lockfile with `npm ci`, checks types, runs tests,
and builds every push and pull request. There is no deployment step.

For a manual UI check, run `npm run dev` and visit Home, Boards, and Members.
Check navigation, board collaborators, and the member list at laptop and narrow
viewport widths. The member table scrolls horizontally on smaller screens.
