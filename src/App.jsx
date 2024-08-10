import { Route, Routes } from "react-router-dom";
import { NavBarNew } from "./components/NavBar/NavBarNew";
import Inicio from "./pages/Inicio";
import SobreNosotros from "./pages/SobreNosotros";
import SocialIcons from "./components/SocialIcons";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails";
import CargaDeParametrosGenerales from "./pages/CargaParametros/CargaDeParametrosGenerales";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/LoginForm/LoginForm";
import { OwnersView } from "./pages/OwnersView/OwnersView";
import { EditOwner } from "./pages/EditOwner/EditOwner";
import { EditRenter } from "./pages/EditRenter/EditRenter";
import { RentersView } from "./pages/RentersView/RentersView";
import Venta from "./pages/Venta";
import Alquiler from "./pages/Alquiler";
import { ContractForm } from "./components/ContractForm/ContractForm";
import CargaDeInmuebles from "./pages/CargaInmuebles/CargaDeInmuebles";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SocialIcons />
      <ToastContainer />
      <div className="flex-grow">
        <NavBarNew />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/venta" element={<Venta />} />
          <Route path="/alquiler" element={<Alquiler />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/propietario" element={<OwnersView />} />
          <Route path="/editarPropietario/:id" element={<EditOwner />} />
          <Route path="/inquilino" element={<RentersView />} />
          <Route path="/editarInquilino/:id" element={<EditRenter />} />
          <Route
            path="/nuevoCaracteristica"
            element={
              <CargaDeParametrosGenerales tipoParametro={"caracteristicas"} />
            }
          />
          <Route
            path="/nuevoServicio"
            element={<CargaDeParametrosGenerales tipoParametro={"servicios"} />}
          />
          <Route
            path="/nuevoAmbiente"
            element={<CargaDeParametrosGenerales tipoParametro={"ambientes"} />}
          />
          <Route path="/alquilerNuevo" element={<CargaDeInmuebles />} />
          <Route path="/ventaNuevo" element={<CargaDeInmuebles />} />
          <Route path="/editarInmueble/:id" element={<CargaDeInmuebles />} />
          <Route
            path="/nuevoCategoria"
            element={<CargaDeParametrosGenerales tipoParametro={"categoria"} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/newContract" element={<ContractForm />} />.
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
