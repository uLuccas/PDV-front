import { useState, useEffect } from "react";
import "./caixa.css";
import CadastrarCaixa from "./cadastrar/CadastrarCaixa";
import ListarCaixas from "./listarCaixas/ListarCaixas";
import FecharCaixa from "./fecharCaixa/FecharCaixa";

const Caixa = () => {
  const [duzentos, setDuzentos] = useState(0);
  const [cem, setCem] = useState(0);
  const [cinquenta, setCinquenta] = useState(0);
  const [vinte, setVinte] = useState(0);
  const [dez, setDez] = useState(0);
  const [cinco, setCinco] = useState(0);
  const [dois, setDois] = useState(0);
  const [um, setUm] = useState(0);
  const [totalCaixa, setTotalCaixa] = useState(0);
  const [message, setMessage] = useState();
  const [opcoes, setOpcoes] = useState("");
  const [lista, setLista] = useState();
  const [ultimoCaixa, setUltimoCaixa] = useState();

  function calcularCaixa() {
    let somaDzt = duzentos * 200;
    let somaCem = cem * 100;
    let somaCinq = cinquenta * 50;
    let somaVin = vinte * 20;
    let somaDez = dez * 10;
    let somaCin = cinco * 5;
    let somaDois = dois * 2;
    let somaUm = um * 1;

    let total =
      somaDzt +
      somaCem +
      somaCinq +
      somaVin +
      somaDez +
      somaCin +
      somaDois +
      somaUm;
    // console.log(total);
    setTotalCaixa(total);
    return total;
  }
  function limparTotal() {
    setDuzentos(0);
    setCem(0);
    setCinquenta(0);
    setVinte(0);
    setDez(0);
    setCinco(0);
    setDois(0);
    setUm(0);
    setTotalCaixa(0);
    setMessage("");
  }

  async function cadstrarCaixa() {
    const result = await fetch("http://localhost:4321/api/caixas/novoCaixa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valorInicial: totalCaixa,
        valorFinal: totalCaixa,
        notaDuzentos: duzentos,
        notaCem: cem,
        notaCinquenta: cinquenta,
        notaVinte: vinte,
        notaDez: dez,
        notaCinco: cinco,
        notaDois: dois,
        notaUm: um,
      }),
    });
    console.log(result);
    setMessage("Caixa aberto com sucesso!\n Boas Vendas :)");
    return result;
  }

  async function listar() {
    const result = await fetch("http://localhost:4321/api/caixas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    setLista(response);
    return response;
  }
  async function listaUmCaixa() {
    const result = await fetch("http://localhost:4321/api/caixas/getOneCaixa", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    setUltimoCaixa(response);
    return response;
  }

  useEffect(() => {
    calcularCaixa();
  }, [duzentos, cem, cinquenta, vinte, dez, cinco, dois, um]);

  return (
    <div className="conteudo">
      <h1>Caixa</h1>
      <p>Selecione uma opção</p>
      <div>
        <button
          className="btnHeader"
          value="Cadastrar"
          onClick={(e) => {
            setOpcoes(e.target.value);
          }}
        >
          Cadastrar Caixa
        </button>
        <button
          className="btnHeader"
          value="Listar"
          onClick={(e) => {
            setOpcoes(e.target.value);
            listar();
          }}
        >
          Listar Caixas
        </button>
        <button
          className="btnHeader"
          value="Fechar"
          onClick={(e) => {
            setOpcoes(e.target.value);
            listaUmCaixa();
          }}
        >
          Fechar Caixa
        </button>
      </div>
      {opcoes === "Cadastrar" ? (
        <CadastrarCaixa
          message={message}
          limparTotal={limparTotal}
          cadstrarCaixa={cadstrarCaixa}
          totalCaixa={totalCaixa}
          setUm={setUm}
          setDois={setDois}
          setCinco={setCinco}
          setDez={setDez}
          setVinte={setVinte}
          setCinquenta={setCinquenta}
          setCem={setCem}
          setDuzentos={setDuzentos}
        />
      ) : (
        ""
      )}
      {opcoes === "Listar" ? (
        <ListarCaixas listar={listar} lista={lista} />
      ) : (
        ""
      )}
      {opcoes === "Fechar" ? <FecharCaixa ultimoCaixa={ultimoCaixa} /> : ""}
    </div>
  );
};

export default Caixa;
