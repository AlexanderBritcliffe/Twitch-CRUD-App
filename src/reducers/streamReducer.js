import _ from 'lodash';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    case FETCH_STREAM:
     return {...state, [action.payload.id]: action.payload }
    case CREATE_STREAM:
     return {...state, [action.payload.id]: action.payload }
    case EDIT_STREAM:
     return {...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
     return _.omit(state, action.payload)
    default:
      return state;
  }
}

//note on fetch streams...were creating a new object than
// (...state)>>taking current records inside of state object
//  and adding them in....then calling map keys and taking list
//   of streams that we just got back from api and create object
//   out of it using map keys...keys inside object will be
//    ids ondividual strings themselves

//note on delete stream...we do not need to add.id to payload
//because payload is the id itself as can be seen in the delete
// statement in actions-index.js
//
// omit does not change original state object it creates new object
// with all the properties from state without whatever we passed in as
// the action on payload

//code above note return is taking entire
//state object and creating a new object and
//taking everything out of existing one and add it in
//
////the string that we actually want
///to put in is going to be on action payload property
///
///we want to designate an id from action payload
/// as our key and the value would be actual stream itself
///
/// //code above on lines 13-17 even more concisely explained
/// anytime we get an action of fetch stream we are going to take original state
/// object (state = {}) then take all properties or key
///  value pairs out of it and add it to new object (...state)
///   then add a key value pair on the fly (rest of line)
