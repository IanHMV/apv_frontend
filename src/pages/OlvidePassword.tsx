
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertaProps } from '../components/Alerta'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState<AlertaProps>({msg: ''})
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Aqui iria la logica para enviar el email de recuperacion de password

    if(email === '' || email.length < 6){
      setAlerta({msg: 'El email es obligatorio', error: true});
      return;
    }

    try {
      //clienteAxios es una instancia de axios con la URL base ya configurada
      const respuesta = await clienteAxios.post('/veterinarios/olvide-password', {email});  

      //Si la peticion es correcta muestra el mensaje de exito
      setAlerta({msg: respuesta.data.msg, error: false});
    } catch (error: any) {
      setAlerta({msg: error.response.data.msg, error: true});
    }
  } 

  

  const { msg } = alerta;

  return (
     <>
                  <div>
                    <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu Acceso y no Pierdas <span className='text-black'>tus Pacientes</span></h1>
                  </div>
        
                  <div className='bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl '>

                    {msg && <Alerta msg={msg} error={alerta.error} /> }

                    <form action="" onSubmit={handleSubmit}>
                      
                      
                      <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="email" id='email' placeholder='Tu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
        
                      <input type="submit" value="Enviar Instrucciones" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto '/>
    
                    </form>
        
                    <nav className='mt-10 lg:flex lg:justify-between'>
                      <Link className='block text-center my-5 text-gray-500' to="/">Ya tienes una cuenta? Inicia sesion</Link>
                      <Link className='block text-center my-5 text-gray-500' to="/registrar">No tienes una cuenta? Registrate</Link>
                    </nav>
        
                  </div>
            </>
  )
}

export default OlvidePassword;