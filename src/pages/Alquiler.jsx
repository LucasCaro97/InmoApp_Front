import React, {useState, useEffect} from 'react'
import Label1 from '../components/Label1'
import ProductList from './../components/ProductList';
import axios from 'axios';

const Alquiler = () => {
  
  const [inmuebles, setInmuebles] = useState([]);  

  useEffect( () => {
    const fetchData = async () =>{
      try{
        const response = await axios.get("http://localhost:8080/inmueble")
        setInmuebles(response.data.filter(inmueble => inmueble.esAlquiler))
      }catch(error){
        console.log(error)
      }
    }
    
    fetchData()
  }, []) 

  return (
    <div>
      <section className='w-3/4 m-auto'>
      <Label1 className='text-left'>Alquileres Disponibles</Label1>
      <ProductList datos={inmuebles}/>
      </section>
      </div>
  )
}

export default Alquiler
