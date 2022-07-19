import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Agregar = () => {

  const [item,setItem] = useState({
    titulo:'',descripcion:'',precio:null,imagen:''
  });

  const [enviando, setEnviando] = useState(false);

  const [imagenSeleccionada, setImagenSeleccionada] = useState('');

  const navigate = useNavigate();

  const handleChange = e => {
    setItem({...item,[e.target.name]:e.target.value})
  };

  const editarItem = async (imagen) => {

    const response = await fetch('http://127.0.0.1:8000/api/createItems',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            titulo:item.titulo,
            descripcion:item.descripcion,
            precio:item.precio,
            imagen:imagen
        })
    });

    const content = await response.json();

    navigate('/');

  }

  const uploadCloudinary = async () =>{

    setEnviando(true);

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
        alert('La imagen es necesaria')
    }
  }

  return (
    <div className="bg-slate-500 h-screen w-full flex flex-col justify-center items-center">

        <div className='w-1/3 flex flex-col p-4 rounded-sm bg-yellow-500'>
            <label>Titulo</label>
            <input onChange={handleChange} name='titulo' />
            <label>Descripcion</label>
            <input onChange={handleChange} name='descripcion' />
            <label>Precio</label>
            <input onChange={handleChange} name='precio' />
            <label>Imagen</label>
            <input type='file'
                onChange={(e) => {
                    setImagenSeleccionada(e.target.files[0]);
                    console.log(imagenSeleccionada)
                }}
            />
            <button onClick={uploadCloudinary} className='bg-green-700 my-2 p-2'>{enviando? 'Enviando...':'Agregar'}</button>

            <button onClick={() => navigate('/')} className='bg-red-700 my-2 p-2'>Volver</button>

            
            
        </div>
    </div>
  )
}

export default Agregar