import { AUTH } from "./actionTypes";

export const requestUrls = {
  [AUTH.LOGIN]:       '/api/auth/login',
  [AUTH.REGISTER]:    '/api/auth/register',
}