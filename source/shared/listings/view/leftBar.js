import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Drawer from '@material-ui/core/Drawer'

import TopList from 'shared/listings/view/topList'
import { getIsMobile } from 'shared/app/selectors'

const getDrawer = props => (props.isMobile ? SwipeableDrawer : Drawer)

const getDrawerProps = props =>
    props.isMobile
        ? { open: props.opened, disableSwipeToOpen: false }
        : { variant: 'permanent' }

class LeftBar extends Component {
    static defaultProps = {
        isMobile: true,
    }

    state = {
        opened: false,
    }

    onOpen = () => this.setState({ opened: true })
    onClose = () => this.setState({ opened: false })

    render() {
        const props = { ...this.props, ...this.state }
        const Drawer = getDrawer(props)
        const drawerProps = getDrawerProps(props)

        return (
            <Drawer
                {...drawerProps}
                onOpen={this.onOpen}
                onClose={this.onClose}
            >
                <div
                    tabIndex={0}
                    style={{
                        width: 415,
                        overflowX: 'hidden',
                        marginRight: -10,
                    }}
                    className="left-bar"
                >
                    <TopList />
                </div>
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

export default connect(mapStateToProps)(LeftBar)
