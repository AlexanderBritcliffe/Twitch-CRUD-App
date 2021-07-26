import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';



class GoogleAuth extends React.Component {


  // state = { isSignedIn: null };
  //state=is signed in is equal to null lived
  //above we needed to take that piece of state
  //and move it into a reducer to get boolean value back into this component

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //when we finish initialing library (line 24)
  //we assign auth instance to this.auth (line 25)
  //then we update auth state inside store (line 26)
  //then we sit and wait for authentication status to change in the future

//if isSignedIn is equal to
//true then call action creator
// this.props.sign in otherwise this.props.signout

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };


//the props below on line 6 used to
// be state when we were initializing it above now it lives on props


  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );

    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

//inside of our component whenever the user signs
// in or signs out we need to call the appropriate
// action creator (see below)


const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

//the value of is signed in above is null true or false

export default connect(
  mapStateToProps,
   { signIn, signOut}
 )(GoogleAuth);


//null means we do not know if user is signed in when first
//loads so do not want to print anything on screen

//line 5 -load library
//line 6 initialize it
//line 11 get refrence to auth library itself or auth object
//line 12 update component level state with new property called
//issignedin which is directly from auth object

//above initializes the library does not put user through auth process
//
//when we call load load only allows us to get a signal when
//loading process is complete by passing in callback function
//
//
//when we call itit we do not need callback function
//it returns a promise which is an object which will
//give us tap on shoulder after client library has been successfully initialized
//
//



  //when the component rendered on screen we are going
  //to load up client portion of library...this takes some
  //time for the library to reach over to google servers and
  // download some more javascript code so we need a callback
  // for when the process is complete....callback is second
  // argument of arrow function...this will only be called
  // after clientauth2library has been successfully loaded up into gapi
  //
  // the scope is talking about what different
  // parts of user account do we want access to
