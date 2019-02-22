import React, { Component } from 'react';
class TableHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headers: []
      }
    }
    render() {
      return <th>{this.props.header}</th>;
    }
  }

  export default TableHeader;