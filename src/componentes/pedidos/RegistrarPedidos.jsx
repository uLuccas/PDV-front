import Itens from "./Itens";
import Pagamento from "./Pagamento";
import { useState, useEffect } from "react";
import ModalTroco from "./ModalTroco";
import "./pedidos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrarPedidos = () => {
  const [listar, setListar] = useState();
  const [total, setTotal] = useState(0);
  const [duzentos, setDuzentos] = useState(0);
  const [cem, setCem] = useState(0);
  const [cinquenta, setCinquenta] = useState(0);
  const [vinte, setVinte] = useState(0);
  const [dez, setDez] = useState(0);
  const [cinco, setCinco] = useState(0);
  const [dois, setDois] = useState(0);
  const [um, setUm] = useState(0);
  const [totalCaixa, setTotalCaixa] = useState(0);
  const [arr, setArr] = useState([]);
  const [carrinho, setCarrinho] = useState({ nome: "", preco: 0, qtd: 0 });
  const [btnPagamento, setBtnPagamento] = useState(false);
  const [caixa, setCaixa] = useState();
  const [troco, setTroco] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function calcularCaixa() {
    let somaDzt = duzentos * 200;
    let somaCem = cem * 100;
    let somaCinq = cinquenta * 50;
    let somaVin = vinte * 20;
    let somaDez = dez * 10;
    let somaCin = cinco * 5;
    let somaDois = dois * 2;
    let somaUm = um * 1;

    let totalCaixa =
      somaDzt +
      somaCem +
      somaCinq +
      somaVin +
      somaDez +
      somaCin +
      somaDois +
      somaUm;
    // console.log(total);
    setTotalCaixa(totalCaixa);
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
  }

  async function listarProdutos() {
    const result = await fetch("http://localhost:4321/api/produtos", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    // console.log(response);
    setListar(response);
    listaUmCaixa();
    return response;
  }

  function calcularTotal() {
    let soma = 0;
    // console.log(listar);
    if (listar === undefined) {
      return;
    }
    for (let i = 0; i < listar.length; i++) {
      if (listar[i].qtd > 0) {
        let calc = listar[i].preco * listar[i].qtd + soma;
        soma = calc;
      }
    }
    setTotal(soma);
    return;
  }

  async function getArray() {
    const resultado = await fetch("http://localhost:4321/api/carrinhos/", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const ok = await resultado.json();
    calcularTotal();
    setArr(ok);
  }

  async function gerarCarrinho(obj) {
    let item = arr[0].itens;
    if (arr[0].fechado === true) {
      novoCarrinho(obj);
    }
    if (arr[0].fechado === false) {
      if (item.length === 0) {
        console.log("ANTIGO ELSE");
        inserirNoCarrinho(obj);
      }
      for (let i = 0; i < item.length; i++) {
        if (item[i].nome === obj.nome && obj.qtd === 0) {
          console.log("primeiro If");
          deletarItemCarrinho(item[i]._id);
          break;
        }
        if (item[i].nome === obj.nome && obj.qtd !== item[i].qtd) {
          // item[i].qtd = obj.qtd;
          console.log("SEGUNDO If");
          alterarQuantidade(item[i]._id, obj.qtd);
          break;
        }
        if (item[i].nome === obj.nome && obj.qtd === item[i].qtd) {
          toast("Item já adicionado ao carrinho");
          break;
        }
      }
      const exists = item.find((it) => it.nome === obj.nome);
      console.log(exists);
      if (!exists && obj.nome !== "") {
        inserirNoCarrinho(obj);
      }
    }
    calcularTotal();
    return console.log("finalizou");
  }

  async function novoCarrinho(obj) {
    const novoCarrinho = await fetch(
      "http://localhost:4321/api/carrinhos/novoCarrinho",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens: obj }),
      }
    );
    getArray();
    return novoCarrinho;
  }

  async function inserirNoCarrinho(prod) {
    let id = arr[0]._id;
    const result = await fetch(
      "http://localhost:4321/api/carrinhos/incluirItem",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, produtos: prod }),
      }
    );
    console.log(result);
    getArray();
    return result;
  }

  async function deletarItemCarrinho(idItem) {
    let id = arr[0]._id;
    const result = await fetch(
      "http://localhost:4321/api/carrinhos/deletarItem",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCarrinho: id, idItem }),
      }
    );
    console.log(result);
    getArray();
    return result;
  }

  async function alterarQuantidade(idItem, quantidade) {
    let id = arr[0]._id;
    const result = await fetch(
      "http://localhost:4321/api/carrinhos/alterarQtd",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCarrinho: id, idItem, quantidade }),
      }
    );
    console.log(result);
    getArray();
    return result;
  }

  function liberarBtn() {
    if (totalCaixa >= total) {
      setBtnPagamento(false);
    } else {
      setBtnPagamento(true);
    }
  }

  async function finalizarPedido() {
    const result = await fetch("http://localhost:4321/api/pedidos/novoPedido", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itens: arr[0].itens,
        total,
        recebido: totalCaixa,
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
    guardarNotas(caixa[0]._id);
    listaUmCaixa();
    return result;
  }

  async function guardarNotas(id) {
    let ntduz = caixa[0].notaDuzentos + Number(duzentos);
    let ntcem = caixa[0].notaCem + Number(cem);
    let ntcin = caixa[0].notaCinquenta + Number(cinquenta);
    let ntvin = caixa[0].notaVinte + Number(vinte);
    let ntdez = caixa[0].notaDez + Number(dez);
    let ntcnc = caixa[0].notaCinco + Number(cinco);
    let ntdoi = caixa[0].notaDois + Number(dois);
    let ntum = caixa[0].notaUm + Number(um);

    const guardar = await fetch(
      "http://localhost:4321/api/caixas/atualizarNotas",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          notaDuzentos: ntduz,
          notaCem: ntcem,
          notaCinquenta: ntcin,
          notaVinte: ntvin,
          notaDez: ntdez,
          notaCinco: ntcnc,
          notaDois: ntdoi,
          notaUm: ntum,
        }),
      }
    );
    return guardar;
  }

  async function listaUmCaixa() {
    const result = await fetch("http://localhost:4321/api/caixas/getOneCaixa", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await result.json();
    setCaixa(response);
    return response;
  }

  function validacaoTroco() {
    let somaDzt = caixa[0].notaDuzentos * 200;
    let somaCem = caixa[0].notaCem * 100;
    let somaCinq = caixa[0].notaCinquenta * 50;
    let somaVin = caixa[0].notaVinte * 20;
    let somaDez = caixa[0].notaDez * 10;
    let somaCin = caixa[0].notaCinco * 5;
    let somaDois = caixa[0].notaDois * 2;
    let somaUm = caixa[0].notaUm * 1;

    let totalCaixaBanco =
      somaDzt +
      somaCem +
      somaCinq +
      somaVin +
      somaDez +
      somaCin +
      somaDois +
      somaUm;

    console.log(totalCaixaBanco);
    setTroco(totalCaixa - total);
    let teste = totalCaixa - total
    console.log(teste);   
    if (totalCaixa === total) {
      finalizarPedido();
    }
    if (totalCaixa > total) {
      if (totalCaixaBanco < teste) {
        toast("Tem troco não!");
      } else {
        console.log('caiu no else');
        finalizarPedido()
        abrirModal();
      }
    }
  }

  function abrirModal() {
    setIsOpen(true);
  }

  function fecharModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    calcularCaixa();
    listaUmCaixa();
  }, [duzentos, cem, cinquenta, vinte, dez, cinco, dois, um]);

  useEffect(() => {
    listarProdutos();
  }, []);

  useEffect(() => {
    liberarBtn();
  }, [totalCaixa]);

  return (
    <div className="arruma">
      <div>
        <h1>Produtos</h1>
        <Itens
          calcularTotal={calcularTotal}
          listarProdutos={listarProdutos}
          listar={listar}
          calcularCaixa={calcularCaixa}
          getArray={getArray}
          gerarCarrinho={gerarCarrinho}
          setCarrinho={setCarrinho}
          carrinho={carrinho}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>Total da compra:</p>
            <textarea
              value={"R$ " + total}
              style={{
                resize: "none",
                height: 20,
                fontSize: 15,
                alignItems: "center",
                width: 100,
                margin: 5,
              }}
            ></textarea>
          </div>
        </div>
        <button
        className="btnHeader"
          onClick={() => {
            calcularTotal();
            gerarCarrinho(carrinho);
          }}
        >
          Gerar Carrinho
        </button>
      </div>

      <Pagamento
        limparTotal={limparTotal}
        totalCaixa={totalCaixa}
        calcularCaixa={calcularCaixa}
        setUm={setUm}
        setDois={setDois}
        setCinco={setCinco}
        setDez={setDez}
        setVinte={setVinte}
        setCinquenta={setCinquenta}
        setCem={setCem}
        setDuzentos={setDuzentos}
        btnPagamento={btnPagamento}
        validacaoTroco={validacaoTroco}
      />
      <ModalTroco
        isOpen={isOpen}
        onRequestClose={fecharModal}
        troco={troco}
        caixa={caixa}
        finalizarPedido={finalizarPedido}
      />
      <ToastContainer />
    </div>
  );
};

export default RegistrarPedidos;
