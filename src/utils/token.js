import Cookies from 'js-cookie'

const TokenKey = 'FACE-Token'
const RefreshKey = 'FACE-Refresh-Token'

export function setTokenData(access_token, refresh_token) {
  Cookies.set(TokenKey, access_token)
  Cookies.set(RefreshKey, refresh_token)
}

export function getAccessToken() {
  return Cookies.get(TokenKey)
}
export function getRefreshToken() {
  return Cookies.get(RefreshKey)
}
export function setAccessToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRefreshToken(token) {
  return Cookies.set(RefreshKey, token)
}

export function removeToken() {
  return new Promise((resolve, reject) => {
    try {
      Cookies.remove(TokenKey)
      Cookies.remove(RefreshKey)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
