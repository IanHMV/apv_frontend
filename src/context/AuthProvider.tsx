import { useState, createContext, ReactNode, useEffect } from "react";
import clienteAxios from "../config/axios";

interface AuthUser {
  _id?: string;
  nombre?: string;
  email?: string;
}

export interface AuthContextType {
  auth: AuthUser;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser>>;
  cargando: boolean;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState<AuthUser>({});

  //usamos el useEffect para autenticar al usuario al cargar el componente
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await clienteAxios.get("/veterinarios/perfil", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(data.perfil);
      } catch (error: any) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };

    autenticarUsuario();
  }, []);

  // Función para cerrar sesión borrando el token y el estado de auth
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);

      return {
        msg: "Almacenado Correctamente",
      };
    } catch (error: any) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = '/veterinarios/actualizar-password';

      const {data} = await clienteAxios.put(url, datos, config)
      
      console.log(data);

      return{
        msg:data.msg
      }
      
    } catch (error:any) {
      return{
        msg:error.response.data.msg,
        error:true
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
