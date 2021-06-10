import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Error from "./Error";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptoMoneda from "../hooks/useCriptoMoneda";
import axios from "axios";

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({addMoneda, addCripto}) => {
	//State Formulario
	const [listCripto, addListCripto] = useState([]);

	const MONEDAS = [
		{cod: "USD", name: "Dolar Unite States"},
		{cod: "MXN", name: "Peso Mexicano"},
		{cod: "ARS", name: "Peso Argentinos"},
		{cod: "EUR", name: "EURO"},
		{cod: "GBP", name: "Libra Esterlina"},
	];

	//Hook custom -> params label, state(String), Array Select
	const [moneda, SelectMonedas] = useMoneda("Elije una moneda", "", MONEDAS);
	const [error, addError] = useState(false);

	//Hook custom -> params label, state(String), Array Select
	const [criptoMoneda, SelectCripto] = useCriptoMoneda(
		"Elije una cripto moneda",
		"",
		listCripto,
	);

	//useEffect to api cripto moneda
	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
			const result = await axios.get(url);
			addListCripto(result.data.Data);
		};
		consultarAPI();
	}, []);

	//onSubmit form
	const cotizarMoneda = (e) => {
		e.preventDefault();

		//valid form
		if (moneda === "" || criptoMoneda === "") {
			addError(true);
			return;
		}

		//Clean Error
		addError(false);
		addMoneda(moneda);
		addCripto(criptoMoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<SelectMonedas />
			<SelectCripto />
			<Boton type="submit" value="Calcular" />
		</form>
	);
};

Formulario.prototype = {
	addCripto: PropTypes.func.isRequired,
	addMoneda: PropTypes.func.isRequired,
};

export default Formulario;
