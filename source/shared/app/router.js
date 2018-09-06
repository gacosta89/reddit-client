import React from 'react'

import { Router, Route, IndexRedirect } from 'react-router'

import Index from 'shared/pages/index'
import TopListingPage from 'shared/pages/topListing'

export default history => () => (
    <Router history={history}>
        <Route path={'/'} component={Index}>
            <IndexRedirect to="/top" />
            <Route path="/top" component={TopListingPage} />
        </Route>
    </Router>
)
