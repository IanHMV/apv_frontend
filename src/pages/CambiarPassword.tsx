import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import { AlertaProps } from "../components/Alerta";
import useAuth from "../hooks/useAuth";

interface PasswordState {
  pwd_actual: string;
  pwd_nuevo: string;
}



const CambiarPassword = () => {

  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState<AlertaProps>({ msg: "" });
  const [password, setPassword] = useState<PasswordState>({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
  setAlerta({
    msg: "El password debe ser minimo de 6 caracteres",
    error: true,
  });
  return;
}

    setAlerta({ msg: "" });

    const respuesta = await guardarPassword(password);

  if (respuesta) {
    setAlerta(respuesta);
  }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">CambiarPassword</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Password aqui</span>
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
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Password Actual"
                id="password"
                name="pwd_actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="nombre"
                className="uppercase font-bold text-gray-600"
              >
                Nuevo Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Nuevo Password"
                id="nuevoPassword"
                name="pwd_nuevo"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
