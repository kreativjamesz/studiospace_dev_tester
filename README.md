### TASKS
1) Attach the login form found in /pages/index.vue to Vue, storing the submitted fields from the login 
   event to the User Data Store in /stores/userDataStore.js
2) Create a custom Welcome page for the logged in user e.g. /pages/welcome.vue, that should display a 
   message containing the username from the User Data Store an action to logout and some simple styling.
3) Set up redirects within the Vue Router to allow a user to skip the login page and go directly to 
   the welcome page if the User Data Store has a username, and to send the user to the login page if
   a user attempts to access the welcome screen without having a username in the store.

Try not to install any additional modules, if you do, please list the additional modules you have
installed and the reason for doing so. Feel free to create any additional Components or Assets that 
you'll need.

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

## Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## State Management Module - Pinia

Look at the [Pinia documentation](https://nuxt.com/modules/pinia) to learn more