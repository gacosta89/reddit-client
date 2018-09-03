import React from 'react'
import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'

const Container = styled(Paper)`
    display: flex;
    flex-direction: row;
    height: 130px;
    margin: 5px;
    border-radius: 0px;
`

const Thumbnail = styled(({ src, className }) => (
    <div className={className}>
        <img src={src} />
    </div>
))`
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    img {
        width: 80px;
    }
`

const Icon = styled(({ className, children }) => (
    <div className={className}>
        <i className="material-icons">{children}</i>
    </div>
))`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
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

const normalizeLen = (len, append = '...') => str =>
    str.length > len ? str.slice(0, len - 3).concat(append) : str

const normalizeDesc = normalizeLen(193)

const mapThumbnail = thumbnail =>
    thumbnail.includes('thumbs.redditmedia.com/') ? (
        <Thumbnail src={thumbnail} />
    ) : (
        <Icon>image</Icon>
    )

const ListItem = ({
    title,
    overline,
    caption,
    description,
    thumbnailUrl,
    status,
}) => (
    <Container square>
        {mapThumbnail(thumbnailUrl)}
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

export default ListItem
