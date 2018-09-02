import React from 'react'

const spacerStyle = {
    background: 'transparent',
}

const Spacer = ({ style }) => <div style={{ ...spacerStyle, ...style }} />

export default Spacer
