import React from 'react'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import TopList from 'shared/listings/view/topList'

const LeftBar = () => (
    <SwipeableDrawer open={true}>
        <div tabIndex={0} style={{ width: 415, overflowX: 'hidden' }}>
            <TopList />
        </div>
    </SwipeableDrawer>
)

export default LeftBar
