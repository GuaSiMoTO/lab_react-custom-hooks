// src/components/PublicGists.jsx
import axios from 'axios';
// Iteration 2: Crea un componente llamado PublicGists que utilice el hook useFetch paa obtener y mostrar la lista de gits
import useFetch from '../hooks/useFetch'; // no usamos {} porque es una constante

const PublicGists = () => {
  // traemos los datos del hook
  const {data: gists, loading, error} = useFetch('https://api.github.com/gists/public'); 
  
  
  if (loading) return <p>Loading public gists...</p>;
  if (error) return <p>Error fetching gists: {error.message}</p>;

  return (
    <div>
      <h2>Public Gists</h2>
      <ul>
        {gists.map(gist => (
          <li key={gist.id}>
            <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
              {gist.description || 'No description'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicGists;