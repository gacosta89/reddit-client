import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { compose } from 'ramda'
import PropTypes from 'prop-types'
import zingTouch from 'zingtouch'

import {
    Container,
    Thumbnail,
    Body,
    Title,
    Description,
    SecondaryActionBottom,
    SecondaryActionRight,
    CollapseItem,
} from './html'

const normalizeLen = (len, append = '...') => str =>
    str.length > len ? str.slice(0, len - 3).concat(append) : str

const decode = str => str.replace(/&amp;/g, '&')

const normalizeDesc = compose(
    decode,
    normalizeLen(176)
)

class ListItem extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        overline: PropTypes.node,
        caption: PropTypes.node,
        description: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
        visited: PropTypes.bool,
        show: PropTypes.bool,
        isMobile: PropTypes.bool,
        dismiss: PropTypes.func.isRequired,
        primaryAction: PropTypes.func.isRequired,
    }

    static defaultProps = {
        dismiss: () => {},
        primaryAction: () => {},
        visited: false,
        show: true,
        isMobile: false,
        caption: '',
        overline: '',
    }

    swipableRef = React.createRef()
    containerRef = React.createRef()

    state = {
        hovered: false,
        show: true,
        toLeft: false,
    }

    onMouseEnter = () => this.setState({ hovered: true })
    onMouseLeave = () => this.setState({ hovered: false })
    onDismiss = () => this.setState({ show: false })

    pan = side => {
        if (this.state.toLeft && side === 'right') {
            this.setState({ toLeft: false })
        }

        if (!this.state.toLeft && side === 'left') {
            this.setState({ toLeft: true })
        }
    }

    componentDidMount() {
        if (this.props.isMobile) {
            this.region = zingTouch.Region(
                ReactDOM.findDOMNode(this.containerRef),
                false,
                false
            )

            this.region.bind(
                ReactDOM.findDOMNode(this.swipableRef),
                'pan',
                e => {
                    const { currentDirection } = e.detail.data[0]
                    let direction = ''

                    if (
                        (currentDirection < 315 && currentDirection > 360) ||
                        (currentDirection > 0 && currentDirection < 45)
                    ) {
                        direction = 'right'
                    }
                    if (currentDirection > 135 && currentDirection < 225) {
                        direction = 'left'
                    }

                    if (direction !== '') {
                        this.pan(direction)
                        e.detail.events.forEach(event => {
                            event.originalEvent.preventDefault()
                            event.originalEvent.stopPropagation()
                        })
                    }
                }
            )
        }
    }

    componentWillUnmount() {
        if (this.props.isMobile) {
            const node = ReactDOM.findDOMNode(this.swipableRef)

            if (node) {
                this.region.unbind(node, 'pan')
            }
        }
    }

    render() {
        const {
            title,
            overline,
            caption,
            description,
            thumbnailUrl,
            visited,
            isMobile,
            show: showProp,
            dismiss,
            primaryAction,
        } = this.props

        const { hovered, show, toLeft } = this.state

        const validThumbnail = thumbnailUrl.includes('thumbs.redditmedia.com/')

        return (
            <CollapseItem
                in={show && showProp}
                unmountOnExit
                timeout={400}
                onExited={dismiss}
            >
                <Container
                    square
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    ref={r => (this.containerRef = r)}
                    toLeft={toLeft}
                    isMobile={isMobile}
                >
                    <Thumbnail i={!validThumbnail}>
                        {validThumbnail ? (
                            <img src={thumbnailUrl} />
                        ) : (
                            <i className="material-icons">image</i>
                        )}
                        {!isMobile && (
                            <SecondaryActionBottom
                                show={hovered}
                                onClick={this.onDismiss}
                            >
                                Dismiss
                            </SecondaryActionBottom>
                        )}
                    </Thumbnail>
                    <Body
                        onClick={primaryAction}
                        visited={visited}
                        ref={r => (this.swipableRef = r)}
                    >
                        <Title visited={visited}>
                            <span>{title.toLowerCase()}</span>
                            <div className="caption">
                                {caption}
                                &nbsp; &nbsp;
                                {overline}
                            </div>
                        </Title>
                        <Description visited={visited}>
                            {normalizeDesc(description)}
                        </Description>
                    </Body>
                </Container>
                {isMobile && (
                    <SecondaryActionRight onClick={this.onDismiss}>
                        Dismiss
                    </SecondaryActionRight>
                )}
            </CollapseItem>
        )
    }
}

export default ListItem
