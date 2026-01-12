import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import { PacientesProvider } from "./context/PacientesProvider";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
                <Route path="/olvide-password" element={<OlvidePassword />} />
                <Route
                  path="/olvide-password/:token"
                  element={<NuevoPassword />}
                />
              </Route>

              <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdministrarPacientes />} />
                <Route path="perfil" element={<EditarPerfil />} />
                <Route path="cambiar-password" element={<CambiarPassword />} />
              </Route>
            </Routes>
          </PacientesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
