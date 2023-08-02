import { useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //Crar state de cita
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false);

  //Funcion que se ejecuta cuando el usuario escribe en el input
  const actualizarState = (e) => {
    actualizarCita((prevActualizar) => ({
      ...prevActualizar,
      [e.target.name]: e.target.value,
    }));
  };

  //Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      console.log("Faltan campos por ingresar");
      return;
    }

    //Eliminar el mensaje previo
    actualizarError(false);

    //Asignar un ID
    cita.id = uuid();

    //Crear cita
    crearCita(cita);

    //Reiniciar Formulario
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };
  return (
    <>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error"> Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <div className="mb-3">
          <label>Nombre de la Mascota</label>
          <input
            type="text"
            name="mascota"
            className="form-control"
            placeholder="Nombre Mascota"
            onChange={actualizarState}
            value={mascota}
          />
        </div>
        <div className="mb-3">
          <label>Nombre del dueño</label>
          <input
            type="text"
            name="propietario"
            className="form-control"
            placeholder="Nombre de el dueño"
            onChange={actualizarState}
            value={propietario}
          />
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            onChange={actualizarState}
            value={fecha}
          />
        </div>
        <div className="mb-3">
          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className="form-control"
            onChange={actualizarState}
            value={hora}
          />
        </div>
        <div className="mb-3">
          <label>Sintomas</label>
          <textarea
            name="sintomas"
            className="form-control"
            onChange={actualizarState}
            value={sintomas}
          />
        </div>
        <button type="submit" className="form-control btn btn-primary">
          Agregar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
