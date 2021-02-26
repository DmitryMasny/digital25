import { AUTH } from "./actionTypes";

export const routeUrls = {
  AUTH: '/auth/:type/:code?',
  AUTH_LOGIN: '/auth/login',
  AUTH_REG: '/auth/reg',
  AUTH_VERIFY: '/auth/verify',
  AUTH_RESTORE: '/auth/restore-pwd',
}
export const requestUrls = {
  [AUTH.LOGIN]:       '/api/auth/login',
  [AUTH.REGISTER]:    '/api/auth/register',
  [AUTH.VERIFY]:    '/api/auth/verify',
}