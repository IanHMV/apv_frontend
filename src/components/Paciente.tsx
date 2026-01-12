import React from 'react'
import usePacientes from '../hooks/usePacientes';


const Paciente = ({ paciente }) => {

    const {setEdicion, eliminarPaciente} = usePacientes();

    const { email, fechaAlta, nombre, sintomas, propietario, _id } = paciente;

const formatearFecha = (fecha: Date) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);
  }


  return (
    
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="font-bold text-xl">{nombre}</h3>
      
        <p className="text-gray-700"><span className="text-indigo-800 font-bold">Propietario:</span> {propietario}</p>
        <p className="text-gray-700"><span className="text-indigo-800 font-bold">Email:</span> {email}</p>
        <p className="text-gray-700"><span className="text-indigo-800 font-bold">Fecha Alta:</span> {formatearFecha(fechaAlta)}</p>
        <p className="text-gray-700"><span className="text-indigo-800 font-bold">Sintomas:</span> {sintomas}</p>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
            onClick={() => setEdicion(paciente)}
          >Editar
          </button>

          <button
            type="button"
            className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
            onClick={() => eliminarPaciente(_id)}
          >
            Eliminar
          </button>

        </div>

    </div>
  )
}

export default Paciente