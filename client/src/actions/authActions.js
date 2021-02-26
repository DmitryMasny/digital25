import {get, post} from "../libs/request";
import { dispatch } from 'libs/store'
import { LS } from 'actions/localStorage'
import { AUTH } from 'consts/actionTypes'



/**
 * Authorization actions
 */
export const authActions = {
  /** User registration */
  register: ( formData ) => post( AUTH.REGISTER, {
    email: formData.email.replace(/\s/g, ''),
    password: formData.password.replace(/\s/g, ''),
  }),
  /** Verify reg email */
  verify: ( {userId, code} ) => get( AUTH.VERIFY, [userId, code] ),

  /** User login */
  login: ( formData, force = false ) => force ?
    dispatch( {
      type: AUTH.LOGIN,
      payload: formData
    } ) :
    post( AUTH.LOGIN, formData, true ).then( resData => LS.setUser( resData ) ),

  /** User logout */
  logout: () => {
    dispatch( {
      type: AUTH.LOGIN,
      payload: {
        userId: null,
        token: null,
      }
    } )
    LS.clearUser()
  },

  /** Clear error */
  clearError: () => {
    dispatch( {
      type: AUTH.LOGIN,
      payload: {
        error: null,
      }
    } )


  }
}



