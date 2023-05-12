
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

  const fetchListData = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        const sortedArray = [...response.data.results];

        sortedArray.sort((a,b) => {
          return a.name.localeCompare(b.name);
        })

        console.log(sortedArray);
        setList(sortedArray)
      });
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => {
        return <Pokemon key={item.name} data={item} />
      })}
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

  return <div style={{display: 'flex', alignItems:'center'}}>
    <img
      src={details.sprites.front_default}
      style={{width:40, marginLeft:20}} />
    <span>
      <b>{details.name}</b>- EXP {details.base_experience}
    </span>
  </div>;
}

export default App;
