import { useState } from "react";
import CadastrarItem from "./cadastrar/CadastrarItem";
import Listar from "./listar/ListarProdutos";

const Produtos = () => {
  const [opcoes, setOpcoes] = useState("");
  const [listar, setListar] = useState();

  async function listarProdutos() {
    const result = await fetch("http://localhost:4321/api/produtos", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    console.log(response);
    setListar(response);
    return response;
  }
  return (
    <div>
      <h1>Produtos</h1>
      <p>Selecione uma opção</p>
      <button
        className="btnListar"
        value="cadastrar"
        onClick={(e) => {
          setOpcoes(e.target.value);
        }}
      >
        Cadastrar Produtos
      </button>
      <button
        className="btnListar"
        value="listar"
        onClick={(e) => {
          setOpcoes(e.target.value);
          listarProdutos();
        }}
      >
        Gerar Lista
      </button>
      <div>
        {opcoes === "listar" ? (
          <Listar listarProdutos={listarProdutos} listar={listar} />
        ) : (
          ""
        )}
        {opcoes === "cadastrar" ? <CadastrarItem /> : ""}
      </div>
    </div>
  );
};

export default Produtos;
