import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //State de consulta
  const [consultar, guardarConsultar] = useState(false);
  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  //State del resultado de la busqueda
  const [resultado, guardarResultado] = useState({});
  //State de error de pais no encontrado
  const [error, guardarError] = useState(false);
  //Extraer los datos de la busqueda
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    //Funcion que consulta la API
    const consultarAPI = async () => {
      // URL OPEN WEATHER http://api.openweathermap.org/data/2.5/weather?q=ciudad,pais&appid=
      if (consultar) {
        const appIdd = "e8d5c0f284f164d6a2c25c2034e5e7d1";
        const url = ` https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appIdd}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        //Detecta si hubo resultado correctos en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
