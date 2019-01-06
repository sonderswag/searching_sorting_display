import React, { Component } from 'react';
import Array from '../Components/Array';

export default class SelectionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [5, 3, 11, 2, 4],
      oldData: [2, 3, 11, 5, 4],
    };
  }

  render() {
    const { data, oldData } = this.state;
    return (
      <React.Fragment>
        <Array data={data} />
        <Array data={data} oldData={oldData} />
      </React.Fragment>
    );
  }
}
