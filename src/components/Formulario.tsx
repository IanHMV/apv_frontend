import React from 'react'
import { useState } from 'react'
import Alerta, { AlertaProps } from './Alerta'
import usePacientes from '../hooks/usePacientes'
import { useEffect } from 'react';
import { setId } from '@material-tailwind/react/components/Tabs/TabsContext';

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState<string | null>(null);

    const [alerta, setAlerta] = useState<AlertaProps>({msg: ''});

    const { guardarPaciente, paciente } = usePacientes();
    
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if([nombre, propietario, email, fechaAlta, sintomas].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return
        }

        setAlerta({});

        guardarPaciente({nombre, propietario, email, fechaAlta, sintomas, id});

        setAlerta({msg: id ? 'Guardado Correctamente' : 'Agregado Correctamente', error: false});

        setNombre('');
        setPropietario('');
        setEmail('');
        setFechaAlta('');
        setSintomas('');
        setId(null);

    }

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFechaAlta(paciente.fechaAlta);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }
    , [paciente])


    const { msg } = alerta;

  return (
    <>

        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        {msg && <Alerta msg={msg} error={alerta.error} />}
        <form action=""
        className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
        onSubmit={handlerSubmit}>
            <div className='mb-5'>
                <label 
                htmlFor="nombre" 
                className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
                <input
                id="nombre" 
                type="text" 
                placeholder='Nombre de la Mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}/>
            </div>

            <div className='mb-5'>
                <label 
                htmlFor="propietario" 
                className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
                <input
                id="propietario" 
                type="text" 
                placeholder='Nombre del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={propietario} 
                onChange={(e) => setPropietario(e.target.value)}/>
            </div>

            <div className='mb-5'>
                <label 
                htmlFor="email" 
                className='block text-gray-700 uppercase font-bold'>Email</label>
                <input
                id="email" 
                type="email" 
                placeholder='Email del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='mb-5'>
                <label 
                htmlFor="fecha" 
                className='block text-gray-700 uppercase font-bold'>Fecha Alta</label>
                <input
                id="fecha" 
                type="date" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaAlta} 
                onChange={(e) => setFechaAlta(e.target.value)}/>
            </div>

            <div className='mb-5'>
                <label 
                htmlFor="sintomas" 
                className='block text-gray-700 uppercase font-bold'>Sintomas</label>
                <textarea
                id="sintomas"
                placeholder='Sintomas del paciente' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={sintomas} 
                onChange={(e) => setSintomas(e.target.value)}/>
            </div>

            <input type="submit" className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer transition-colors' 
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
            />

        </form>
    </>

  )
}

export default Formulario