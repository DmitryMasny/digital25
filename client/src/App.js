import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { ToastWrapper } from '@ajoelp/toast';


import { BrowserRouter as Router } from 'react-router-dom'


import { LS } from "actions/localStorage";
import { authActions } from "actions/authActions";
import { authSelectors } from "selectors/authSelectors";

import { useRoutes } from './routes'
import { Header } from './components/Header'
import { Loader } from './components/Loader'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lime from '@material-ui/core/colors/lime';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";


const theme = createMuiTheme( {
  palette: {
    type: 'dark',
    primary: {
        main: lime[700],
      },
      // secondary: {
      //   main: orange[500],
      // },
  },
} );

const useStyles = makeStyles( ( theme ) => ({
  '@global': {
    // body: {
    //   backgroundColor: '#121212'
    // },
    // ul: {
    //   margin: 0,
    //   padding: 0,
    //   listStyle: 'none',
    // },
  },
  main: {
    display: 'flex',
    backgroundColor: grey[900],
    padding: '90px 0 50px'
  },
  container: {
    width: '100%',
    height: '100%',
  }
}) );


function App() {
  const token = useSelector( authSelectors.token )
  const [ ready, setReady ] = useState( false )

  useEffect( () => {
    const userData = LS.getUser()

    if ( userData && userData.token ) {
      console.log('userData', userData)
      authActions.login( userData, true )
    }
    setReady( true )
  }, [] )


  const isAuthenticated = !!token
  const routes = useRoutes( isAuthenticated )
  const classes = useStyles();

  if ( !ready ) {
    return <Loader/>
  }

  return (

      <Router>
        <ThemeProvider theme={ theme }>
          <CssBaseline/>
          <div className={ classes.main }>
            <Header isAuthenticated={ isAuthenticated }/>
            <div className={ classes.container }>
              { routes }
            </div>
          </div>

          <ToastWrapper/>
        </ThemeProvider>
      </Router>
  )
}

export default App
