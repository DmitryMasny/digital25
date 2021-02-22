import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { makeStyles } from '@material-ui/core/styles'

import { authSelectors } from 'selectors/authSelectors'
import { useSelector } from "react-redux"
import { authActions } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      color: 'inherit'
    },
    button: {
      color: 'inherit'
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none'
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}))



export const Header = () => {
  const history = useHistory()

  const isAuthorized = useSelector(authSelectors.isAuthorized)
  const classes = useStyles()

  const logoutHandler = event => {
    authActions.logout()
    history.push('/')
  }

  return (
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar} >
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} >
            <NavLink to="/links" >
              Digital 25
            </NavLink>
          </Typography>
          <nav>
            <NavLink to="/create">
              <Link variant="button" color="textPrimary" className={classes.link}>
                Создать
              </Link>
            </NavLink>
            <NavLink  to="/links" className={classes.link}>
                Ссылки
            </NavLink>
          </nav>
          { isAuthorized ?
            <Button color="primary" variant="outlined" className={classes.link} onClick={logoutHandler}>
              Выйти
            </Button>
            :
            <NavLink to="/auth"  className={classes.link}>
              <Button color="primary" variant="outlined">
                Войти
              </Button>
            </NavLink>
          }
        </Toolbar>
      </AppBar>
  )
}
