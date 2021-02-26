import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import {LinksPage} from './pages/LinksPage'
// import {CreatePage} from './pages/CreatePage'
// import {DetailPage} from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
import { StartPage } from './pages/StartPage'

import { routeUrls } from 'consts/urls'

export const useRoutes = isAuthenticated => {

  return (
    <Switch>
      <Route path="/" exact>
        <StartPage/>
      </Route>
      { isAuthenticated ? <>

        {/*<Route path="/links" exact>*/ }
        {/*    <LinksPage/>*/ }
        {/*</Route>*/ }
        {/*<Route path="/create" exact>*/ }
        {/*    <CreatePage/>*/ }
        {/*</Route>*/ }
        {/*<Route path="/detail/:id">*/ }
        {/*  <DetailPage/>*/ }
        {/*</Route>*/ }
      </> : <>
        <Route path={routeUrls.AUTH}>
          <AuthPage/>
        </Route>
      </>
      }

      <Redirect to="/"/>
    </Switch>
  )

}
