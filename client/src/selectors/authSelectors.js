import { createSelector } from 'reselect'



export const authSelectors = {

  userId: s => s.auth.userId,
  token: s => s.auth.token,
  isAuthorized: s => !!s.auth.token,
  isLoading: s => s.auth.isLoading,
  error: s => s.auth.error,

  testProp: s => s.test.testProp,

  list: s => s.global.list,
  listItemActive: createSelector(
    state => state.list,
    list => list.filter(todo => todo.isActive).length
  )
}



// import {global} from 'selectors'

// const wWidth = useSelector(global.window.width)
// const listItemActive = useSelector(global.listItemActive)



