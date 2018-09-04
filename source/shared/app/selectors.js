import { createSelector } from 'reselect'

export const getApiBaseUrl = state => state.config.apiBaseUrl
export const getAuthUrl = state => state.config.authUrl

const mobileRe = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows\sPhone)/i

export const getIsMobile = createSelector(
    state => state.config.device,
    device => mobileRe.test(device)
)
