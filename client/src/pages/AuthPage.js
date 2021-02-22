import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { toast } from '@ajoelp/toast';


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
}) );


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

export const AuthPage = () => {

  const [ form, setForm ] = useState( {
    email: '', password: ''
  } )
  const [ errors, setErrors ] = useState( {} )

  const token = useSelector( authSelectors.token )
  const isLoading = useSelector( authSelectors.isLoading )
  const error = useSelector( authSelectors.error )

console.log('token', token)
  useEffect( () => {
    if ( error ) {
      if (error.message) toast.error( error.message )
      if (error.errors && error.errors.length ) {
        const errO = {}
        error.errors.map( e => {
          if (e.param) errO[e.param] = e.msg
          return null
        })
        setErrors(errO)
      }
      authActions.clearError()
    }
  }, [ error ] )

  const changeHandler = event => {
    setErrors({...errors, [event.target.name]: ''})
    setForm( { ...form, [event.target.name]: event.target.value } )
  }


  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" >
          { token ? 'Уже зареганы' : 'Авторизация' }
        </Typography>
        <form className={ classes.form } noValidate>
          <TextField
            onChange={ changeHandler }
            disabled={ isLoading }
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={ changeHandler }
            disabled={ isLoading }
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={ () => authActions.login( form ) }
            disabled={ isLoading }
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
          >
            Войти
          </Button>
          <Button
            onClick={ () => authActions.register( form ) }
            disabled={ isLoading }
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
          >
            Зарегистрироваться
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                { "Don't have an account? Sign Up" }
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={ 8 }>
        <Copyright/>
      </Box>
    </Container>
  );
}
