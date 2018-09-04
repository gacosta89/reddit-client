import { createSelector } from 'reselect'

export const getTopList = createSelector(
    state => state.listings.top,
    top =>
        Object.values(top)
            .filter(item => !item.exclude)
            .map(item => ({
                ...item,
                title: item.author,
                description: item.title,
                caption: item.created_utc,
                overline: item.num_comments,
                thumbnailUrl: item.thumbnail,
            }))
)
