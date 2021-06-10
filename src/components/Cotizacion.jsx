import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
	color: #fff;
	font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
	font-size: 18px;

	span {
		font-weight: bold;
	}
`;
const Precio = styled.p`
	font-size: 30px;
	span {
		font-weight: bold;
	}
`;

const Cotizacion = ({result}) => {
	if (Object.keys(result).length === 0) return null;

	return (
		<ResultadoDiv>
			<Precio>
				El precio es: <span>{result.PRICE}</span>
			</Precio>
			<Info>
				Precio mas alto del dia: <span>{result.HIGHDAY}</span>
			</Info>
			<Info>
				Precio mas bajo del dia: <span>{result.LOWDAY}</span>
			</Info>
			<Info>
				Variacion ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span>
			</Info>
			<Info>
				Ultima Actualizacion: <span>{result.LASTUPDATE}</span>
			</Info>
		</ResultadoDiv>
	);
};

Cotizacion.prototype = {
	result: PropTypes.object.isRequired,
};

export default Cotizacion;
