import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Header} from './components/Header'
import {Loader} from './components/Loader'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";



const theme = createMuiTheme({
  palette: {
    type: 'dark',
      // primary: {
      //     main: purple[500],
      //   },
      //   secondary: {
      //     main: green[500],
      //   },
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    backgroundColor: grey[900],
    padding: '90px 0 50px'
  },
  container: {
    width: '100%',
    height: '100%',
  }
}));


function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const classes = useStyles();

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className={classes.main}>
            <Header isAuthenticated={isAuthenticated}/>
            <div className={classes.container}>
              {routes}
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
