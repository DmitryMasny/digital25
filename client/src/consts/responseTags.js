import { AUTH } from "./actionTypes";

export const TAG = {
  AUTH: {
    USER_NOT_FOUND: 'USER_NOT_FOUND',       // login -> no user found by email
    NOT_VERIFIED: 'NOT_VERIFIED',           // login -> email not verified
    WRONG_PWD: 'WRONG_PWD',                 // login -> wrong pwd
  }
}