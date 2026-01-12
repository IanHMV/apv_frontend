

import { Link } from 'react-router-dom'

import { useState } from 'react'
import Alerta from '../components/Alerta'
import { AlertaProps } from '../components/Alerta'
import clienteAxios from '../config/axios';




const Registrar = () => {
  
  
  //el state sirve para guardar lo que el usuario escribe en los inputs
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState<AlertaProps>({msg: ''})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true})
      return
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los password no son iguales', error: true})
      return
    }

    if(password.length < 6){
      setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true})
      return
    }


    //Crear el usuario en la API
    try {
      //clienteAxios es una instancia de axios con la URL base ya configurada
      await clienteAxios.post(`/veterinarios`, {nombre, email, password})

      setAlerta({msg: "Creado correctamente, revisa tu email", error: false})

    } catch (error: any) {
      setAlerta({msg: error.response.data.msg, error: true})
    }

  }

  const { msg } = alerta;

  return (
    <>
              <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Crea tu cuenta y Administra tus <span className='text-black'>pacientes</span></h1>
              </div>
    
              <div className='bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl '>

              {/* //si msg tiene algo, muestra el componente Alerta */}
              {msg && <Alerta msg={msg} error={alerta.error} /> }
              
                <form action="" 
                onSubmit={handleSubmit}>

                  <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
                    <input
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    type="text"
                    id='nombre'
                    placeholder='Nombre'
                    value={nombre}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                  />
                  </div>
                  
                  <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' 
                    type="email" 
                    id='email' 
                    placeholder='Tu Email' 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded ' 
                    type="password" id='password' placeholder='Tu Password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                  </div>

                  <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="repetir-password">Repetir Password</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded ' type="password" id='repetir-password' placeholder='Repite tu Password' value={repetirPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepetirPassword(e.target.value)} />
                  </div>
    
                  <input type="submit" value="Registrarse" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto '/>

                </form>
    
                <nav className='mt-10 lg:flex lg:justify-between'>
                  <Link className='block text-center my-5 text-gray-500' to="/">Ya tienes una cuenta? Inicia sesion</Link>
                  <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide Password</Link>
                </nav>
    
              </div>
        </>
  )
}

export default Registrar