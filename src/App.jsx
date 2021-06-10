import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

//Contenedores css
const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 100%;
	margin-top: 2rem;
`;

const Heading = styled.h1`
	font-family: "Bebas Neue", cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;

	&::after {
		content: "";
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
	}
`;

const App = () => {
	//State app
	const [moneda, addMoneda] = useState("");
	const [cripto, addCripto] = useState("");
	const [result, addResult] = useState({});
	const [spinner, chargeSpinner] = useState(false);

	useEffect(() => {
		if (moneda === "") return;

		//Consultar api
		const consultApi = async () => {
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
			const resultado = await axios.get(url);
			chargeSpinner(true);

			setTimeout(() => {
				chargeSpinner(false);
				addResult(resultado.data.DISPLAY[cripto][moneda]);
			}, 1000);
		};
		consultApi();
	}, [moneda, cripto]);

	//Show Spinner
	const componente = spinner ? <Spinner /> : <Cotizacion result={result} />;

	return (
		<Contenedor>
			<div>
				<Imagen src={imagen} alt="Imagen Cripto" />
			</div>
			<div>
				<Heading>Cotiza moneda al instante</Heading>
				<Formulario addMoneda={addMoneda} addCripto={addCripto} />
				{componente}
			</div>
		</Contenedor>
	);
};

export default App;
