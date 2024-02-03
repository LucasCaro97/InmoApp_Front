import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Alquiler from './pages/Alquiler'
import Venta from './pages/Venta'
import SobreNosotros from './pages/SobreNosotros'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SocialIcons from './components/SocialIcons'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <SocialIcons/>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/sobre-nosotros' element={<SobreNosotros/>} />
          <Route path='/' element={<Inicio/>} />
          <Route path='/alquiler' element={<Alquiler/>} />
          <Route path='/venta' element={<Venta/>} />
        </Routes>
      </div>
    </Router>    
    <Footer/>

    </>
  )
}

export default App
