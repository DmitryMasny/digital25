
// import {
//   ADD_TODO
// } from 'const/actionTypes';




const defaultState = {
  testProp: 1
};

export function test(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        testProp: state.testProp + 1
      }
    default:
      return state
  }
}

