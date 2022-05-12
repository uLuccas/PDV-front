import { useState } from "react";
import "./cadastrar.css";

const CadastrarItem = () => {
  const [nome, setNome] = useState();
  const [preco, setPreco] = useState();
  const [estoque, setEstoque] = useState();
  const [mensagem, setmensagem] = useState();

  function limpaState() {
    setEstoque("");
    setPreco("");
    setNome("");
    setmensagem("");
  }

  async function incluirItem() {
    if (nome === "" || preco == null || estoque === null) {
      setmensagem("Há campos a serem preenchidos !");
      return;
    } else {
      try {
        let result = await fetch(
          "http://localhost:4321/api/produtos/novoProduto",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, preco, estoque }),
          }
        );
        setmensagem("Cadastro realizado com sucesso!");
        return result.json();
      } catch (error) {
        return console.log(error);
      }
    }
  }

  return (
    <div className="conteudo">
      <h2>Cadastro de produtos</h2>

      <div className="conteudoProd">
        <form action="">
          <p>Nome: </p>
          <input
            type="text"
            placeholder="Nome do produto"
            onChange={(e) => {
              setNome(e.target.value);
            }}
            required
          />
          <p>Preço: </p>
          <input
            type="number"
            placeholder="Preço do produto"
            onChange={(e) => {
              setPreco(e.target.value);
            }}
            required
          />
          <p>Estoque: </p>
          <input
            type="number"
            placeholder="Estoque"
            onChange={(e) => {
              setEstoque(e.target.value);
            }}
            required
          />
          <br />
          <div>
            <button
              submit="submit"
              onClick={(e) => {
                incluirItem(e.preventDefault());
              }}
              className="btnListar"
            >
              Registrar
            </button>
            <button
              type="reset"
              onClick={() => {
                limpaState();
              }}
              className="btnListarCinza"
            >
              Limpar
            </button>
          </div>
        </form>
        <br />
        {mensagem ? mensagem : ""}
      </div>
    </div>
  );
};

export default CadastrarItem;
