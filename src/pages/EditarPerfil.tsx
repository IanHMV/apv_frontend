import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta, { AlertaProps } from "../components/Alerta";

interface PerfilState {
  _id?: string;
  nombre: string;
  email: string;
  telefono: string;
  web?: string;
}

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();

  const [perfil, setPerfil] = useState<PerfilState>({
    nombre: "",
    email: "",
    telefono: "",
    web: "",
  });

  const [alerta, setAlerta] = useState<AlertaProps>({ msg: "" });

useEffect(() => {
  if (auth?._id) {
    setPerfil({
      _id: auth._id,
      nombre: auth.nombre ?? "",
      email: auth.email ?? "",
      web: auth.web ?? "",
      telefono: auth.telefono ?? "",
    });
  }
}, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nombre, telefono, email } = perfil;

    if ([nombre, telefono, email].some((campo) => campo.trim() === "")) {
      setAlerta({
        msg: "Nombre, Email y Teléfono son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({ msg: "" });

    const resultado = await actualizarPerfil(perfil);

    if (resultado) {
      setAlerta(resultado);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-5">

          {msg && <Alerta msg={msg} error={alerta.error} />}

          <form onSubmit={handleSubmit}>
            {["nombre", "web", "telefono", "email"].map((campo) => (
              <div key={campo} className="my-3">
                <label className="uppercase font-bold text-gray-600">
                  {campo}
                </label>
                <input
                  type="text"
                  name={campo}
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  value={(perfil as any)[campo]}
                  onChange={(e) =>
                    setPerfil({
                      ...perfil,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
