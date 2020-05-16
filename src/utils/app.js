import cookie from 'cookie_js'

export function getToken() {
  return cookie.get('admin_token')
}

export function setToken(token) {
  return cookie.set('admin_token',token)
}

export function setUsername(value) {
  return cookie.set('username',value)
}

export function getUsername() {
  return cookie.get('username')
}