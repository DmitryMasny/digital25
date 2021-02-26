import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { toast } from '@ajoelp/toast';
import { useHistory, useParams } from "react-router-dom";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { authSelectors } from "selectors/authSelectors";
import { authActions } from "actions/authActions";
import { routeUrls } from 'consts/urls'


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

const validateForm = ( form, keyList ) => new Promise( ( resolve, reject ) => {
  const errO = {}
  if ( form && keyList ) {
    for (let i = 0; i < keyList.length; i++) {
      switch ( keyList[i] ) {
        case 'email':
          if ( !form.email || !~form.email.indexOf('@') ) errO.email = 'Введите email'
          break
        case 'password':
          if ( !form.password ){
            errO.password = 'Введите пароль'
          } else if ( form.password.length < 6 ) errO.password = 'Пароль слишком короткий'
          break
        case 'repeatPwd':
          if ( !form.password ){
            errO.repeatPwd = 'Повторите пароль'
          } else if ( form.repeatPwd !== form.password  ) errO.repeatPwd = 'Пароли не совпадают'
          break
        default: break
      }
    }
  }

  if (Object.values(errO).length) {
    reject( errO )
  } else resolve()
})

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      { 'Copyright © ' }
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
}

const EmailInput = ( { onChange, disabled, error, value } ) => <TextField
  value={value}
  onChange={ onChange }
  disabled={ disabled }
  error={ !!error }
  helperText={ error }
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email"
  name="email"
  autoComplete="email"
  autoFocus
/>
const PwdInput = ( { onChange, disabled, error, isRepeat, value } ) => <TextField
  value={value}
  onChange={ onChange }
  disabled={ disabled }
  error={ !!error }
  helperText={ error }
  type="password"
  variant="outlined"
  margin="normal"
  required
  fullWidth
  { ...(
    isRepeat ? {
      name: "repeatPwd",
      label: "Повторите пароль",
      id: "repeatPwd"
    } : {
      name: "password",
      label: "Пароль",
      id: "password",
      autoComplete: "current-password"
    })
  }
/>

export const AuthHeader = ( { type = 'login' } ) => {
  const classes = useStyles()

  return <>
    <Avatar className={ classes.avatar }>
      <LockOutlinedIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      { type === 'reg' ? 'Регистрация' : type === 'restore-pwd' ? 'Восстановление доступа' : 'Авторизация' }
    </Typography>
  </>
}


export const AuthPage = ( ) => {
  const type = useParams().type
  const code = useParams().code
  // ['reg', 'auth', 'restore-pwd', 'confirm-email']
  console.log('code', code)


  const [ isEmailVerification, setIsEmailVerification ] = useState( false )

  const [ form, setForm ] = useState( {
    email: '', password: '', repeatPwd: ''
  } )
  const [ errors, setErrors ] = useState( {
    email: '', password: '', repeatPwd: '', message: ''
  } )

  // const token = useSelector( authSelectors.token )
  const isLoading = useSelector( authSelectors.isLoading )
  const error = useSelector( authSelectors.error )

  const history = useHistory()


  useEffect( () => {
    setIsEmailVerification( false )
  }, [ type ] )
  useEffect( () => {
    if (type === 'confirm-email' && code) {
      const codeArr = code.split('&')
      authActions.verify( {code: codeArr[0], userId: codeArr[1]} ).then( r => {
        console.log( 'verify r', r )
        history.push( routeUrls.AUTH_LOGIN )
      } )
    }
  }, [ type, code ] )

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

  const loginHandler = useCallback( () => {
    validateForm( form, ['email', 'password'] ).then( () => {
      authActions.login( form ).then( r => {
        console.log( 'login r', r )
        history.push( '/' )
      } )
    }).catch( valErr => {
      setErrors(valErr)
    } )
  }, [ form, history ] )

  const registerHandler = useCallback( () => {
    validateForm( form, ['email', 'password', 'repeatPwd'] ).then( () => {
      authActions.register( form ).then( r => {
        console.log( 'r', r )
        setIsEmailVerification( true )
      } )
    }).catch( valErr => {
      setErrors(valErr)
    } )
  }, [ form ] )


  const classes = useStyles()

  const MainBtn = !isEmailVerification ? (type === 'reg' ?
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
    : type === 'restore-pwd' ?
      <Button
        onClick={ registerHandler }
        disabled={ isLoading }
        fullWidth
        variant="contained"
        color="primary"
        className={ classes.submit }
      >
        Восст
      </Button>
      :
      <Button
        onClick={ loginHandler }
        disabled={ isLoading }
        fullWidth
        variant="contained"
        color="primary"
        className={ classes.submit }
      >
        Войти
      </Button>) : null

  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>

        <AuthHeader type={type} isEmailVerification={isEmailVerification}/>

        { errors.message && <Typography color="error" >
          { errors.message }
        </Typography> }

        { !isEmailVerification ? <div className={ classes.form }>
            <EmailInput
              value={ form.email }
              onChange={ changeHandler }
              disabled={ isLoading }
              error={ errors.email }
            />
            { type !== 'restore-pwd' && <PwdInput
              value={ form.password }
              onChange={ changeHandler }
              disabled={ isLoading }
              error={ errors.password }
            /> }
            { type === 'reg' && <PwdInput
              isRepeat
              value={ form.repeatPwd }
              onChange={ changeHandler }
              disabled={ isLoading }
              error={ errors.repeatPwd }
            /> }

            { MainBtn }

            <Grid container>
              <Grid item xs>
                <Link className={ classes.link } variant="body2" onClick={ () => history.push( routeUrls.AUTH_RESTORE ) }>
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                { type === 'reg' ?
                  <Link className={ classes.link } variant="body2" onClick={ () => history.push( routeUrls.AUTH_LOGIN ) }>
                    Уже зарегистрированы? Войти
                  </Link>
                  :
                  <Link className={ classes.link } variant="body2" onClick={ () => history.push( routeUrls.AUTH_REG ) }>
                    Регистрация
                  </Link>
                }
              </Grid>
            </Grid>
          </div>
          :
          <p>
            Пройдите по ссылке, отправленной на почту "{form.email}" чтобы закончить регистрацию.
          </p>
        }
      </div>
      <Box mt={ 8 }>
        <Copyright/>
      </Box>
    </Container>
  );
}
