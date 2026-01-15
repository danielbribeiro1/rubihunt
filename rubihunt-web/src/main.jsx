import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { HuntDetails } from './HuntDetails.jsx'
import { AdminPanel } from './AdminPanel.jsx'
import { Login } from './Login.jsx'          // <--- Importe o Login
import { PrivateRoute } from './PrivateRoute.jsx' // <--- Importe o Guarda-Costas
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hunts/:id" element={<HuntDetails />} />
        
        {/* Rota de Login Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota de Admin PROTEGIDA */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)