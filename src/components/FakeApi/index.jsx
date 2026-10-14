import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react';
import './style.css';

function FakeApi() {
    const { id } = useParams(); 
    const [producto, setProducto] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });

    const esFavorito = producto ? favoritos.some(p => p.id === producto.id) : false;

    useEffect(() => {
        fetch(`https://fakeapi.net/products/${id}`)
            .then(response => response.json())
            .then(responseData => setProducto(responseData))
            .catch(error => console.error("Error cargando el producto:", error));
    }, [id]); 

    const toggleFavorito = () => {
        if (!producto) return;
        let nuevosFavoritos;
        if (esFavorito) {
            nuevosFavoritos = favoritos.filter(p => p.id !== producto.id);
        } else {
            nuevosFavoritos = [...favoritos, { id: producto.id, nombre: producto.title, image: producto.image }];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };
    
    if (!producto) return <p>Cargando...</p>;

    return (
        <div className="c-detalle-producto">
            <h1>{producto.title}</h1>
            <img 
                src={producto.image} 
                alt={producto.title} 
                width="200"
            />
            <p><strong>Precio:</strong> ${producto.price}</p>
            <p><strong>Categoría:</strong> {producto.category}</p>
            <p><strong>Descripción:</strong> {producto.description}</p>

            <button onClick={toggleFavorito}>
                {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
            </button>
        </div>
    );
}

export default FakeApi;