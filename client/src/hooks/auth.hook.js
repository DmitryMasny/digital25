import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../selectors/authSelectors";
import { toast } from "@ajoelp/toast";
import { authActions } from "../actions/authActions";

const validateForm = ( form, keyList ) => new Promise( ( resolve, reject ) => {
  const errO = {}
  if ( form && keyList ) {
    for ( let i = 0; i < keyList.length; i++ ) {
      switch ( keyList[i] ) {
        case 'email':
          if ( !form.email || !~form.email.indexOf( '@' ) ) errO.email = 'Введите email'
          break
        case 'password':
          if ( !form.password ) {
            errO.password = 'Введите пароль'
          } else if ( form.password.length < 6 ) errO.password = 'Пароль слишком короткий'
          break
        case 'repeatPwd':
          if ( !form.password ) {
            errO.repeatPwd = 'Повторите пароль'
          } else if ( form.repeatPwd !== form.password ) errO.repeatPwd = 'Пароли не совпадают'
          break
        default:
          break
      }
    }
  }

  if ( Object.values( errO ).length ) {
    reject( errO )
  } else resolve()
} )


export const useAuth = () => {
  const [ form, setForm ] = useState( {
    email: '', password: '', repeatPwd: ''
  } )
  const [ errors, setErrors ] = useState( {
    email: '', password: '', repeatPwd: '', message: ''
  } )

  // const token = useSelector( authSelectors.token )
  const isLoading = useSelector( authSelectors.isLoading )
  const error = useSelector( authSelectors.error )

  useEffect( () => {
    if ( error ) {
      const errO = {}
      if ( error.message ) {
        toast.error( error.message )
        errO.message = error.message
      }

      if ( error.errors && error.errors.length ) {
        error.errors.map( e => {
          if ( e.param ) errO[e.param] = e.msg
          return null
        } )
      }
      setErrors( errO )
      authActions.clearError()
    }
  }, [ error ] )

  const changeHandler = event => {
    setErrors( { ...errors, [event.target.name]: '', message: '' } )
    setForm( { ...form, [event.target.name]: event.target.value } )
  }

  return { changeHandler, form, errors, setErrors, isLoading, validateForm }

}