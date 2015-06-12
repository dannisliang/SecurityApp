/*
Navigation
=============
This component handles the main menu / header functionality
*/

import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <header>
        <a href='/'>Home</a>
        <a href='arm'>Arm</a>
        <a href='images'>Images</a>
      </header>
    );
  }
});