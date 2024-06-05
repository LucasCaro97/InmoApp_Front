import React from 'react'

const EquipoCard = ({ nombre, cargo, descripcion, imagenUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-32 object-cover" src={imagenUrl} alt={nombre} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{nombre}</h3>
        <p className="text-gray-600 text-sm mb-2">{cargo}</p>
        <p className="text-gray-700">{descripcion}</p>
      </div>
    </div>
  )
}

export default EquipoCard
    