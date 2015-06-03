import React from 'react';
import Video from './Video.jsx';
import Motion from './Motion.jsx';

export default React.createClass({
	render: function() {
		return (
			<div id="arm-container">
				<Video width={640} height={480} />
			</div>
		);
	}
});
