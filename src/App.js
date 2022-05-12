import { useState } from "react";
import "./App.css";
import Caixa from "./componentes/caixa/Caixa";
import Header from "./componentes/header/Header";
import Home from "./componentes/home/Home";
import RegistrarPedidos from "./componentes/pedidos/RegistrarPedidos";
import Produtos from "./componentes/produtos/Produtos";

function App() {
  const [tela, setTela] = useState("home");

  return (
    <div className="App">
      <Header setTela={setTela} />
      <div className="bg">
        <div className="tela">
          {/* <Listar /> */}
          {tela === "home" ? <Home setTela={setTela}/> : ``}
          {tela === "caixa" ? <Caixa /> : ``}
          {tela === "produtos" ? <Produtos /> : ""}
          {tela === "vendas" ? <RegistrarPedidos /> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
