import { createSelector } from 'reselect'

export const getTopList = createSelector(
    state => state.listings.top,
    top => Object.values(top).filter(item => !item.exclude)
)

export const getActivePost = createSelector(
    state => state.listings.top[state.listings.activeId],
    post =>
        post
            ? {
                  title: post.author,
                  description: post.title,
                  permalink: post.permalink,
                  imgUrl:
                      (post.preview &&
                          post.preview.images[0] &&
                          post.preview.images[0].source.url) ||
                      '',
              }
            : { title: '', description: '', imgUrl: '' }
)
