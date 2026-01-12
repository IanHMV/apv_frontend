
import React from 'react'
//useEffect sirve para hacer peticiones HTTP
import { useEffect, useState, useRef  } from 'react';
//UseParams sirve para capturar los parametros que vienen en la URL
import { useParams } from 'react-router-dom'

import Alerta from '../components/Alerta';
import { AlertaProps } from '../components/Alerta';

import clienteAxios from '../config/axios';


const ConfirmarCuenta = () => {
  const params = useParams();
  const {id} = params;

  // Evita doble ejecución en React StrictMode
  const effectRan = useRef(false);

  //State para saber si la cuenta fue confirmada o no
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  //State para saber si la peticion esta cargando
  const [cargando, setCargando] = useState(true);

  //State para la alerta
  const [alerta, setAlerta] = useState<AlertaProps>({msg: ''});

   useEffect(() => {

    // Evita doble ejecución en React StrictMode
    if (effectRan.current) return;
    effectRan.current = true;

    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;

        //Realiza la peticion a la API
        //clienteAxios es una instancia de axios con la URL base ya configurada
        const respuesta = await clienteAxios.get(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: respuesta.data.msg,
          error: false,
        });
      } catch (error: any) {
        setAlerta({
          msg:
            error.response?.data?.msg ||
            'Hubo un error al confirmar la cuenta',
          error: true,
        });
      } finally {
        setCargando(false);
      }
    };

    confirmarCuenta();
  }, [id]);

  return (
    <>
              <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu cuenta y comienza a administrar tus <span className='text-black'>pacientes</span></h1>
              </div>
    
              <div className='bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl '>
                {!cargando &&
                  <Alerta 
                  msg={alerta.msg}
                  error={alerta.error}
                  />
                }

                {cuentaConfirmada && (
                  <a 
                    className='block text-center my-5 text-gray-500'
                    href="/"
                  >
                    Iniciar Sesión
                  </a>
                )}
              </div>
        </>
  )
}

export default ConfirmarCuenta