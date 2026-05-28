import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Entidades } from './pages/Entidades.jsx';
import { Doacoes } from './pages/Doacoes.jsx';
import { Produtos } from './pages/Produtos.jsx';
import { Distribuicoes } from './pages/Distribuicoes.jsx';
import { Estoque } from './pages/Estoque.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="entidades" element={<Entidades />} />
          <Route path="doacoes" element={<Doacoes />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="distribuicoes" element={<Distribuicoes />} />
          <Route path="estoque" element={<Estoque />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);