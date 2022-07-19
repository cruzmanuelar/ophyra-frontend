import React, { useState} from 'react';
import Axios from 'axios';
import Agregar from './Agregar';

const Editar = ({setEditar,editar, actual, setActual}) => {


    const [imagenSeleccionada, setImagenSeleccionada] = useState('');



    const volverAtras = () => {
        setEditar(!editar);
    }

    const handleChange = e => {
        setActual({...actual,[e.target.name]:e.target.value})
    };

    const editarItem = async (imagen) => {

        const response = await fetch('http://127.0.0.1:8000/api/updateItems',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id:actual.id,
                titulo:actual.titulo,
                descripcion:actual.descripcion,
                precio:actual.precio,
                imagen:imagen
            })
        });

        const content = await response.json();

        setEditar(!editar);
    }

    const uploadCloudinary = async () =>{

        if(imagenSeleccionada){

            const formData = new FormData();
            formData.append('file',imagenSeleccionada);
            formData.append('upload_preset','ph6dsmim');
            
            const response = await fetch('https://api.cloudinary.com/v1_1/dafjfy4pw/image/upload',{
                method: 'POST',
                body:formData
            });

            const content = await response.json();

            content.url? editarItem(content.url):alert('Ha ocurrido un problema');

        }else{
            editarItem(actual.imagen);
        }

    }



  return (
    <div className="bg-slate-500 h-screen w-full flex flex-col justify-center items-center">

        <div className='w-1/3 flex flex-col p-4 rounded-sm bg-yellow-500'>
            <label>Titulo</label>
            <input onChange={handleChange} name='titulo' value={actual.titulo}/>
            <label>Descripcion</label>
            <input onChange={handleChange} name='descripcion' value={actual.descripcion}/>
            <label>Precio</label>
            <input onChange={handleChange} name='precio' value={actual.precio}/>
            <label>Imagen</label>
            <img src={actual.imagen}/>
            <input type='file'
                onChange={(e) => {
                    setImagenSeleccionada(e.target.files[0]);
                    console.log(imagenSeleccionada)
                }}
            />
            <button onClick={uploadCloudinary} className='bg-green-700 my-2 p-2'>Enviar</button>
            <button onClick={volverAtras} className='bg-red-600 my-2 p-2'>Cancelar</button>
            
        </div>
    </div>
  )
}

export default Editar