
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

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => setList(response.data.results));
    
    //  axios
    //    .get("https://pokeapi.co/api/v2/pokemon/6")
    //    .then(response => console.log(response));
  }, []);


  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => {
        <>{JSON.stringify(item)}</>
      })}
    </>
  );
}

export default App;
