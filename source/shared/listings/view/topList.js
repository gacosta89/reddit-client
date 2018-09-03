import React from 'react'
import { connect } from 'react-redux'

import { getTopList } from 'shared/listings/selectors'
import ListItem from 'shared/ui-kit/listItem'

const TopList = ({ list }) =>
    list.map(item => (
        <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
            caption={item.caption}
            thumbnailUrl={item.thumbnailUrl}
            status={item.status}
            overline={item.overline}
        />
    ))

const mapStateToProps = state => ({
    list: getTopList(state),
})

export default connect(mapStateToProps)(TopList)
