# Vue 3 + TypeScript + Vite

This project is a Vue.js application with Server-Side Rendering (SSR) enabled. It dynamically renders components based on user interaction and fetches data from an API. The project uses Vite for building and bundling, Express for the server, and Pinia for state management.

---

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

---

## Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/Achury/vue-dynamic-rendering.git
   ```
2. Install dependencies:

```bash
  npm install
```

## Build and Run

1. Build the project

```bash
  npm run build
```

2. Start the server

```bash
  npm run serve
```

3. Access the application
   Open your browser and navigate to http://localhost:3000.

## Project Structure

```bash

   project/

├── dist/ # Build output (client and server bundles)
│ ├── client/ # Client-side bundle
│ └── server/ # Server-side bundle
├── src/
│ ├── components/ # Vue components
│ │ ├── dynamicRenderer.vue
│ │ ├── componentA.vue
│ │ ├── componentB.vue
│ │ └── componentC.vue
│ ├── stores/ # Pinia stores
│ │ ├── dynamicStore.ts
│ │ └── dataStore.ts
│ │── types/ #TS custom types
│ │ │── components.ts
│ │── test/ # Unit testing Vitest
│ │ │── components/ #components tests
│ │ │ │── dynamicRenderer.test.ts
│ │ │── stores/ #Stores tests
│ │ │ │── dataStores.test.ts
│ ├── App.vue # Main Vue component
│ ├── main.ts # Client entry point
│ └── entryServer.js # Server entry point
├── build.js # Custom build script
├── cypress.config.ts # Cypres configuration
├── tsconfig.json # TS configuration
├── server.js # Express server
├── vite.config.ts # Vite configuration
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

```

## Testing

The project uses Vitest for unit testing. To run the unit tests:

    1. Run all unit tests:

```bash
  npm run test
```

    2. Run tests in watch mode (useful during development):

```bash
  npm run test -- --watch
```

The project uses Cypress for end-to-end testing. To run the E2E tests:

    1. Open the Cypress test runner:

```bash
  npm run test:e2e
```

    2. Select the test file you want to run from the Cypress interface.

## Troubleshooting

Common Issues

1. Build Fails:

   - Ensure all .vue files have at least a <template> or <script> block.
   - Check the build logs for errors.

2. Server Fails to Start:

   - Ensure the dist/server/entryServer.js file exists and exports the render function.
   - Check the server logs for errors.

---

### Summary of Documentation

1. **Project Overview**: Brief description of the project.
2. **Project Structure**: Explanation of the folder structure.
3. **Build Process**: Details about the custom build script.
4. **Running the Project**: Steps to install, build, and run the project.
5. **Testing**: Steps to unit testing and e2e testing.
6. **Troubleshooting**: Common issues and solutions.
