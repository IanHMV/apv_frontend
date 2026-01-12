import React from 'react'

export interface AlertaProps {
    msg: string;
    error?: boolean;
}

const Alerta = ({ msg, error }: AlertaProps) => {
  return (
    <>
        <div className={`${error ? 'bg-red-600' : 'bg-green-500'} text-white text-center text-sm p-3 rounded-xl mb-5 uppercase font-bold`}>
            {msg}
        </div>
    </>
  );
};

export default Alerta