import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';

const Card = ({title, description, imageUrl, className, id  }) => {
    
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product-details/${id}`);
  };

  const handleEdit = () => {
    navigate(`/editarInmueble/${id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('jwt')
    if(token){
      try {
        const response = await axios.delete(`http://localhost:8080/inmueble/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": 'application/json'
          }
        });
        if (response.status === 200) {
          toast.success('Registro eliminado exitosamente');
          // Aquí podrías mostrar un mensaje de éxito o actualizar la interfaz de usuario
        } else {
          toast.error('Error al eliminar el registro:', response.statusText);
          // Aquí podrías mostrar un mensaje de error
        }
      } catch (error) {
        toast.error('Error al realizar la solicitud:', error);
        // Aquí podrías mostrar un mensaje de error
      }
    }
    
    
  };

  const confirmarEliminar = () => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar este registro (${id})?`);
    if (confirmacion) {
      handleDelete();
    }
  };
  

  return (
    <>
    <div className={className}> 
      <div className='h-full rounded-xl bg-custom-green border-2 border-lime-700 flex-col justify-center items-center'>
                 
        <div className='flex justify-center items-center p-4'>
          <p className='text-xl font-semibold'>{title}</p>
        </div>  

        <div className='flex h-1/2 justify-center items-center'>
          <img src={imageUrl ?  "http://localhost:8080/images/" + imageUrl : "/landingimg.png"} alt="" className='h-full w-4/5 rounded-md' />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-4 p-4'>
          <p>{description}</p>
          <button className='bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl' onClick={handleViewMore}>Ver mas</button>
          {isAuthenticated() && (
            <div className='flex gap-2'>
            <button className='bg-green-900 text-slate-300 text-base px-3 py-1 rounded-xl' onClick={handleEdit}>Editar</button>
            <button className='bg-red-900 text-slate-300 text-base px-3 py-1 rounded-xl' onClick={confirmarEliminar}>Eliminar</button>
          </div>
          )}
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Card
