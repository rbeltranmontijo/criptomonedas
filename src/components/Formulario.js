import React, { useEffect, useState } from "react";

import Criptomoneda from "./Criptomoneda";
import Error from "./Error";

import axios from "axios";

function Formulario({ guardarMoneda, guardarCriptomoneda }) {
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [monedaCotizar, guardarMonedaCotizar] = useState("");
  const [criptoCotizar, guardarCriptoCotizar] = useState("");
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      // console.log(resultado.data.Data);

      // guardar respuesta en el state
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // Validar que el usuario llene ambos campos
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar si ambos campos estan llenos
    if (monedaCotizar === "" || criptoCotizar === "") {
      guardarError(true);
      return;
    }

    // Pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(monedaCotizar);
    guardarCriptomoneda(criptoCotizar);
  };

  // Mostrar el error en caso que exista
  const componente = error ? (
    <Error mensaje="Ambos campos son obigatorios" />
  ) : null;

  return (
    <form onSubmit={cotizarMoneda}>
      {componente}
      <div className="row">
        <label>Elige tu moneda FIAT</label>
        <select
          className="u-full-width"
          onChange={e => guardarMonedaCotizar(e.target.value)}
        >
          <option value="">- Elige tu moneda -</option>
          <option value="MXN">Peso Mexicano</option>
          <option value="USD">Dolar Americano</option>
          <option value="EUR">Euros</option>
        </select>
      </div>

      <div className="row">
        <label>Elige tu criptomoneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarCriptoCotizar(e.target.value)}
        >
          <option value="">- Elige tu criptomoneda -</option>
          {criptomonedas.map(criptomoneda => (
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda={criptomoneda}
            />
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calcular"
      />
    </form>
  );
}

export default Formulario;
