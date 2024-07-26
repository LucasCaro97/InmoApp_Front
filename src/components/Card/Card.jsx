import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAuthenticated } from "../../utils/auth";
import "./styles.css";
import deleteImage from "../../icons/delete.png";
import editImage from "../../icons/edit.png";

const Card = ({ title, imageUrl, id }) => {
  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product-details/${id}`);
  };

  const handleEdit = () => {
    navigate(`/editarInmueble/${id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const response = await axios.delete(`${BASE_URL_API}/inmueble/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Registro eliminado exitosamente");
          // Aquí podrías mostrar un mensaje de éxito o actualizar la interfaz de usuario
        } else {
          toast.error("Error al eliminar el registro:", response.statusText);
          // Aquí podrías mostrar un mensaje de error
        }
      } catch (error) {
        toast.error("Error al realizar la solicitud:", error);
        // Aquí podrías mostrar un mensaje de error
      }
    }
  };

  const confirmarEliminar = () => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar este registro (${id})?`
    );
    if (confirmacion) {
      handleDelete();
    }
  };

  return (
    <>
      <div className="cardContainer">
        <div className="h-full rounded-xl bg-custom-green border-2 border-lime-700 flex-col justify-center items-center">
          <div className={"buttonsSection"}>
            {isAuthenticated() && (
              <div className="flex gap-2">
                <span className="editBtn" onClick={handleEdit}>
                  <img src={editImage} alt="Edit this card button" />
                </span>
                <span className="deleteBtn" onClick={confirmarEliminar}>
                  <img src={deleteImage} alt="Delete this card button" />
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center p-4">
            <h2>{title}</h2>
          </div>

          <div className="flex h-1/2 justify-center items-center">
            <img
              src={
                imageUrl
                  ? `${BASE_URL_API}/images/` + imageUrl
                  : "/landingimg.png"
              }
              alt=""
              className="imageCard"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-4 p-4">
            <button className="seeMoreBtn" onClick={handleViewMore}>
              Ver mas
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
