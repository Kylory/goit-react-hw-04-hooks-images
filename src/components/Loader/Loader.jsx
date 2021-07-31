import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class Spinner extends React.Component {
  render() {
    return (
      <Loader
        className={this.props.class}
        type="Circles"
        color="#3f51b5"
        height={200}
        width={200}
      />
    );
  }
}
