import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'

export const CollapseItem = styled(Collapse)`
    position: relative;
`

export const Container = styled(Paper)`
    display: flex;
    flex-direction: row;
    height: 130px;
    margin: 6px;
    overflow: hidden;
    position: ${props => (props.isMobile ? 'relative' : 'static')};
    z-index: ${props => (props.isMobile ? '10' : '0')};
    right: ${props => (props.toLeft ? '85px' : '0')};
    transition: right 0.3s;
`

export const Thumbnail = styled.div`
    padding: 16px;
    display: flex;
    align-items: ${props => (props.i ? 'center' : 'flex-start')};
    justify-content: center;
    img {
        width: 80px;
    }
    ${props => (props.i ? 'width: 80px;' : '')};
    position: relative;
`

export const Body = styled.div`
    flex: 1;
    padding: 16px;
    background-color: ${props => (props.visited ? '#c63f17b5' : '#c63f17')};
    transition: background-color 0.3s, color 0.3s;
    color: rgba(255, 255, 255, ${props => (props.visited ? '0.6' : '0.95')});
    font-weight: 500;
`

export const Title = styled.div`
    padding-bottom: 5px;
    font-size: 24px;
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-wrap: wrap;
    .caption {
        font-size: 12px;
        padding-left: 10px;
    }
    .overline {
        font-size: 10px;
        padding-left: 10px;
    }
`
export const Description = styled.div`
    font-size: 14px;
    text-align: justify;
`

const SecondaryAction = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: justify;
    background-color: #373737;
    color: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 16px;
    cursor: pointer;
`

export const SecondaryActionBottom = styled(SecondaryAction)`
    position: absolute;
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.3s;
    bottom: ${props => (props.show ? '0px' : '-26px')};
    z-index: 20;
`

export const SecondaryActionRight = styled(SecondaryAction)`
    position: absolute;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 1px;
    top: 1px;
    margin: 5px;
`
