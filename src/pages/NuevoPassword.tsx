import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { AlertaProps } from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState<AlertaProps>({ msg: "" });
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    // Aquí podrías verificar el token de restablecimiento de contraseña si es necesario

    const verificarToken = async () => {
      try {

        // Verificar si el token es válido
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        //si el token es valido muestra el mensaje y permite cambiar el password
        setAlerta({ msg: "Coloca tu nuevo password", error: false });

        // Indicar que el token es válido
        setTokenValido(true);
      } catch (error) {
        //si el token no es valido muestra el mensaje de error
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };

    verificarToken();
  }, []);

  //manejar el submit del nuevo password
  const { msg } = alerta;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`;

      //enviar el nuevo password
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({ msg: data.msg, error: false });

      setPasswordModificado(true);

    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no pierdas acceso a tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>

      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl ">
        {msg && <Alerta msg={msg} error={alerta.error} />}

        {/* Formulario para restablecer contraseña
        si es que es valido el token muestra el formulario */}
        {tokenValido && (
          <>
          <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
              >
                Nuevo Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded "
                type="password"
                id="password"
                placeholder="Tu Nuevo Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <input
              type="submit"
              value="Restablecer Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
          </form>
          </>
        )}

        {/* si el password fue modificado muestra el enlace para iniciar sesion */}
        {passwordModificado && (
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            Iniciar Sesión
          </Link> 
        )}

      </div>
    </>
  );
};

export default NuevoPassword;
