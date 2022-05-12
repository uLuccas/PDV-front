import "../home/home.css";
import { useState, useEffect } from "react";

const Home = (props) => {
  const { setTela } = props;
  const [contProdutos, setContProdutos] = useState([]);
  const [contPedidos, setContPedidos] = useState([]);
  const [ultimoCaixa, setUltimoCaixa] = useState([]);

  async function listarProdutos() {
    const result = await fetch("http://localhost:4321/api/produtos", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    setContProdutos(response);
  }

  async function listarPedidos() {
    const result = await fetch("http://localhost:4321/api/pedidos/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const response = await result.json();
    setContPedidos(response.length);
    return result;
  }
  async function listaUmCaixa() {
    const result = await fetch("http://localhost:4321/api/caixas/getOneCaixa", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    setUltimoCaixa(response[0].valorFinal.toFixed(2));
    return response;
  }

  useEffect(() => {
    listarProdutos();
    listarPedidos();
    listaUmCaixa();
  }, []);

  return (
    <div>
      <h2>Seja Bem Vindo!</h2>
      <div className="tudo">
        <div className="caixaInfo">
          <div>
            <h3>
              Total de produtos:
              <p>{contProdutos.length}</p>
            </h3>
          </div>
          <button
            className="btnHeader"
            onClick={() => {
              setTela("produtos");
            }}
          >
            Ver
          </button>
        </div>
        <div className="caixaInfo2">
          <h3>
            {" "}
            Pedidos concluidos:
            <p>{contPedidos}</p>
          </h3>
        </div>
        <div className="caixaInfo2">
          <h3>
            Fechamento do último Caixa:
            <p>R$ {ultimoCaixa}</p>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
