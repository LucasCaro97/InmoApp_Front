import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAuthenticated } from "../../utils/auth/auth";
import "./styles.css";
import deleteImage from "../../icons/delete.png";
import editImage from "../../icons/edit.png";
import { getToken } from "../../utils/auth/localStorage";

const Card = ({ id, title, imageUrl, description }) => {
  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
  const descripResume = description.substring(0, 50);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editarInmueble/${id}`);
  };

  const handleDelete = async () => {
    const token = getToken();
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
        } else {
          toast.error("Error al eliminar el registro:", response.statusText);
        }
      } catch (error) {
        toast.error("Error al realizar la solicitud:", error);
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

          <Link to={`/product-details/${id}`}>
            <div className="flex justify-center items-center">
              <h2>{title}</h2>
            </div>

            <div className="flex justify-center items-center">
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

            <div className="resumeContainer">
              {descripResume.length ? <p>{descripResume}...</p> : null}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
