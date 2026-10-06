# Sunday Web

Main workspace web application for Sunday.

| Attribute | Value |
| --- | --- |
| Owner | Web Platform Team |
| Lifecycle | Production |
| Depends on | sunday-api |

Sunday brings a team's boards and people into one shared workspace.

## Getting started

Use Node.js 22.12 or newer and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

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
Styling uses plain CSS without a UI framework.

## Project structure

```text
src/
  components/   Shared application UI
  App.tsx       Application entry
  main.tsx      React and routing setup
  styles.css    Application styling
```

## Testing

Run `npm run typecheck` and `npm run build` before submitting changes.
