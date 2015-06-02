/*
ContentRouter
=============
This component handles rendering main content pages to the screen via react-router
*/

// IMPORTS ///////////////////////////////
import React from 'react';
import Router from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import Arm from './Arm.jsx';
import Images from './Images.jsx';

// LOCAL VARS ////////////////////////////
var DefaultRoute = Router.DefaultRoute,
	Route        = Router.Route,
	RouteHandler = Router.RouteHandler;

// CLASS /////////////////////////////////
export default React.createClass({
  render: function() {
    return (
    	<RouteHandler/>
    );
  }
});

// REACT ROUTER //////////////////////////
document.addEventListener("DOMContentLoaded", function(event) {
	var routes = (
	  <Route name="app" path="/" handler={App}>
	    <Route name="home" handler={Home}/>
	    <Route name="arm" handler={Arm}/>
	    <Route name="images" handler={Images}/>
	    <DefaultRoute handler={Home}/>
	  </Route>
	);
	Router.run(routes, Router.HistoryLocation, function (Handler) {
		console.log('route');
	  	React.render(<Handler/>, document.body);
	});
});