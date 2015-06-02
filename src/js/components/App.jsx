/*
App
=============
This component handles the main skeleton app structure (header, content, footer)
*/
import React, {PropTypes} from 'react';
import ContentRouter from './ContentRouter.jsx';
import Navigation from './Navigation.jsx';

export default React.createClass({
  render: function () {
    return (
      <div>
        <Navigation/>
        <ContentRouter/>
      </div>
    );
  }
});