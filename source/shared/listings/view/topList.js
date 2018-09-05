import React from 'react'
import { connect } from 'react-redux'

import { getTopList } from 'shared/listings/selectors'
import { getIsMobile } from 'shared/app/selectors'
import { exclude, select } from 'shared/listings/reducer'
import ListItem from 'shared/ui-kit/listItem'

const TopList = ({ list, dismiss, select, isMobile }) =>
    list.map(item => (
        <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
            caption={item.caption}
            thumbnailUrl={item.thumbnailUrl}
            overline={item.overline}
            show={item.show}
            visited={item.visited}
            dismiss={() => dismiss(item.id)}
            primaryAction={() => select(item.id)}
            isMobile={isMobile}
        />
    ))

const mapStateToProps = state => ({
    list: getTopList(state),
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => ({
    dismiss: id => dispatch(exclude({ id })),
    select: id => dispatch(select({ id })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopList)
