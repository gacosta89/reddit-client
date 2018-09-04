import React from 'react'
import { connect } from 'react-redux'

import { getTopList } from 'shared/listings/selectors'
import { exclude } from 'shared/listings/reducer'
import ListItem from 'shared/ui-kit/listItem'

const TopList = ({ list, dismiss }) =>
    list.map(item => (
        <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
            caption={item.caption}
            thumbnailUrl={item.thumbnailUrl}
            status={item.status}
            overline={item.overline}
            show={item.show}
            dismiss={() => dismiss(item.id)}
        />
    ))

const mapStateToProps = state => ({
    list: getTopList(state),
})

const mapDispatchToProps = dispatch => ({
    dismiss: id => dispatch(exclude({ id })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopList)
