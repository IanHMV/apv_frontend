import { createContext, useState, useEffect, ReactNode } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

import React from "react";

interface Paciente {
  _id?: string;
  nombre?: string;
  propietario?: string;
  email?: string;
  fechaAlta?: string;
  sintomas?: string;
}

interface PacientesContextType {
  pacientes: Paciente[];
  paciente: Paciente;
  guardarPaciente: (paciente: Paciente) => Promise<void>;
  setEdicion: (paciente: Paciente) => void;
  eliminarPaciente: (id: string) => Promise<void>;
}

const PacientesContext = createContext<PacientesContextType | null>(null);


export const PacientesProvider = ({ children }: { children: ReactNode }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [paciente, setPaciente] = useState<Paciente>({});
  const {auth} = useAuth();

  useEffect(() => {
    ///Funcion para obtener los pacientes desde la API
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("/pacientes", config);
        setPacientes(data);
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    };

    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente: Paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    //Si el paciente tiene un id, es una edicion
    if (paciente._id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente._id}`,
          paciente,
          config
        );

        //busca y actualiza el paciente en el state
        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );

        setPacientes(pacientesActualizados);
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
      //Si no tiene id, es un nuevo registro
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente: any) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id: string) => {
    const confirmar = confirm("¿Deseas eliminar este paciente?");
    
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (confirmar) {
      try {
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizados = pacientes.filter(
          (pacienteState) => pacienteState._id !== id
        );

        setPacientes(pacientesActualizados);

      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    } 
  };


  return (
    <PacientesContext.Provider
      value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
