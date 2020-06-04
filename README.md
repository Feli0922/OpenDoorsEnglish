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

4. clone this repo if you haven't already, and run the following command:

```
npm install
```

You're now good to go 👌

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
