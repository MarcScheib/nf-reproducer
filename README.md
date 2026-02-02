# Reproduction

New workspace create via:

```sh
npx create-nx-workspace@latest
```

Settings:
```
✔ Where would you like to create your workspace? · nf-reproducer
✔ Which starter do you want to use? · custom
✔ Which stack do you want to use? · angular
✔ Integrated monorepo, or standalone project? · integrated
✔ Application name · nf-reproducer
✔ Which bundler would you like to use? · esbuild
✔ Default stylesheet format · css
✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? · No
✔ Which unit test runner would you like to use? · vitest-analog
✔ Test runner to use for end to end (E2E) tests · none
✔ Try the full Nx platform? · skip
```

Added the following modules for testing:

```sh
# Add Native Federation module
npm i @angular-architects/native-federation -D
# Convert app to a module federation host
npx nx g @angular-architects/native-federation:init --project nf-reproducer --port 4200 --type dynamic-host

# Create remote application
npx nx g @nx/angular:app apps/nf-reproducer-remote
# Convert remote app to module federation remote
npx nx g @angular-architects/native-federation:init --project nf-reproducer-remote --port 4201 --type remote

# Add libraries
npx nx g @nx/angular:library --name=sdk --directory=libs/sdk --importPath=@ui/sdk --publishable
```


## Running the apps

Run the host application `nf-reproducer`:

```sh
npm start
```

Run the remote application `nf-reproducer-remote`:

```sh
npm run remote
```