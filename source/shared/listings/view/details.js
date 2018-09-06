import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getActivePost } from 'shared/listings/selectors'
import { dismissActive } from 'shared/listings/reducer'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const CardContainer = styled(Card)`
    margin: 10px;
    max-width: 1024px;
    transition: width 0.3s;
`

const CardImg = styled(CardMedia)`
    height: 300px;
    object-fit: cover;
    @media screen and (orientation: landscape) {
        height: 180px;
    }
`

const MediaCard = ({ post, dismiss, navigate }) =>
    !post.title ? (
        ''
    ) : (
        <CardContainer className="detail-page">
            <CardActionArea onClick={navigate}>
                <CardImg component="img" image={post.imgUrl} />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {post.title}
                    </Typography>
                    <Typography component="p" className="description">
                        {post.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={dismiss}
                    className="dismiss"
                >
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
    navigate: ln => () => window.open(`https://www.reddit.com/${ln}`, '_blank'),
})

const mergeProps = (state, dispatch) => ({
    ...state,
    ...dispatch,
    navigate: dispatch.navigate(state.post.permalink),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(MediaCard)
