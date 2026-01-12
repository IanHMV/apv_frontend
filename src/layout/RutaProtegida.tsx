import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import {AuthContextType} from '../context/AuthProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  
  if (cargando) return <p>Cargando...</p>;

  return(
    <>
      <Header />
        {auth._id ?
         <main className="container mx-auto mt-10">
          <Outlet />
          </main> 
          : <Navigate to="/" />}
      <Footer />
    </> 
  )
};

export default RutaProtegida;