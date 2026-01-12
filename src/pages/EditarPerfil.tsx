import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { AlertaProps } from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();

  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState<AlertaProps>({ msg: "" });

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, web, telefono, email, _id } = perfil;

    if ([nombre, telefono, email].some((campo) => !campo?.trim())) {
      setAlerta({
        msg: "Nombre, Email y Teléfono son obligatorios",
        error: true,
      });
      return;
    }

    //Esta funcion quita la alerta
    setAlerta({});

    const datos = {
      _id,
      nombre,
      email,
      telefono,
      web,
    };

    const resultado = await actualizarPerfil(datos);

    setAlerta(resultado);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Informacion aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-5">
          {msg && <Alerta msg={msg} error={alerta.error} />}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="uppercase font-bold text-gray-600"
              >
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu Nombre"
                id="nombre"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-600"
              >
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu Sitio Web"
                id="web"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="telefono"
                className="uppercase font-bold text-gray-600"
              >
                Teléfono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu Teléfono"
                id="telefono"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Tu Email"
                id="email"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

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
