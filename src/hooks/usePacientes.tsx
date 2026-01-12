import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {
  const context = useContext(PacientesContext);

  if (!context) {
    throw new Error("usePacientes debe usarse dentro de PacientesProvider");
  }

  return context;
};

export default usePacientes;
