import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Inicio() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('All')
  const [categorias, setCategorias] = useState(['All'])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://fakeapi.net/products')
      .then((res) => res.json())
      .then((data) => {
        // Extraemos la lista según la estructura de la API (si viene como array o dentro de un objeto)
        const listaProductos = Array.isArray(data) 
          ? data 
          : (data.products || data.data || [])

        setProductos(listaProductos)
        
        // Extraer categorías de forma segura
        const cats = ['All', ...new Set(listaProductos.map((p) => p.category).filter(Boolean))]
        setCategorias(cats)
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error)
        setProductos([]) // Si falla la API, mantenemos un arreglo vacío para evitar pantallas rojas
      })
  }, [])

  // Aseguramos que siempre sea un array antes de hacer el filter
  const productosFiltrados = (Array.isArray(productos) ? productos : []).filter((prod) => {
    const coincideCategoria = categoria === 'All' || prod.category === categoria
    const coincideBusqueda = prod.title?.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  if (!productos || productos.length === 0) return <p>Cargando productos...</p>
  if (productosFiltrados.length === 0) return <p>No se encontraron productos.</p>

  return (
    <>
      <div className="c-filtro">
        {categorias.map((cat, index) => (
          <button type="button" key={index} onClick={() => setCategoria(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      
      <div className="c-lista">
        {productosFiltrados.map((prod) => (
          <div 
            className="c-lista-pokemon" 
            key={prod.id} 
            onClick={() => navigate(`/fakeapi/${prod.id}`)}
          >
            <p>#{prod.id}</p>
            <p>{prod.title}</p>
            <img
              src={prod.image}
              alt={prod.title}
              width="auto"
              height="60"
              loading="lazy"
            />
            <p>${prod.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Inicio