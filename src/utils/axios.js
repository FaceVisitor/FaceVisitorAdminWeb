import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getAccessToken, getRefreshToken, removeToken, setAccessToken } from '@/utils/token'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
const refreshUrl = process.env.VUE_APP_BASE_URL + '/auth/refresh_token'

const refreshAuthLogic = failedRequest => axios.post(refreshUrl, { refresh_token: getRefreshToken() }).then(tokenRefreshResponse => {
  const access_token = tokenRefreshResponse.data.access_token
  setAccessToken(access_token)
  console.log(access_token)
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + access_token
  return Promise.resolve()
}).catch(err => {
  MessageBox.confirm('다시 로그인해주세요').then(() => {
    removeToken().then(result => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    })
  })
})

import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 // request timeout
})

createAuthRefreshInterceptor(service, refreshAuthLogic)

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getAccessToken()) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */
//
//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data
//
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.status != 200) {
//       // Message({
//       //   message: res.message || 'Error',
//       //   type: 'error',
//       //   duration: 5 * 1000
//       // })
//
//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//       //   // to re-login
//       //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//       //     confirmButtonText: 'Re-Login',
//       //     cancelButtonText: 'Cancel',
//       //     type: 'warning'
//       //   }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//       //   })
//       // }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
