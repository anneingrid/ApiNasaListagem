import axios from 'axios';
import { useEffect, useState } from 'react';
import Publicacao from './Publicacao';
import Formulario from './Formulario';
import './App.css';

function App() {
  const [publicacoes, setPublicacoes] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((resposta) => {
        setPublicacoes(resposta.data);
      });
  }, []);

  function salvarTexto(titulo, texto) {
    const carga = {
      userId: 1,
      title: titulo,
      body: texto
    };
    axios.post(`https://jsonplaceholder.typicode.com/posts`, carga)
      .then((resposta) => {
        console.log(resposta);
      });
  }

  return (
    <div className="App">
      <Formulario aoPublicar={salvarTexto} />
      <div>
        {publicacoes.map((publicacao) => {
          return <Publicacao 
            key={publicacao.id}
            id={publicacao.id}
            titulo={publicacao.title} 
            conteudo={publicacao.body}
          />
        })}
      </div>
    </div>
    
  );
}

export default App;
