import { useState } from "react";

export default function Formulario({ aoSalvar }) {

  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [ mensagem, setMensagem] = useState(null);
  function aoAlterar(evento) {
    setTexto(evento.target.value);
  }

  function aoAlterarTitulo(evento) {
    setTitulo(evento.target.value);
  }

  function aoClicar() {
    aoSalvar(titulo, texto);
    if(titulo.length==0){
      alert('O campo título é obrigatório');
      return ;
    }
    if(texto.length==0){
      alert('O campo texto é obrigatório');
      return ;
    }
  }

  return (
    <form className="formulario">
      <label>Título:</label>
      <input type="text" onChange={aoAlterarTitulo} />

      <label>Texto:</label>
      <textarea onChange={aoAlterar}></textarea>
      
      <button type="button" onClick={aoClicar}>Salvar</button>
    </form>
  );
}