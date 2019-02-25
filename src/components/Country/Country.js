import React, { Component } from 'react';
import './Country.css';

class Country extends Component {
  render() {
    return (
      <div className="Country" onClick={this.props.clicked}>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default Country