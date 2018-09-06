## Live in 

* [Reddit Client](https://gacosta89.github.io/reddit-client/#/)

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

## Architecture

The architecture is redux. And it consists of the following components:

* Actions for describing user events, like create, toggle, tap, select.
* Store for keeping the state of the app and reducers.
* Reducers for the business logic.
* Selectors as an encapsulation of the tree state shape.
* React components as the presentational layer.
* Sagas for IO/networking (side effects) and coordinating async flows

It has a unidirectional flow, meaning the pipeline starts by dispatching an action 
to the store, the store takes the action and the current state and calls the reducer which
will compute the next state. 

After every action is dispatched and the next state computed, the store will call its 
listeners, e.g. presentational components, to notify there's a new state available.

Components will execute selectors on the new state to get their required props, thus 
abstracting the component from the tree state shape. 

* Note: selectors are smart enough to detect if the pice of the state they are observing 
changed by immutable checks and only recompute if the data has changed.

* Note: components are smart enough to detect if at least one of the props computed 
by selectors have changed by immutable checks and only then re-render the component.

Finally sagas are async workers that sit and observe the flow of actions, and when
the right action is triggered or the right flow is acomplished then do a task 
(fetch data from back end, save data, write the local storage).


## Benefits

I find this architecture beautiful and elegant, because it is simple. 

### High separation of concerns: 

* Good design is about decomposing a complex problem and work on a particular 
piece of the problem at a time. This has to do with the limitation of our brain of not 
being able to think about many things at once.

* We can't predict the future but we can create a flexible codebase to adapt easilly 
when the time comes. High separation of concerns creates an inherently flexible codebase.

* Separation of concerns at multiple levels, not only high level layers, ergo decompsition, creates this highly reusable single responsability components that can be combined 
in other ways to add new features or even create a entire new application.

* It is super easy to unit test components, and this is done without mocking dependencies 
thanks to this high level of separation of concerns. Unit testing is a necesary condition
for software quality. We can make unit tests for every piece of the architecture, reducers, presentational components, even for sagas side effects.


### Simplicity

* An inherently simple architecture allows team members to reason about
the app quickly. Also, for new members to shorten the ramp-up time, as they have to learn
the architecture once, and be confident that this will be the standard way through the whole app. 

* From the previous point derives an increase in productivity.

* You get an intuition of where a bug might be located, in which layer, which component.

* An simple codebase allows agility. If your codebase is complex and your's competitor is simple,
he will be able to move from A to B straightforward while you try to move the elephant 
of complexity of your codebase. How good you can get at moving an elephant?


## Cons

### Boilerplate

* Boilerplate, although I don't see it as a con but a sacrifice for all previous points.
If we evaluate trade-offs, benefits win over cons.

I have an article about this called [The truth behind redux boilerplate](https://medium.com/@graccba/the-truth-behind-redux-boilerplate-6af98492d45d)



## What's inside?

The idea is to put reusable code into the core package and be able to churn out applications like web, static-server, api, maybe a native app in the future.

* `shared`    - Shared code.
* `client` - For browser-only code.
* `server` - For static server code.
* `shared/test` - For e2e tests code.

## PD

As always I enjoyed doing this assignments. I hope you like it, I did it with love.
 
