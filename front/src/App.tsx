import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CookieTester from './pages/CookieTester'

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cookietester" element={<CookieTester />} />
    </Routes>
  )
}

export default App
