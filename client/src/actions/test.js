import { store } from '../libs/store'
import axios from 'axios';

export const addTodo = ({ title, userId }) => {
  return dispatch => {
    dispatch(addTodoStarted());

    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        title,
        userId,
        completed: false
      })
      .then(res => {
        dispatch(addTodoSuccess(res.data));

        // setTimeout(() => {
        //   dispatch(addTodoSuccess(res.data));
        // }, 2500);

        // throw new Error('NOT!');
      })
      .catch(err => {
        dispatch(addTodoFailure(err.message));
      });
  };
};
export const addTodo = ({ title, userId }) => {
  return (dispatch, getState) => {
    const { todos } = getState();

    if (todos.length >= 4) return;

    dispatch(addTodoStarted());

    // ...
  };
};
const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  payload: {
    ...todo
  }
});

const addTodoStarted = () => ({
  type: ADD_TODO_STARTED
});

const addTodoFailure = error => ({
  type: ADD_TODO_FAILURE,
  payload: {
    error
  }
});

const dispatch = store.dispatch

export const qwe = () => dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
