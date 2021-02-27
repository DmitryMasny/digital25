import { AUTH } from "./actionTypes";

export const TYPES = {
  AUTH: {
    LOGIN: 'login',
    REG: 'reg',
    VERIFY: 'verify',
    RESTORE: 'restore-pwd',
    CHANGE_PWD: 'change-pwd',
  }
}

export const routeUrls = {
  AUTH: '/auth/:type/:code?',
  AUTH_LOGIN: `/auth/${TYPES.AUTH.AUTH}`,
  AUTH_REG: `/auth/${TYPES.AUTH.REG}`,
  AUTH_VERIFY: `/auth/${TYPES.AUTH.VERIFY}`,
  AUTH_RESTORE: `/auth/${TYPES.AUTH.RESTORE}`,
  AUTH_CHANGE_PWD: `/auth/${TYPES.AUTH.CHANGE_PWD}`,
}

export const requestUrls = {
  [AUTH.LOGIN]:       '/api/auth/login',
  [AUTH.REGISTER]:    '/api/auth/register',
  [AUTH.VERIFY]:    '/api/auth/verify',
}