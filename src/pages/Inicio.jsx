import React, {useEffect, useState} from 'react'
import ProductCarrousel from '../components/ProductCarrousel'
import Label1 from '../components/Label1';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
import { toast } from 'react-toastify';

const Inicio = () => {  
  
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () =>{
      try{
        const response = await axios.get("http://200.58.107.39:8080/inmueble")
        setInmuebles(response.data);  
        setLoading(false);  
      }catch(error){
        console.log(error)
        setLoading(false);
      }
    }    
    fetchData()
  }, []) 

  // Filtrar inmuebles una vez y almacenarlos en estados separados
  const inmueblesAlquiler = inmuebles.filter(inmueble => inmueble.esAlquiler);
  const inmueblesVenta = inmuebles.filter(inmueble => inmueble.esVenta);

  return (
    <div>
      <section className='flex justify-center'>
      <img className='h-full w-11/12' src="/landingimg.png" alt="Landing Page Img" />
      </section>

      <section className='font-montserra mb-16'>
        <Label1 className='text-center' >Alquiler de Inmuebles</Label1>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <ProductCarrousel datos={inmueblesAlquiler} />
        )}
      </section>

      
      <section className='font-montserra mb-16'>
        <Label1 className='text-center' >Venta de Inmuebles</Label1>
        <ProductCarrousel datos={inmueblesVenta}/>
      </section>
    </div>
  )
}

export default Inicio