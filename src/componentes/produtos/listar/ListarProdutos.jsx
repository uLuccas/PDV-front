import "./Listar.css";
import { useState, useEffect } from "react";

const Listar = (props) => {
  const { listarProdutos, listar } = props;
  const [deletar, setDeletar] = useState();

  async function deletarProdutos(id) {
    const result = await fetch(
      "http://localhost:4321/api/produtos/deletarProduto",
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      }
    );
    listarProdutos();
    return result;
  }

  function limpar() {
    setDeletar("");
  }

  useEffect(() => {
    listarProdutos();
    limpar();
  }, []);

  return (
    <div>
      <h2>Listagem de Produtos</h2>

      <div className="mapProdutos">
        {listar &&
          listar.map((item) => {
            return (
              <div className="conteudoProd">
                <h3>{item.nome}</h3>
                <div>
                  <p>Preço: {item.preco}</p>
                  <p>Estoque: {item.estoque}</p>
                </div>
                <button
                  className="btnHeaderCinza"
                  onClick={() => {
                    deletarProdutos(item._id);
                  }}
                >
                  Deletar
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Listar;
