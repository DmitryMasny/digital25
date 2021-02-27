import React, { useCallback } from 'react'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { authActions } from "actions/authActions";
import { EmailInput, PwdInput } from "./AuthPageFormItems";



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

const AuthPageLogin = ({ changeHandler, form, errors, setErrors, isLoading, validateForm }) => {

  const classes = useStyles()

  const loginHandler = useCallback( () => {
    validateForm( form, [ 'email', 'password' ] ).then( () => {
      authActions.login( form ).then( r => {
        console.log( 'login r', r )
        history.push( '/' )
      } )
    } ).catch( valErr => {
      setErrors( valErr )
    } )
  }, [ form, history ] )


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

            <Button
              onClick={ loginHandler }
              disabled={ isLoading }
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
            >
              Войти
            </Button>

      </div>
  );
}
export default AuthPageLogin