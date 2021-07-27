import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN,
         SIGN_OUT,
         CREATE_STREAM,
         FETCH_STREAMS,
         FETCH_STREAM,
         DELETE_STREAM,
         EDIT_STREAM
      } from './types';



export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

//reducer will save the stream we created above inside our application level state
//for code below arrow function that returns a thunk function (dispatch)

export const fetchStreams = () => async dispatch => {
  const response  = await streams.get('./streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data })
};

//note on editStream formValues contain the actual
// updates we want to make to that particular stream

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};




//eventually anytime our
//auth reducer sees one of these actions it will slip boolean flag to false

//google auth components have callback functions like
//onSignInClick anytime someone invokes we call appropriate
// action creator called something
//like try sign in or try sign out action creators call gapi
// auth 2object and once user is signed in or signed out successfully
//  gapi object calls a callback function like change auth which is an
//  action creator which updates auth piece of state the redux store
//  will communicate weather your signed in or out thro mapstatetoprops
//  down to google auth component
