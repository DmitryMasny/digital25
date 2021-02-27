
export const TAG = {
  AUTH: {
    USER_NOT_FOUND: 'USER_NOT_FOUND',       // login -> no user found by email
    NOT_VERIFIED: 'NOT_VERIFIED',           // login -> email not verified
    WRONG_PWD: 'WRONG_PWD',                 // login -> wrong pwd
    WRONG_REG_DATA: 'WRONG_REG_DATA',       // reg -> wrong data
    USER_EXIST: 'USER_EXIST',               // reg -> user already exist
    USER_NOT_VERIFY: 'USER_NOT_VERIFY',     // reg -> user email not verify
    REG_SUCCESS: 'REG_SUCCESS',             // reg -> success. Email sended
    VERIFY_SUCCESS: 'VERIFY_SUCCESS',       // verify reg -> success
    REPEAT_VERIFY_SUCCESS: 'REPEAT_VERIFY_SUCCESS', // repeat verify email -> success
    RESTORE_PWD_SUCCESS: 'RESTORE_PWD_SUCCESS',     // restore pwd -> success
    CHANGE_PWD_SUCCESS: 'CHANGE_PWD_SUCCESS',       // change pwd -> success
  }
}