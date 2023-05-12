
/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  const fetchListData = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        const sortedArray = [...response.data.results];

        sortedArray.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })

        console.log(sortedArray);
        setList(sortedArray)
      });
  }

  useEffect(() => {
    fetchListData();
  }, []);


  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Pesquisar Pokémon"
      />
      <div className="pokemon-grid">
        {filteredList.map((item) => (
          <Pokemon key={item.name} data={item} />
        ))}
      </div>
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(data.url)
      .then((response) => setDetails(response.data));
  }, []);

  if (details === null) {
    return <><div>Carregando...</div></>
  }

  return <div className="pokemon-card">
    <img src={details.sprites.front_default} alt={details.name} />
    <div className="pokemon-info">
      <h3>{details.name}</h3>
      <p>EXP: {details.base_experience}</p>
    </div>
  </div>
}

export default App;
