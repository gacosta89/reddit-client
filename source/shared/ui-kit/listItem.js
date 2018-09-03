import React, { Component } from 'react'
import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'

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
    background-color: #c63f17;
    color: rgba(255, 255, 255, 0.85);
`
const Title = styled.div`
    padding-bottom: 5px;
    font-size: 24px;
    font-weight: 400;
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
    font-weight: 400;
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
`

const normalizeLen = (len, append = '...') => str =>
    str.length > len ? str.slice(0, len - 3).concat(append) : str

const normalizeDesc = normalizeLen(193)

class ListItem extends Component {
    state = {
        hovered: false,
    }

    onMouseEnter = () => this.setState({ hovered: true })
    onMouseLeave = () => this.setState({ hovered: false })

    render() {
        const {
            title,
            overline,
            caption,
            description,
            thumbnailUrl,
            status,
        } = this.props

        const { hovered } = this.state

        const validThumbnail = thumbnailUrl.includes('thumbs.redditmedia.com/')

        return (
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
                    <SecondaryAction hovered={hovered}>Dismiss</SecondaryAction>
                </Thumbnail>
                <Body>
                    <Title status={status}>
                        <span>{title}</span>
                        <span className="caption">{caption}</span>
                        <span className="overline">{overline}</span>
                    </Title>
                    <Description status={status}>
                        {normalizeDesc(description)}
                    </Description>
                </Body>
            </Container>
        )
    }
}

export default ListItem
