# CLI RPN Calculator

---
## 1. Description
Simple command-line reverse polish notation (RPN) calculator

Features:
- Lightweight CLI (no extra library). Since it is calculator, no alphabet character allowed.
  - `C` to reset calculator
  - Enter `Q` or `Ctrl D` to quit the CLI
- Simple message-block.

**[Demo Link](https://cli-rpn-calculator.herokuapp.com/) on Heroku**


## 2. Architectural
- Vue 3:
  - Vue provides the Composition API that helps to refactor and reuse the components much more easy. Vue is much simpler and not depend on JSX. For this simple app, I choose Vue 3 as the main stack.
- Typescript:
  - prevent error type, which can help decrease the
- Vite: Building tools made by Vue's author. It is serve HRM lightning Fast and support Vue3/Typescript by default
- Heroku: free simple cloud service.
- Testing: Jest

## 3. Getting start

### Requirements:
- Node 14.x or above
- Yarn 1.22 or above
```
nvm use 14
npm install -g yarn
```

### Development
- Run `yarn dev`
and open http://localhost:3000 in the browser

- Run `yarn check` to ensure that the eslint is correct.
  - It will trigger Prettier + ESlint + Typescript Check
  - It is recommended to run before every commit (can use pre-commit hook).

- Run `yarn test` to ensure all unit-test is passed

### Deployment
- The demo is deployed in heroku with buildbacks/nodejs. Please make sure Heroku CLI was installed
```
heroku login
heroku buildpacks:set heroku/nodejs
heroku git:remote -a cli-rpn-calculator
git commit -am "some file"
git push heroku main
```
- If error, please try `heroku logs -tail`
- NodeJS Express (`/server/server.ts`) is use to serve the static files. Use Static server make project more flexbile and easily to scalable.
Supposed in the future we need to implement WebSocket or fake-api like json-server (to docoupled), then serve static make it mroe scalable


## Structures
- /server: Node server to serve static. Can be used for faking API later
- /src:
  - asset
  - components
  - scss: The common sass variables that exposed to all components
  - types: Interface for Typescript
  - utils
    - calc.ts: core utils function that calculate the the RPN from [command]


## Tradeoffs
- No E2E testing (selenium test)
- No test coverage and CI/CD integrated (e.g. no TravisCI/CircleCI setup)
- `Cursor` is the main component that handle the CLI input. Right now it so many logic here and need to refactor
It could be made use of Composition API (Vue3) to split it into smaller composable mixins or compose such as
  - input: handle left/right/up/down
  - cursor: track current location and handle the flickering animation
  - close: handle close (Cmd + D action)
- More unit tests could be written to handle the logic
- Some of CLI shortcut haven't implemented yet. The RPN is not intelligent yet.



## What could be done in future ?
- History of command (up/down button)
- Shortcut: Cmd + Left/Right to quickly jump between word
- Make it is more robust. e.g. `2 3+` will be considered invalid syntax, but in fact it can be understand at `2 3 +`.
