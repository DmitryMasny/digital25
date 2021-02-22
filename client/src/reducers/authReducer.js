import {
  AUTH
} from 'consts/actionTypes';

const initialState = {
  isLoading: false,
  userId: '',
  token: '',
  error: null
};

export default function authReducer(state = initialState, {type, payload}) {
  switch (type) {
    // case AUTH.REGISTER:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case AUTH.LOGIN:
    //   return {
    //     ...state,
    //     userId: payload.userId,
    //     token: payload.token
    //   };

    default:
      if (payload) {
        console.log('payload', payload)
        return { ...state, ...payload }
      }
      return state;
  }
}