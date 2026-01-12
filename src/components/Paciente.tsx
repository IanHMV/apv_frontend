import usePacientes from '../hooks/usePacientes';

interface PacienteProps {
  paciente: {
    _id?: string;
    nombre?: string;
    propietario?: string;
    email?: string;
    fechaAlta?: string;
    sintomas?: string;
  };
}

const Paciente = ({ paciente }: PacienteProps) => {

  const context = usePacientes();
  if (!context) return null;

  const { setEdicion, eliminarPaciente } = context;

  const { email, fechaAlta, nombre, sintomas, propietario, _id } = paciente;

const formatearFecha = (fecha?: string) => {
  if (!fecha) return '';

  const fechaUTC = new Date(fecha);
  fechaUTC.setMinutes(
    fechaUTC.getMinutes() + fechaUTC.getTimezoneOffset()
  );

  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
  }).format(fechaUTC);
};



  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="font-bold text-xl">{nombre}</h3>

      <p><span className="font-bold">Propietario:</span> {propietario}</p>
      <p><span className="font-bold">Email:</span> {email}</p>
      <p><span className="font-bold">Fecha Alta:</span> {formatearFecha(fechaAlta)}</p>
      <p><span className="font-bold">Síntomas:</span> {sintomas}</p>

      <div className="flex justify-between mt-5">
        <button
          type="button"
          onClick={() => setEdicion(paciente)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Editar
        </button>

        {_id && (
          <button
            type="button"
            onClick={() => eliminarPaciente(_id)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Paciente;
