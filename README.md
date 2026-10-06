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
hosted API, configure CORS for the frontend origin on sunday-api. Authentication
is supplied by the hosting environment; this application does not implement a
sign-in flow.

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
  App.tsx       Application entry
  main.tsx      React and routing setup
  styles.css    Application styling
```

## Testing

Run `npm run typecheck` and `npm run build` before submitting changes.
