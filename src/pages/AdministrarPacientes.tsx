import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"
import { useState } from "react"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <>
        <div className="flex flex-col md:flex-row gap-4">
          <button
          type="button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold py-2 px-4 rounded-md cursor-pointer transition-colors md:hidden">
            {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </button>

          <div className={`md:w-1/2 lg:w-1/2 ${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
            <Formulario />
          </div>

          <div className="md:w-1/2 lg:w-1/2">
            <ListadoPacientes />
          </div>
        </div>
    </>
  )
}

export default AdministrarPacientes