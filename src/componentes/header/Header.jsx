// import { useState } from "react";
import "./header.css";

const Header = (props) => {
  const { setTela } = props;

  function trocaTela(valor) {
    setTela(valor);
  }
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="imgs"
          src="https://images.vexels.com/media/users/3/185771/isolated/lists/1e6d83c343109d46756cd9ebba8a7e68-suco-em-vidro.png"
          alt="icone de suco"
          onClick={(e) => {
            trocaTela("home");
          }}
        />
        <h1 className="tituloHeader">Luccas's Refrescos</h1>
      </div>
      <br />
      <div>
        <button
          value="home"
          onClick={(e) => {
            trocaTela(e.target.value);
          }}
          className="btnHeader"
        >
          Home
        </button>
        <button
          value="caixa"
          onClick={(e) => {
            trocaTela(e.target.value);
          }}
          className="btnHeader"
        >
          Caixa
        </button>
        <button
          value="vendas"
          onClick={(e) => {
            trocaTela(e.target.value);
          }}
          className="btnHeader"
        >
          Realizar Vendas
        </button>
        <button
          value="produtos"
          onClick={(e) => {
            trocaTela(e.target.value);
          }}
          className="btnHeader"
        >
          Produtos
        </button>
      </div>
    </div>
  );
};

export default Header;
