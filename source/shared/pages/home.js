import React from 'react'
import styled from 'styled-components'

import ListItem from 'shared/listings/view/listItem'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 500px;
    border: solid 1px black;
`

const HomePage = () => (
    <Container>
        <ListItem
            title="u/rook2pawn"
            description="We got married on a Tuesday morning. The courthouse asked two strangers to be our witnesses. Afterwards, we ran up into the mountains. It was just us and it was perfect. This is the best picture I’ve ever taken."
            caption="12 hours ago"
            thumbnailUrl="https://b.thumbs.redditmedia.com/TfhWr4E3VAxwrvKGv6P4Q3YTysSzHiM21KFOInvypBI.jpg"
            status="active"
            overline="1.9k"
        />
    </Container>
)

export { HomePage }

export default HomePage
