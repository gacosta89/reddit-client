import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 130px;
    border: solid 1px black;
`

const Thumbnail = styled(({ src, className }) => (
    <div className={className}>
        <img src={src} />
    </div>
))`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 100px;
        width: 120px;
    }
`

const Body = styled.div`
    padding: 10px;
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
`

const normalizeLen = (len, append = '...') => str =>
    str.length > len ? str.slice(0, len - 3).concat(append) : str

const normalizeDesc = normalizeLen(211)

const ListItem = ({
    title,
    overline,
    caption,
    description,
    thumbnailUrl,
    status,
}) => (
    <Container>
        <Thumbnail src={thumbnailUrl} />
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
