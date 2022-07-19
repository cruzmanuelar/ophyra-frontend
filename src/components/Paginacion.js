import React, { useState } from 'react';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

const Paginacion = ({pagina, setPagina, maximo}) => {

    const [input, setInput] = useState(1);

    console.log(pagina);

    const pagSiguiente = () => {
        setPagina(pagina + 1);

    }

    const pagAnterior = () => {
        setPagina(pagina - 1);

    }

    return (
        <div className='flex flex-row justify-center items-center my-3'>
            <button className='bg-slate-700 p-2 rounded-md' disabled={pagina === 1 || pagina < 1} onClick={pagAnterior}>
                <AiFillCaretLeft/>
            </button>

            <p className='mx-2'>Página {pagina} de {maximo}</p>
            <button className='bg-slate-700 p-2 rounded-md' disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={pagSiguiente}><AiFillCaretRight/></button>
        </div>
    )
}

export default Paginacion