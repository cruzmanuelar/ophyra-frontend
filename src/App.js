import './App.css';
import { useEffect, useState } from 'react';
import Paginacion from './components/Paginacion';
import Editar from './components/Editar';
import { useNavigate } from 'react-router-dom';

function App() {

  const [items, setItems] = useState([]);
  const [porPagina, setPorPagina] = useState(5);
  const [pagina, setPagina] = useState(1);
  const [maximo, setMaximo] = useState(0);
  const [editar, setEditar] = useState(false);
  const [actual,setActual] = useState({
    id:null,titulo:'',descripcion:'',precio:null,imagen:''
  });
  const [actualiza, setActualiza] = useState(!false);

  const navigate = useNavigate();


  const getItems = async () => {
      
    const data = await fetch('http://127.0.0.1:8000/api/getItems')
    const items = await data.json()
    setMaximo(Math.ceil(items.data.length/5));
    setItems(items.data);

  }

  useEffect(()=>{

      getItems();
      
  },[])

  useEffect(()=>{

    getItems();

  },[editar,actualiza]);

  const editarItem = ({id,titulo,descripcion,precio,imagen}) => {
    setActual({...actual,id,titulo,descripcion,precio,imagen});
    setEditar(!editar);

  }

  const eliminarItem = async (id) => {

    const response = await fetch('http://127.0.0.1:8000/api/deleteItems',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            id
        })
    });

    const content = await response.json();
    console.log(content);
    setActualiza(!actualiza);

  }

  const agregarItem = () =>{
    navigate('/agregar');
  }

  
  return (
    <div className="bg-slate-500 h-screen w-full flex flex-col justify-center items-center">

        {items.length === 0?
          <p>No hay datos</p>
        :
          editar ?
              <Editar setEditar={setEditar} editar={editar} actual={actual} setActual={setActual} />
          :
          <div className='flex flex-col items-center justify-center'>
            <button onClick={agregarItem} className='bg-green-700 rounded-sm m-2 p-2'>
              Agregar nuevo
            </button>
            <table className='table-auto w-1/2 rounded-md bg-slate-200 border-separate my-table-spacing'>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(
                  (pagina-1)*porPagina, (pagina-1)*porPagina+porPagina
                  ).map((item) => (
                    <tr className='text-center' key={item.id}>
                      <td>{item.titulo}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.precio}</td>
                      <td className='w-1/4'>
                        <div className='flex justify-center'>
                          <img src={item.imagen}/>
                        </div>
                      </td>
                      <td className=''>
                        <div className='flex justify-center'>
                        <button onClick={() => eliminarItem(item.id)} className='rounded-sm  bg-red-500 mx-1 p-1 w-1/2'>Eliminar</button>
                        <button onClick={()=>editarItem(item)} className='rounded-sm bg-yellow-500 mx-1 p-1 w-1/2'>Editar</button>
                        </div>
                      </td>
                    </tr>
              ))}
            </tbody>
            
          </table>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
          </div>
          
          
          

        }
    </div>
  );
}

export default App;
