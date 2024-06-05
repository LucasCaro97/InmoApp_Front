import React from 'react'
import EquipoCard from './EquipoCard';

const Equipo = () => {
    const equipo = [
        {
          nombre: 'Juan Pérez',
          cargo: 'Director de Marketing',
          descripcion: 'Experto en estrategias de marketing digital con más de 10 años de experiencia.',
          imagenUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
          nombre: 'María López',
          cargo: 'Diseñadora UX/UI',
          descripcion: 'Apasionada por crear experiencias de usuario impactantes y diseño centrado en el usuario.',
          imagenUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
          nombre: 'Pedro García',
          cargo: 'Desarrollador Full Stack',
          descripcion: 'Desarrollador experimentado con habilidades en front-end y back-end.',
          imagenUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        }
      ];
    
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((persona, index) => (
            <EquipoCard
              key={index}
              nombre={persona.nombre}
              cargo={persona.cargo}
              descripcion={persona.descripcion}
              imagenUrl={persona.imagenUrl}
            />
          ))}
        </div>
      );
    };
    
    export default Equipo;