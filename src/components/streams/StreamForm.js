import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }


  //render error says if input is touched and there is an error return error message


  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    //when user clicks out of inputs causes error message and red to appear
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  //meta allows us to grab onto a number of properties associated with each input box
  //
//above code essentially takes the formProps input
//property which is an object with value property and
// on change handler...it takes all these key value
// pairs and add them as properties to the input element

onSubmit = (formValues) => {
  this.props.onSubmit(formValues);
}

//whenever the user tries to submit the form we care going
//to validate the inputs if inputs valid we call onSubmit
//onSubmit will call action creator of createStream that will
//run the action creator on line 19 in actions index.js and we
//will attempt to make a request over to our api server and create
//a new stream as we are making a post request to /streams

//we refrence handlesubmit and pass in whatever
// callback we want to run after the form is submitted
// so in reality handleSubmit is going to be called and
// once it processes form event ect our callback gets invoked
// with actual form values we care about


  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name ="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//line 25- onSubmit is name of prop we are
//passing to form if we pass a function on the
// onSibmitProp down into form the function will
// be called anytime form gets submitted.
//
// this.props.handlesubmit is callback function
// provided to our component by redux form we then
// call that function with our callback method that
// we defined (onSubmit) inside our component
//
// //when we go through this entire process...internally
//  handleSubmit is going to automatically receive event object and preventDefault
//
//  // onSubmit(event) {
//   event.preventdefault
// }<<< old way with out redux
//

 const validate = (formValues) => {
   const errors = {}

   if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
    if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);



//create stream above in export default is actionc creator

//validate function gets called every time form is rendered or user
// interacts so if we return object from validate function then redux
// form automatically re renders component to get error messages to appear
//  on screen redux form takes a look at every field component that gets
//  rendered and its going to look at each fields name property and then it
//  will look at errors object that we return from validate if field has
//  same name as a property that exists inside that object redux form will
//   take error message and pass it to it to render input function or each
//   field that gets created

//reduxForm is exactly like connect function allows
//us to call action creator and get form data into component
