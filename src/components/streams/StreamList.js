import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
          {stream.title}
          <div className="description">{stream.description}</div>
        </div>
      </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams) };
};

//object vales is a built in javascript function it
//takes an object as an argument all the different values
// inside of that object will be pulled out and inserted
//  into an array.....inside of our component we have a
//  prop called this.props.streams which is an array of all are different streams

//mapStateToProps allows us to get our list
//of streams avaliable as props inside of our component

export default connect(mapStateToProps, { fetchStreams })(StreamList);
