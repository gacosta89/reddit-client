import React from 'react'
import { Provider } from 'react-redux'

import configureRouter from 'shared/app/router'

const App = ({ history, store }) => {
    const Router = configureRouter(history)

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default App
