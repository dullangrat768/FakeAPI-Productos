import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Coleccion() {
  const [productos, setProductos] = useState([]);
  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('misProductos') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados.map(Number))] : [];
    } catch {
      return [];
    }
  });
  const [nuevos, setNuevos] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  fetch('https://fakeapi.net/products')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      const lista = Array.isArray(datos) ? datos : (datos.products || datos.data || []);
      setProductos(lista);
    })
    .catch((error) => console.error('Error al cargar productos:', error));
}, []);

  const totalProductos = productos.length;

  const obtenerAleatorios = () => {
    if (totalProductos === 0) return;
    
    const seleccionados = Array.from({ length: 4 }, () => {
      const prodRandom = productos[Math.floor(Math.random() * totalProductos)];
      return prodRandom?.id;
    }).filter(Boolean);

    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });

    const actualizados = [...vistos];
    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('misProductos', JSON.stringify(actualizados));
  };

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Colección de Productos</h1>
      <p className="coleccion-contador">{listaCapturados.length} <span>/ {totalProductos}</span></p>
      
      <button
        className="coleccion-boton"
        onClick={obtenerAleatorios}
        disabled={totalProductos > 0 && listaCapturados.length >= totalProductos}
      >
        Obtener 4 aleatorios
      </button>

      {nuevos.length > 0 && <h2 className="coleccion-subtitulo">Nuevos obtenidos</h2>}
      <section className="coleccion-nuevos">
        {nuevos.map(({ id, repetido }, indice) => {
          const item = productos.find((p) => p.id === id);
          return (
            <div
              key={`${id}-${indice}`}
              className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
              onClick={() => navigate(`/fakeapi/${id}`)}
            >
              <p>#{id}</p>
              {item && (
                <>
                  <img src={item.image} alt={item.title} width="60" height="60" />
                  <p>{item.title}</p>
                </>
              )}
            </div>
          );
        })}
      </section>

      <section className="coleccion-album">
        {productos.map((prod) => {
          const capturado = listaCapturados.includes(prod.id);
          return (
            <div
              key={prod.id}
              className={capturado ? 'coleccion-pokemon capturado' : 'coleccion-pokemon'}
              onClick={() => capturado && navigate(`/fakeapi/${prod.id}`)}
            >
              {capturado ? (
                <>
                  <img src={prod.image} width="45" height="45" loading="lazy" alt={prod.title} />
                  <p>#{prod.id}</p>
                </>
              ) : (
                <p>#{prod.id}</p>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;