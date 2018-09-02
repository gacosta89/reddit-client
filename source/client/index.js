import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import i18n from 'shared/app/i18n'
import App from 'shared/app/main'

import rootReducer from 'shared/app/reducer'
import rootSaga from 'shared/app/sagas'

import 'normalize.css/normalize.css'

const iniState = window.BOOTSTRAP_CLIENT_STATE

const sagaMiddleware = createSagaMiddleware()
const routerMW = routerMiddleware(browserHistory)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line

const store = createStore(
    rootReducer,
    iniState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMW))
)

sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(browserHistory, store)

if (process.env.NODE_ENV !== 'production') {
    const { AppContainer } = require('react-hot-loader')

    ReactDOM.render(
        <AppContainer>
            <App history={history} store={store} i18n={i18n} />
        </AppContainer>,
        document.getElementById('root')
    )

    module.hot.accept('shared/app/reducer', () => {
        store.replaceReducer(require('shared/app/reducer'))
    })

    module.hot.accept('shared/app/main', () => {
        const NextApp = require('shared/app/main').default

        ReactDOM.render(
            <AppContainer>
                <NextApp history={history} store={store} i18n={i18n} />
            </AppContainer>,
            document.getElementById('root')
        )
    })
} else {
    ReactDOM.render(
        <App history={history} store={store} i18n={i18n} />,
        document.getElementById('root')
    )
}
