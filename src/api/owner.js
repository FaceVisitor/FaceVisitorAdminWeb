import axios from '@/utils/axios'

export function login(data) {
  return axios({
    url: '/owner/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return axios({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return axios({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
