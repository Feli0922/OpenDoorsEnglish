# Open Doors English

## Project setup

1. Make sure you have node.js and npm installed and up to date. You can check your version in the command ine:

```
node -v
npm -v
```

If you don't have either installed, go to https://nodejs.org/en/ and install the "Recommended" version. npm is included with the node.js download.

2. Install the following add-ons for VSCode:

- Prettier
- ESLint
- Vetur

3. Open up your VSCode settings.json (ctrl+shift+p or cmd+shift+p, type "settings", click on "Preferences: Open Settings (JSON)") and add the following lines:

```
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
        "source.fixAll": true
},
"editor.tabSize": 2,
```

which do the following:

- run Prettier when you save
- run ESLint when you save
- make sure tab size to 2 spaces instead of 4

4. clone this repo if you haven't already, and run the following command:

```
npm install
```

You're now good to go 👌

### Compiles and hot-reloads for development

```
npm run serve
```

^Do this to run the project on your computer

### Compiles and minifies for production

```
npm run build
```

^This is for when we deploy

### Lints and fixes files

```
npm run lint
```

^This will lint the entire project and automatically fix any linting errors that can be fixed

### Linting and formatting rules

Linting and formatting rules for this project can be found in eslintrc.js and prettierrc.js, respectively. Currently I'm enforcing double quotes, semicolons, and trailing commas.
