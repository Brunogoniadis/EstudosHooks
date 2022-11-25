import { useState, useEffect } from 'react'
import styled from 'styled-components';


function App() {
  const [repositories, setRepositories] = useState([

  ]);

  useEffect ( () => {
    (async () => {
      const response = await fetch ('https://api.github.com/users/brunogoniadis/repos')
      const data = await response.json();
    
      setRepositories(data);

    })();

  }, []);

  useEffect(() => {
    const filtered = repositories.filter( repo => repo.favorite);

    document.title = `Voce tem ${filtered.length} favoritos`;
  }, [repositories])

  
  function handleFavorites (id) {
    const newRepositories = repositories.map( repo =>{
      return repo.id === id ? {... repo, favorite: !repo.favorite } : repo
    })
    setRepositories (newRepositories);
  }  


  return (

    <ul>
      {repositories.map (repo => (
        <li className="teste" key= {repo.id}>
          {repo.name}
          {repo.favorite && <span>( Favorito )</span>}
        <button onClick={ () => handleFavorites(repo.id) }>Favoritar</button>
        </li>
      ))}
    </ul>

  )
}

export default App
