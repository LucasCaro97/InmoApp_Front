import "react-toastify/dist/ReactToastify.css";
import Inicio from "./pages/Inicio";
import SobreNosotros from "./pages/SobreNosotros";
import Footer from "./components/Footer/Footer";
import CargaDeParametrosGenerales from "./pages/CargaParametros/CargaDeParametrosGenerales";
import LoginForm from "./components/LoginForm/LoginForm";
import Venta from "./pages/Venta";
import Alquiler from "./pages/Alquiler";
import CargaDeInmuebles from "./pages/CargaInmuebles/CargaDeInmuebles";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { PropertyDetail } from "./components/PropertyDetail/PropertyDetail";
import { ToastContainer } from "react-toastify";
import { OwnersView } from "./pages/OwnersView/OwnersView";
import { EditOwner } from "./pages/EditOwner/EditOwner";
import { EditRenter } from "./pages/EditRenter/EditRenter";
import { RentersView } from "./pages/RentersView/RentersView";
import { ContractsView } from "./pages/ContractsView/ContractsView";
import { ContractForm } from "./components/ContractForm/ContractForm";
import "./App.css";

import { Report } from "./components/Report/Report";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <div className="flex-grow">
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/venta" element={<Venta />} />
          <Route path="/alquiler" element={<Alquiler />} />
          <Route path="/product-details/:id" element={<PropertyDetail />} />
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
          <Route path="/nuevo-inmueble" element={<CargaDeInmuebles />} />
          <Route path="/editarInmueble/:id" element={<CargaDeInmuebles />} />
          <Route
            path="/nuevoCategoria"
            element={<CargaDeParametrosGenerales tipoParametro={"categoria"} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/contratos" element={<ContractsView />} />
          <Route path="/formulario-contrato" element={<ContractForm />} />
          <Route path="/formulario-contrato/:id" element={<ContractForm />} />
          <Route path="/reporte" element={<Report />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
