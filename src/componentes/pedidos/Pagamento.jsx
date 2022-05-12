// import { useState, useEffect } from "react";
import "./pedidos.css";

const Pagamento = (props) => {
  const {
    calcularCaixa,
    limparTotal,
    totalCaixa,
    setUm,
    setDois,
    setCinco,
    setDez,
    setVinte,
    setCinquenta,
    setCem,
    setDuzentos,
    btnPagamento,
    validacaoTroco
  } = props;

  return (
    <div>
      <h1>Caixa</h1>
      <div className="pagamento">
        <form action="">
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
            <p>Valor recebido: {totalCaixa}</p>
          </div>
          <br />
          <div>
            <button
              type="submit"
              className="btnHeader"
              disabled={btnPagamento}
              onClick={(e) => {
                calcularCaixa(e.preventDefault());
                validacaoTroco()
              }}
            >
              Concluir Pgto
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
      </div>
    </div>
  );
};

export default Pagamento;
