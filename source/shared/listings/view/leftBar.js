import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import TopList from 'shared/listings/view/topList'
import { getIsMobile } from 'shared/app/selectors'

import { dismissAll } from 'shared/listings/reducer'

const Container = styled.div`
    width: 475px;
    height: 100%;
    @media only screen and (max-width: 495px) {
        width: 100%;
    }
    overflow-x: hidden;
    margin-right: -7px;
    display: flex;
    flex-direction: column;
    .dismiss {
        background-color: #373737;
        height: 50px;
        margin: 10px 13px 5px 5px;
        color: rgba(255, 255, 255, 0.85);
        box-sizing: content-box;
    }
`

const getDrawer = props =>
    withStyles({
        paper: {
            overflow: 'hidden',
        },
        '@media only screen and (max-width: 495px)': {
            paper: {
                width: '80%',
            },
        },
    })(props.isMobile ? SwipeableDrawer : Drawer)

const getDrawerProps = props =>
    props.isMobile
        ? { open: props.opened, disableSwipeToOpen: false, swipeAreaWidth: 40 }
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
                <Container tabIndex={0} className="left-bar">
                    <div style={{ flex: 1, overflowX: 'hidden' }}>
                        <TopList />
                    </div>
                    <Button
                        className="dismiss"
                        variant="contained"
                        onClick={this.props.dismissAll}
                    >
                        Dismiss All
                        <i className="material-icons">delete</i>
                    </Button>
                </Container>
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => ({
    dismissAll: () => dispatch(dismissAll()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftBar)
