/*
Navigation
=============
This component handles the main menu / header functionality
*/

import React from 'react';
import Router from 'react-router';
var Link = Router.Link;

export default React.createClass({
  render: function() {
    return (
      <header>
        <Link to="app">Home</Link>
        <Link to="arm">Arm</Link>
        <Link to="images">Images</Link>
      </header>
    );
  }
});