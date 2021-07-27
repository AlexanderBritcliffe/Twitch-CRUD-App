import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };




  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
         initialValues={ _.pick(this.props.stream, 'title', 'description') }
         onSubmit={this.onSubmit}
        />
      </div>

      //pick is there to not include id and user id and to only get values we care about
      //both above values are unique to redux form
      //these will be used as initial values of field in stream form if they match up
    );
  }
}

const mapStateToProps = (state, ownProps) =>  {
  return { stream: state.streams[ownProps.match.params.id] };
};

//state above in mapStateToProps is the big list of streams state from store
//ownprops is props object that shows up in component in this case streamedit
//
////the final result of the mapStateToProps function above is props object should
///have stream property that contains stream user is trying to edit

export default connect
(mapStateToProps,
   { fetchStream, editStream }
 )(StreamEdit);
