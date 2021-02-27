import React, { useEffect } from 'react'
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
import { routeUrls, TYPES } from 'consts/urls'
import { useAuth } from 'hooks/auth.hook'

import AuthPageLogin from './AuthPageLogin'
import AuthPageRegistration from './AuthPageRegistration'


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



const AuthHeader = ( { type = 'login' } ) => {
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

const AuthFooter = ( { type = 'login' } ) => {
  const classes = useStyles()
  const history = useHistory()

  return <Grid container>
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
}

const AuthForm = ( { type = 'login', authProps } ) => {
  switch ( type ) {
    case TYPES.AUTH.LOGIN:
      return <AuthPageLogin { ...authProps }/>
    case TYPES.AUTH.REG:
      return <AuthPageRegistration { ...authProps }/>
    default:
      return null
  }
}


export const AuthPage = () => {
  const type = useParams().type
  const code = useParams().code

  const authProps = useAuth()
  const history = useHistory()
  const classes = useStyles()


  useEffect( () => {
    if ( type === 'confirm-email' && code ) {
      const codeArr = code.split( '&' )
      authActions.verify( { code: codeArr[0], userId: codeArr[1] } ).then( r => {
        console.log( 'verify r', r )
        history.push( routeUrls.AUTH_LOGIN )
      } )
    }
  }, [ type, code ] )


  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>

        <AuthHeader type={ type }/>

        { authProps && authProps.errors.message &&
        <Typography color="error">
          { authProps.errors.message }
        </Typography> }

        <AuthForm type={ type } authProps={authProps}/>

        <AuthFooter type={ type }/>

        {/*<p>
          Пройдите по ссылке, отправленной на почту "{ form.email }" чтобы закончить регистрацию.
        </p>*/}

      </div>
    </Container>
  );
}
