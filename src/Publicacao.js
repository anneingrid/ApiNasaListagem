export default function Publicacao({ id, titulo, conteudo }) {
  return (
    <div className="pub">
      <h2>{titulo}</h2>
      <p>{conteudo}</p>
    </div>
  );
}