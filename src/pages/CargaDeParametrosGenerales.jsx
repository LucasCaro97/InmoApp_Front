import React, { useEffect, useState } from 'react'
import Label1 from '../components/Label1'
import axios from 'axios';

const CargaDeParametrosGenerales = (tipoParametro) => {
  
  const [nombre, setNombre] = useState("");
  const [idParametro, setIdParametro] = useState("");
  const [parametros, setParametros] = useState([]);
  const [btnValue, setBtnValue] = useState('Editar');
  const [displayForm, setDisplayForm] = useState('hidden');
  const [btnFormValue, setBtnFormValue] = useState('Crear');

  const fetchData = async (  ) =>{
    const token = localStorage.getItem('jwt'); 
    if(token){
      try {
        const parametrosResponse = await axios.get(`http://200.58.107.39:8080/${tipoParametro.tipoParametro}`,{
          headers: {
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${token}`  
          }
        })
        setParametros(parametrosResponse.data)
        console.log(parametrosResponse.data)
    } catch (error) {
        console.log(error)
    }
    }
    
}
  
  
  useEffect(()=>{
    fetchData()
},[tipoParametro])


  const handdleSubmit = async (event) => {
    const token = localStorage.getItem('jwt')
    if(token){
      try{
        event.preventDefault();
  
        const data = {
          'nombre': nombre
        }
        if(btnFormValue === 'Crear') {
          const response = await axios.post(`http://200.58.107.39:8080/${tipoParametro.tipoParametro}`, data, {
            headers: {
              'Content-Type': 'application/json',  
              'Authorization': `Bearer ${token}`  
            }
          })
        } else{
          const response = await axios.put(`http://200.58.107.39:8080/${tipoParametro.tipoParametro}/${idParametro}`, data,{
            headers: {
              'Content-Type': 'application/json',  
              'Authorization': `Bearer ${token}`  
            }
          })
          setIdParametro("")
          setNombre("")
          setBtnFormValue("Crear")
        }
        //Manejo la respuesta del servidor
        fetchData()
        setDisplayForm('hidden')
      }catch(error){
        console.log("Error", error)
      }
    }
  }


  const handdleNameChange = (event) => {
    setNombre(event.target.value)
  }

  const handdleEditButton = (id, nombre) => {
    setDisplayForm('')
    setIdParametro(id)
    setNombre(nombre);
    setBtnFormValue('Guardar')
  }

  const handdleNewButton = () => {
    setDisplayForm('')
    setIdParametro('')
    setNombre('')
  }
 
  return (
      <div className='w-3/4 m-auto 2xl:px-36'>
          {/** FORMULARIO PARA CARGA Y EDICION DE DATOS */}
          <div className={displayForm}>
          <Label1>Carga de Parametros Generales</Label1>
          <form className='flex flex-col gap-8 px-8'>
            {/**CELDA PARA INDICAR QUE EL TIPO DE PARAMETRO ES 1/2/3 (CARACTERISTICAS) */}
            <div className='hidden'>
                <label htmlFor="tipoParametro" className='font-semibold text-base text-green-900'>Tipo Parametro: </label>
                <input type="text" className='w-1/4' id='tipoParametro' value={tipoParametro.tipoParametro} readOnly/>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="nombreParametro" className='font-semibold text-base text-green-900'>Nombre Parametro: </label>
                <input type="text" className='w-1/4' id='nombreParametro' value={nombre} onChange={handdleNameChange} />
            </div>
            <div>
            <button className=' w-full sm:w-40 bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl mb-5' onClick={handdleSubmit}>{btnFormValue}</button>
            </div>
        </form>
        </div>
        
          {/** TABLA PARA MOSTRAR LOS DATOS */}
         <div className="container mx-auto mb-4">
            <h1 className="text-3xl font-bold mb-4">Tabla de {tipoParametro.tipoParametro}</h1>
            <button className='bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl mb-2' onClick={() => handdleNewButton()}>Nuevo</button>
            {parametros.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {parametros.map(parametro => (
                            <tr key={parametro.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{parametro.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parametro.nombre}</td>
                                <td><button className='bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl' onClick={() => handdleEditButton(parametro.id, parametro.nombre)}>{btnValue}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos para mostrar.</p>
            )}
        </div>
    </div>
  )
}

export default CargaDeParametrosGenerales
