import React from 'react/addons';

export default React.createClass({
	// MIXINS /////////////////////////////
	mixins: [React.addons.PureRenderMixin],
	// DEFAULTS ///////////////////////////
	/*
		this.props vals will be set to these unless explicitly passed from parent
	*/
	getDefaultProps: function() {
		return {
			type    : 'slider',
			min     : 0,
			max     : 100,
			minVal  : 0,
			maxVal  : 100,
			round   : true,
			reverse : false
		};
	},
	// EVENTS /////////////////////////////
	_handleChange: function(value) {
		switch(this.props.type) {
			case 'slider':
				if(this.props.onChange) { this.props.onChange(value); }
				break;
			case 'select':
				for(var i=0, l=this.props.options.length; i<l; i++) {
					if(this.props.options[i].value === value) {
						if(this.props.onChange) {
							this.props.onChange(this.props.options[i]);
						}
						break;
					}
				}
				break;
		}
	},
	// PRIVATE METHODS ////////////////////
	_convertValToPer: function(value) {
		// sometimes we want to reverse values, for example the smaller the motion density value the more dense the zones are
		let offset = this.props.reverse ? this.props.maxVal : value * 2;
		// convert min/max to minVal/maxVal
		let output = (((offset - value) * (this.props.max - this.props.min)) / this.props.maxVal) + this.props.min;
		// cap output in case user was smart enough to change the input attributes in console
		output = Math.min(this.props.max, Math.max(this.props.min, output));
		// round value and send back
		return  this.props.round ? Math.round(output) : output;
	},
	_convertPerToVal: function(per) {
		// sometimes we want to reverse values, for example the smaller the motion density value the more dense the zones are
		let offset = this.props.reverse ? this.props.max : per * 2;
		// convert min/max to minVal/maxVal
		let output = (((offset - per) * (this.props.maxVal - this.props.minVal)) / this.props.max) + this.props.minVal;
		// cap output in case user was smart enough to change the input attributes in console
		output = Math.min(this.props.maxVal, Math.max(this.props.minVal, output));
		// round value and send back
		return  this.props.round ? Math.round(output) : output;
	},
	// RENDERING //////////////////////////
	_renderSlider: function() {
		let sliderProps = {
				type         : 'range',
				min          : 0,                       // all sliders are 0-100% and then get converted to minVal/maxVal
				max          : 100,						// all sliders are 0-100% and then get converted to minVal/maxVal
				defaultValue : this.props.defaultValue
			},
			onChange = function(event) {
				this._handleChange(this._convertPerToVal(event.target.value));
			};
		return <input {...sliderProps} onChange={onChange.bind(this)} defaultValue={this._convertValToPer(this.props.defaultValue)} />;
	},
	_renderSelect: function() {
		let optionComponents = [],
			onChange = function(event) {
				this._handleChange(event.target.value);
			};
		this.props.options.map(function(option, i){
			optionComponents.push(
				<option value={option.value} key={i}>
					{option.label}
				</option>
			);
		}, this);
		return (
			<select value={this.props.defaultValue} onChange={onChange.bind(this)}>
				{optionComponents}
			</select>
		);
	},
	render: function() {
		let inputComponent;
		switch(this.props.type) {
			case 'slider':
				inputComponent = this._renderSlider();
				break;
			case 'select':
				inputComponent = this._renderSelect();
				break;
		}
		return (
			<fieldset>
				<label>{this.props.label}</label>
				{inputComponent}
			</fieldset>
		);
	},
});