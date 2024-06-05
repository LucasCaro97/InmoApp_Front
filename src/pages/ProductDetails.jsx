import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Label1 from '../components/Label1'
import ImageProductContainer from './../components/ImageProductContainer';
import axios from 'axios';

const ProductDetails = () => {
  
    const { id } = useParams();
    const [inmueble, setInmueble] = useState({});  
    const [arrayDeImagenes, setArrayDeImagenes] = useState([])

    const handdleRedirect = () => {
    const inmuebleVar = inmueble.nombre    
    const phoneNumber = '5493751364441';
    const message = encodeURIComponent(`Hola, acabo de ver el inmueble ${inmuebleVar} a traves de la pagina web, me gustaria mas informacion del mismo`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    }

    useEffect( () => {
      const fetchData = async () =>{
        try{
          const response = await axios.get(`http://localhost:8080/inmueble/${id}`)
          setInmueble(response.data)
          setArrayDeImagenes(response.data.listaImagenes)
        }catch(error){
          console.log(error)
        }
      }
      
      fetchData()
    }, [id]) 
  

    return (
    <div>
      <Label1 className='ml-6 sm:ml-12 lg:ml-40'>Detalles del Producto</Label1>
      <ImageProductContainer listaImagenes={arrayDeImagenes}/>
      
      <div className='w-3/4 m-auto 2xl:px-36'>
        <div className='flex justify-between px-2 font-semibold text-base lg:text-xl text-green-900 p-5'>
                <div>
                    {inmueble.nombre}
                </div> 
                <div>
                    ${inmueble.precio}
                </div>       
            </div>

            {/**OCULTO HASTA RESOLVER */}
            <div className='hidden sm:hidden sm:gap-10 sm:font-semibold sm:text-base lg:text-lg text-green-900 py-4'>
                <div className='flex items-center'><div className=' flex justify-end items-center h-12 w-12 pr-2'><img src="/SingleBed.png" className='h-12' alt="" /></div> 1 Dormitorio</div>
                <div className='flex items-center'><div className=' flex justify-end items-center h-12 w-12 pr-2'><img src="/Door.png" className='h-12' alt="" /></div> 3 Ambientes</div>
                <div className='flex items-center'><div className=' flex justify-end items-center h-12 w-12 pr-2'><img src="/Bathtub.png" className='h-12' alt="" /></div> 1 Baño</div>
                <div className='flex items-center'><div className=' flex justify-end items-center h-12 w-12 pr-2'><img src="/Garage.png" className='h-12' alt="" /></div> 1 Garage</div>
            </div>
            <div className='flex flex-col sm:text-base lg:text-lg pl-2 gap-1 mb-4 bg-custom-green border border-lime-700 p-2  w-full rounded-md'>
                <div className='sm:font-semibold sm:text-base lg:text-lg text-green-900'>Descripcion</div>
                <div>{inmueble.descripcion}</div>
            </div>
      </div>


        <div className='w-3/4 flex flex-col gap-3 sm:flex sm:flex-row sm:gap-3 sm:justify-between sm:w-[60%] m-auto mb-5 '>
            <div className='bg-custom-green border border-lime-700  w-full sm:w-[30%] h-52 rounded-md'>
                <h3 className='py-2 pl-3 font-semibold lg:text-base text-green-900'>Caracteristicas</h3>
                <ul className='list-disc list-inside'>
                {inmueble.caracteristicas?.map(item => (
                    <li key={item.id} className='list-item pl-2'>{item.nombre}</li>
                ))}
                </ul>
            </div>
            <div className='bg-custom-green border border-lime-700  w-full sm:w-[30%] h-52 rounded-md'>
                <h3 className='py-2 pl-3 font-semibold lg:text-base text-green-900'>Servicios</h3>
                <ul className='list-disc list-inside'>
                {inmueble.servicios?.map(item => (
                    <li key={item.id} className='list-item pl-2'>{item.nombre}</li>
                ))}
                </ul>
            </div>
            <div className='bg-custom-green border border-lime-700 w-full sm:w-[30%] h-52 rounded-md'>
                <h3 className='py-2 pl-3 font-semibold lg:text-base text-green-900'>Ambientes</h3>
                <ul className='list-disc list-inside'>
                {inmueble.ambientes?.map(item => (
                    <li key={item.id} className='list-item pl-2'>{item.nombre}</li>
                ))}
                </ul>
            </div>
        </div>
        <div className='w-3/4 m-auto 2xl:px-36 flex justify-center'>
        <button className=' w-full sm:w-40 bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl mb-5' onClick={handdleRedirect}>Contactar</button>
        </div>


        

    </div>
  )
}

export default ProductDetails
