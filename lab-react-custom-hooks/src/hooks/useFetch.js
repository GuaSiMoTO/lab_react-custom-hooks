// Iteration 1: Crea un hook personalizado llamado useFetch que reciba una URL y devuelva un objeto con tres propiedades: data, loading y error. El hook debe realizar una solicitud HTTP a la URL proporcionada utilizando Axios, manejar el estado de carga y errores, y devolver los datos obtenidos.
import { useState, useEffect, use } from 'react';
import axios from 'axios';

const useFetch = (url) => {

  // aqui vans los 3 estados, data, loading y error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Iteration 4 (BONUS): creamos cancelar la solicitud HTTP
    const controller = new AbortController();

    // Aqui es donde llamas a la API con Axios
    const fetchData = async () => {
    
    setLoading(true); // Empezamos a cargar, antes del try para que se vea el loading aunque la URL sea rápida
    
    try {
      // añadimos el signal del controller a la solicitud para poder cancelarla si es necesario
        const response = await axios.get(url,
          {signal: controller.signal} // con signal le pasamos abortcontroller, antes creada
        );

        setData(response.data); // Axios guarda la info en .data
        setError(null); // limpiamos el error si la llamada fue exitosa
      } catch (e) {

        // manejamos si el error es por cancelación
        if (axios.isCancel(e)) {
           console.log( "Petición Cancelada: " , err.message);
           return
        }
        setError(e); // capturamos el error
        setData(null); // limpiamos los datos si hubo un error
      } finally {
        setLoading(false); // Terminamos de cargar pase lo q sea
      }
    };

    fetchData(); // ejecutamos la función

    // Devolver función de limpieza. A esto se le llama "cleanup function" y se ejecuta cuando el componente se desmonta o antes de que el efecto se vuelva a ejecutar (si la URL cambia). Esto es importante para evitar actualizar el estado de un componente que ya no está montado, lo que puede causar errores.
    return () => { controller.abort(); }; // Esto cancela la solicitud si el componente se desmonta o si la URL cambia antes de que la solicitud termine
  
  }, [url]); // Importante: si la URL cambia, el efecto se vuelve a ejecutar

  // El hook SIEMPRE debe devolver algo para que el componente lo use
  return { data, loading, error };
};

export default useFetch;