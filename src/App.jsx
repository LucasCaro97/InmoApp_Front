import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Alquiler from './pages/Alquiler'
import Venta from './pages/Venta'
import SobreNosotros from './pages/SobreNosotros'
import SocialIcons from './components/SocialIcons'
import Footer from './components/Footer'
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import CargaDeParametrosGenerales from './pages/CargaDeParametrosGenerales'
import CargaDeInmuebles from './pages/CargaDeInmuebles'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SocialIcons />
      <ToastContainer />
      <Router>
        <div className="flex-grow">
          <Navbar />
          <Routes>
            <Route path='/sobre-nosotros' element={<SobreNosotros />} />
            <Route path='/' element={<Inicio />} />
            <Route path='/alquiler' element={<Alquiler />} />
            <Route path='/venta' element={<Venta />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/nuevoCaracteristica' element={<CargaDeParametrosGenerales tipoParametro={'caracteristicas'} />} />
            <Route path='/nuevoServicio' element={<CargaDeParametrosGenerales tipoParametro={'servicios'} />} />
            <Route path='/nuevoAmbiente' element={<CargaDeParametrosGenerales tipoParametro={'ambientes'} />} />
            <Route path='/alquilerNuevo' element={<CargaDeInmuebles />} />
            <Route path='/ventaNuevo' element={<CargaDeInmuebles />} />
            <Route path='/editarInmueble/:id' element={<CargaDeInmuebles />} />
            <Route path='/nuevoCategoria' element={<CargaDeParametrosGenerales tipoParametro={'categoria'} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
