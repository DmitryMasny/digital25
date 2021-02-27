import React, { useCallback } from 'react'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { EmailInput, PwdInput } from "./AuthPageFormItems";
import { authActions } from "actions/authActions";


const useStyles = makeStyles( ( theme ) => ({
  paper: {
    marginTop: theme.spacing( 8 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing( 1 ),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing( 1 ),
  },
  submit: {
    margin: theme.spacing( 3, 0, 2 ),
  },
  link: {
    cursor: 'pointer',
  },
}) );


const AuthPageRegistration = ( { changeHandler, form, errors, setErrors, isLoading, validateForm } ) => {

  const classes = useStyles()

  const registerHandler = useCallback( () => {
    validateForm( form, [ 'email', 'password', 'repeatPwd' ] ).then( () => {
      authActions.register( form ).then( r => {
        console.log( 'r', r )
      } )
    } ).catch( valErr => {
      setErrors( valErr )
    } )
  }, [ form ] )




  return (
    <div className={ classes.form }>
      <EmailInput
        value={ form.email }
        onChange={ changeHandler }
        disabled={ isLoading }
        error={ errors.email }
      />
      <PwdInput
        value={ form.password }
        onChange={ changeHandler }
        disabled={ isLoading }
        error={ errors.password }
      />
      <PwdInput
        isRepeat
        value={ form.repeatPwd }
        onChange={ changeHandler }
        disabled={ isLoading }
        error={ errors.repeatPwd }
      />

      <Button
        onClick={ registerHandler }
        disabled={ isLoading }
        fullWidth
        variant="contained"
        color="primary"
        className={ classes.submit }
      >
        Зарегистрироваться
      </Button>

    </div>
  );
}
export default AuthPageRegistration