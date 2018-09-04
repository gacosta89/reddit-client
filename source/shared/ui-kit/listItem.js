import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'ramda'

import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'

const Container = styled(Paper)`
    display: flex;
    flex-direction: row;
    height: 130px;
    margin: 5px;
    border-radius: 0px;
    overflow: hidden;
`

const Thumbnail = styled.div`
    padding: 16px;
    display: flex;
    align-items: ${props => (props.i ? 'center' : 'flex-start')};
    justify-content: center;
    img {
        width: 80px;
    }
    ${props => (props.i ? 'width: 80px;' : '')};
    position: relative;
`

const Body = styled.div`
    flex: 1;
    padding: 16px;
    background-color: ${props => (props.visited ? '#c63f17b5' : '#c63f17')};
    transition: background-color 0.4s, color 0.4s;
    color: rgba(255, 255, 255, ${props => (props.visited ? '0.6' : '0.85')});
    font-weight: 500;
`
const Title = styled.div`
    padding-bottom: 5px;
    font-size: 24px;
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-wrap: wrap;
    .caption {
        font-size: 12px;
        padding-left: 10px;
    }
    .overline {
        font-size: 10px;
        padding-left: 10px;
    }
`
const Description = styled.div`
    font-size: 14px;
    text-align: justify;
`

const SecondaryAction = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: justify;
    position: absolute;
    background-color: #373737;
    color: rgba(255, 255, 255, 0.85);
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 16px;
    transition: bottom 0.5s;
    bottom: ${props => (props.hovered ? '0px' : '-26px')};
    cursor: pointer;
`

const normalizeLen = (len, append = '...') => str =>
    str.length > len ? str.slice(0, len - 3).concat(append) : str

const decode = str => str.replace(/&amp;/g, '&')

const normalizeDesc = compose(
    decode,
    normalizeLen(176)
)

class ListItem extends Component {
    static defaultProps = {
        dismiss: () => {},
        primaryAction: () => {},
    }

    state = {
        hovered: false,
        show: true,
    }

    onMouseEnter = () => this.setState({ hovered: true })
    onMouseLeave = () => this.setState({ hovered: false })

    onDismiss = () => this.setState({ show: false })

    render() {
        const {
            title,
            overline,
            caption,
            description,
            thumbnailUrl,
            visited,
            show: showProp,
        } = this.props

        const { hovered, show } = this.state

        const validThumbnail = thumbnailUrl.includes('thumbs.redditmedia.com/')

        return (
            <Collapse
                in={show && showProp}
                unmountOnExit
                timeout={400}
                onExited={this.props.dismiss}
            >
                <Container
                    square
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <Thumbnail i={!validThumbnail}>
                        {validThumbnail ? (
                            <img src={thumbnailUrl} />
                        ) : (
                            <i className="material-icons">image</i>
                        )}
                        <SecondaryAction
                            hovered={hovered}
                            onClick={this.onDismiss}
                        >
                            Dismiss
                        </SecondaryAction>
                    </Thumbnail>
                    <Body onClick={this.props.primaryAction} visited={visited}>
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
            </Collapse>
        )
    }
}

export default ListItem
