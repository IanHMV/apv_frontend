
import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <>
        <nav className="gap-3 md:gap-6 mb-5 flex justify-center">
            <Link to="/admin" className="font-bold uppercase text-gray-500">Administrar Pacientes</Link>
            <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">Editar Perfil</Link>
            <Link to="/admin/cambiar-password" className="font-bold uppercase text-gray-500">Cambiar Password</Link>
        </nav>
    </>
  )
}

export default AdminNav