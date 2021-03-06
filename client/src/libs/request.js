import { dispatch } from "./store";
import axios from "axios";
import { requestUrls } from "consts/urls"
import { store } from 'libs/store'
import { authSelectors } from 'selectors/authSelectors'


let token = ''

console.log( 'token', token )

export const getUrlByType = ( type ) => {
  const url = requestUrls[type]

  if ( !url ) {
    console.log( 'url not exist' )
    return '/api/'
  }
  return url
}
export const putDataToUrl = ( url, data ) => {
  if ( !data ) return  url

  if ( !Array.isArray(data) ) data = [data]
  data.map( d => url += `/${d}`)
  return url
}

const emulatePing = false;


export const post = ( type, data, putResponseInRedux ) => new Promise( ( resolve, reject ) => {
  console.log( 'post type', post.type, ' data:', data )
  if ( !token ) token = authSelectors.token( store.getState() )

  dispatch( {
    type: type,
    payload: { isLoading: true }
  } )
  console.log( 'getUrlByType( type )', getUrlByType( type ) )
  axios
    .post(
      getUrlByType( type ),
      data,
      {
        headers: { 'Authorization': `Bearer ${ token }` }
      }
    )
    .then( res => {
      const responseAction = () => {
        const resData = {
          ...res.data, isLoading: false
        }
        if ( putResponseInRedux )dispatch( {
          type: type,
          payload: resData
        } )
        resolve( resData )
      }
      if ( emulatePing ) {
        setTimeout( responseAction, 1000 )
      } else responseAction()

    } )
    .catch( err => {
      const error = err.response.data
      console.log( 'request "', type, '" error:', error )
      dispatch( {
        type: type,
        payload: { error: error, isLoading: false }
      } )
      reject( error )
    } )
} )

export const get = ( type, data, putResponseInRedux ) => new Promise( ( resolve, reject ) => {
  dispatch( {
    type: type,
    payload: { isLoading: true }
  } )
  console.log('==>', {url: getUrlByType( type ), type})
  axios
    .get(
      putDataToUrl(getUrlByType( type ), data)
    )
    .then( res => {
      const resData = {
        ...res.data, isLoading: false
      }
      if ( putResponseInRedux )dispatch( {
        type: type,
        payload: resData
      } )
      resolve( resData )

    } )
    .catch( err => {
      const error = err.response.data
      console.log( 'request "', type, '" error:', error )
      dispatch( {
        type: type,
        payload: { error: error, isLoading: false }
      } )
      reject( error )
    } );
} )