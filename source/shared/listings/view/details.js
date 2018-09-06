import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getActivePost } from 'shared/listings/selectors'
import { dismissActive } from 'shared/listings/reducer'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const CardContainer = styled(Card)`
    flex: 1;
    margin: 10px;
    max-width: 1024px;
    width: 80%;
    transition: width 0.3s;
`

const CardImg = styled.img`
    height: 400px;
`

const MediaCard = ({ post, dismiss }) =>
    !post.title ? (
        ''
    ) : (
        <CardContainer>
            <CardImg src={post.imgUrl} />
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {post.title}
                </Typography>
                <Typography component="p">{post.description}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={dismiss}>
                    Dismiss
                </Button>
            </CardActions>
        </CardContainer>
    )

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

MediaCard.defaultProps = {
    imgUrl: '/static/images/cards/contemplative-reptile.jpg',
}

const mapStateToProps = state => ({
    post: getActivePost(state),
})

const mapDispatchToProps = dispatch => ({
    dismiss: () => dispatch(dismissActive()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaCard)
