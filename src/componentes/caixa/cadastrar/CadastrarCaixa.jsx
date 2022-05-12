import { useState } from "react";

const CadastrarCaixa = (props) => {
  const {
    message,
    limparTotal,
    cadstrarCaixa,
    totalCaixa,
    setUm,
    setDois,
    setCinco,
    setDez,
    setVinte,
    setCinquenta,
    setCem,
    setDuzentos,
  } = props;
  return (
    <div className="conteudoProd">
      <form action="">
        <br />
        <h3>Notas</h3>
        <div className="notas">
          <p>Nota 200: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setDuzentos(e.target.value);
            }}
          />
          <p>Nota 100: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setCem(e.target.value);
            }}
          />
          <p>Nota 50: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setCinquenta(e.target.value);
            }}
          />
          <p>Nota 20: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setVinte(e.target.value);
            }}
          />
          <p>Nota 10: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setDez(e.target.value);
            }}
          />
          <p>Nota 5: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setCinco(e.target.value);
            }}
          />
          <p>Nota 2: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setDois(e.target.value);
            }}
          />
          <p>Nota 1: </p>
          <input
            type="number"
            min="0"
            onChange={(e) => {
              setUm(e.target.value);
            }}
          />
          <p>Valor total: {totalCaixa}</p>
        </div>
        <br />
        <div>
          <button
            type="submit"
            className="btnHeader"
            onClick={(e) => {
              cadstrarCaixa(e.preventDefault());
            }}
          >
            Registrar
          </button>
          <button
            type="reset"
            onClick={() => {
              limparTotal();
            }}
            className="btnHeaderCinza"
          >
            Limpar
          </button>
        </div>
      </form>
      <br />
      {message && message}
    </div>
  );
};

export default CadastrarCaixa;
