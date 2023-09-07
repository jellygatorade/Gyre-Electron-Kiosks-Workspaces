# Video Kiosks Workspaces

This project uses [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true) to create a monorepo of separate Electron projects that all utilize the same dependencies.

## How to add a new workspace

1. Create a new project folder within the `workspaces` directory.

2. In the monorepo root `package.json`, add path to the new workspace directory in the `"workspaces"` array.

3. In the new workspace directory, `npm init -y` and set up its unique `package.json`.

4. In the new workspace directory, `npx electron-forge import`. See [Electron Quick Start](https://www.electronjs.org/docs/latest/tutorial/quick-start) guide for details. This adds `electron-forge` dev dependencies to the workspace's `package.json` and creates the `forge.config.js`.

5. Once the workspace's `main.js` is ready (`workspaces/<workspace>/src/main.js`), develop using `npm start` and run a test build with `npm run make`.

6. If `tailwindcss` is desired in the new workspace, `npx tailwindcss init` to create `tailwind.config.js`. See [Tailwind Installation](https://tailwindcss.com/docs/installation) guide for details.

## Within each workspace

Develop with Tailwind  
`npx tailwindcss -i ./src/style/tailwind-input.css -o ./src/style/tailwind-compiled.css --watch`

Develop and build with Electron  
`npm start`  
`npm run make`
