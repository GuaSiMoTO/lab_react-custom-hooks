// Iteration 1: Crea un hook personalizado llamado useFetch que reciba una URL y devuelva un objeto con tres propiedades: data, loading y error. El hook debe realizar una solicitud HTTP a la URL proporcionada utilizando Axios, manejar el estado de carga y errores, y devolver los datos obtenidos.
import { useState, useEffect, use } from 'react';
import axios from 'axios';

const useFetch = (url) => {

  // aqui vans los 3 estados, data, loading y error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aqui es donde llamas a la API con Axios
    const fetchData = async () => {
    
    setLoading(true); // Empezamos a cargar, antes del try para que se vea el loading aunque la URL sea rápida
    
    try {
        const response = await axios.get(url); // llama al servidor
        setData(response.data); // Axios guarda la info en .data
        setError(null); // limpiamos el error si la llamada fue exitosa
      } catch (err) {
        setError(err); // capturamos el error
        setData(null); // limpiamos los datos si hubo un error
      } finally {
        setLoading(false); // Terminamos de cargar pase lo q sea
      }
    };

    fetchData(); // ejecutamos la función
  }, [url]); // Importante: si la URL cambia, el efecto se vuelve a ejecutar

  // El hook SIEMPRE debe devolver algo para que el componente lo use
  return { data, loading, error };
};

export default useFetch;