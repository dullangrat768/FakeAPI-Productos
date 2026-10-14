import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Inicio from "./components/inicio";
import Favoritos from "./components/favoritos";
import Info from "./components/info";
import Coleccion from "./components/coleccion";
import Usuario from "./components/usuario";
import FakeApi from "./components/FakeApi";
import './App.css';

function App() {
  return (
    <Router>
      <nav className='c-menu'>
        <Link to="/">Inicio</Link>
        <Link to="/coleccion">Colección</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/info">Info</Link>
        <Link to="/usuario">Usuario</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/coleccion" element={<Coleccion />} />
        <Route path="/info" element={<Info />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/fakeapi/:id" element={<FakeApi />} />
      </Routes>
    </Router>
  );
}

export default App;