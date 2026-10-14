import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  if (favoritos.length === 0) return <p>No tienes productos favoritos aún.</p>;

  return (
    <div className="c-lista">
      {favoritos.map((prod) => (
        <div
          key={prod.id}
          className="c-lista-pokemon"
          onClick={() => navigate(`/fakeapi/${prod.id}`)}
        >
          <p>#{prod.id}</p>
          <p>{prod.nombre || prod.title}</p>
          {prod.image && (
            <img
              src={prod.image}
              alt={prod.nombre || prod.title}
              width="auto"
              height="60"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Favoritos;