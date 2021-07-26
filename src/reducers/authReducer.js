import { SIGN_IN, SIGN_OUT } from '../actions/types'



const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

//the initializer above is meant to default the state so initial
//inSignedIn property and to be initialized to null

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

//cases are returning state object and we want to update and modiy
//what is in it
//... is saying take all values out of the state argument and put into new object





//state object stores properties
//related to authenticaion including boolean about sign in status
