import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getIsMobile } from 'shared/app/selectors'
import LeftBar from 'shared/listings/view/leftBar'
import Details from 'shared/listings/view/details'

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    margin-left: ${props => (!props.isMobile ? '475px' : '0')};
    justify-content: center;
`

const TopListingPage = ({ isMobile }) => (
    <Container isMobile={isMobile}>
        <LeftBar />
        <Details />
    </Container>
)

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

export default connect(mapStateToProps)(TopListingPage)
