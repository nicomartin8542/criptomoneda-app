import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Label = styled.label`
	font-family: "Bebas Neue", cursive;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 2.4rem;
	margin-top: 2rem;
	display: block;
`;

const Selectt = styled.select`
	width: 100%;
	display: block;
	padding: 1rem;
	-webkit-appearance: none;
	border-radius: 10px;
	border: none;
	font-size: 1.2rem;
`;

const useMoneda = (label, stateInitial, options) => {
	//Stete hooks custom
	const [state, updateState] = useState(stateInitial);

	const Select = () => (
		<Fragment>
			<Label htmlFor="select">{label}</Label>
			<Selectt
				name="select"
				id="select"
				onChange={(e) => updateState(e.target.value)}
				value={state}
			>
				<option>--Selected--</option>
				{options.map((op) => (
					<option value={op.cod} key={op.cod}>
						{op.name}
					</option>
				))}
			</Selectt>
		</Fragment>
	);

	//Return state, interfaz y function to update state
	return [state, Select, updateState];
};

useMoneda.prototype = {
	label: PropTypes.string.isRequired,
	stateInitial: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

export default useMoneda;
