import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    return (
      <React.Fragment>
        <button className="ui button negative">Delete</button>
        <button className="ui button">Cancel</button>
      </React.Fragment>
    );
  }
//react fragments do not attach to
//dom used to return multiple elements without a presence in the dom
  render() {
    return (
    <div>
      StreamDelete
      <Modal
      title="Delete Stream"
      content="Are you sure you want to delete this stream?"
      actions={this.renderActions()}
      omDismiss={() => history.push('/')}
      />
    </div>
   );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(
  mapStateToProps,
   { fetchStream }
 )(StreamDelete);
