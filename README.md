## Requeriments

* Node 10.9.0 or nvm
* Yarn
* Java for e2e tests with selenium

## Getting Started

In the root directory of the repo

```
yarn run all
```

This script will install deps, run eslint, start the server with pm2 and run functional tests with nightwatch

Now the app should be running at http://localhost:8080/

Also you can run:

```
yarn run clean
yarn run lint
yarn run test
yarn run build
yarn run start
yarn run stop
yarn run test:e2e
```

## CI width Circle CI

* [develop](https://circleci.com/gh/gacosta89/reddit-client/tree/develop)

## How it works

* Theres one page `/top` with a left bar and list with top 50 reddits
* In desktop mode the left bar is fixed, reddits can be navigated by clicking the cards
* In mobile mode the left bar is swipeable, reddits can be navigated by tapping and dismissed by swiping the reddit to the left
* Reddits can be dissmised in the detail view, and you can navigate to the original url by tapping the main img
* State is persisted in the local storage if available. But the app will reload the list after a dismiss all and F5

## Missing Features / bugs

* Fix overfloading text in phone devices
* Hide the scrollbar in mobile
* Unit test components with enzyme and jest
* Add loaders when fetching images

* Update to react router v4 and figure out how to sync router v4 with the state

## Tech stack

* Babel
* Redux
* Redux sagas
* React
* Styled Components
* React router
* Express
* Node config
* Jest
* Nightwatch
* Pm2


## What's inside?

The idea is to put reusable code into the core package and be able to churn out applications like web, static-server, api, maybe a native app in the future.

* `shared`    - Shared code.
* `client` - For browser-only code.
* `server` - For static server code.
* `shared/test` - For e2e tests code.

## PD

As always I enjoyed doing this assignments. I hope you like it, I did it with love.
 
