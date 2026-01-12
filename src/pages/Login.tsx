import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import { AlertaProps } from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState<AlertaProps>({ msg: "" });
  const { setAuth } = useAuth();

  // useNavigate es un hook que permite redirigir al usuario a otra pagina
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    try {
      //llamar a la API para autenticar al usuario
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);

      setAlerta({ msg: "Login exitoso", error: false });

      // se usa navigate para redirigir al usuario a la pagina de administracion
      navigate("/admin");
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion Y Administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>

      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl ">
        {msg && <Alerta msg={msg} error={alerta.error} />}

        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
              type="email"
              id="email"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded "
              type="password"
              id="password"
              placeholder="Tu Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
