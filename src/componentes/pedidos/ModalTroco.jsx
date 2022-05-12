import Modal from "react-modal";
import { useState } from "react";
import "./modalTroco.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalTroco(props) {
  const { isOpen, onRequestClose, troco, caixa, finalizarPedido } = props;

  const [trocoDuz, setTrocoDuz] = useState(0);
  const [trocoCem, setTrocoCem] = useState(0);
  const [trocoCin, setTrocoCin] = useState(0);
  const [trocoVin, setTrocoVin] = useState(0);
  const [trocoDez, setTrocoDez] = useState(0);
  const [trocoCnc, setTrocoCnc] = useState(0);
  const [trocoDois, setTrocoDois] = useState(0);
  const [trocoUm, setTrocoUm] = useState(0);
  let contDuz = 0;
  let contCem = 0;
  let contCin = 0;
  let contVin = 0;
  let contDez = 0;
  let contCinco = 0;
  let contDois = 0;
  let contUm = 0;

  function calcularTroco(valor) {
    let resto = 0;

    geraTroco();

    setTrocoDuz(contDuz);
    setTrocoCem(contCem);
    setTrocoCin(contCin);
    setTrocoVin(contVin);
    setTrocoDez(contDez);
    setTrocoCnc(contCinco);
    setTrocoDois(contDois);
    setTrocoUm(contUm);
    return resto;
  }
  let valor = troco;

  function geraTroco() {
    if (valor === 0) return valor;

    if (valor >= 200 && caixa[0].notaDuzentos - trocoDuz >= 1) {
      contDuz++;
      valor -= 200;
    } else if (valor >= 100 && caixa[0].notaCem - trocoCem >= 1) {
      contCem++;
      valor -= 100;
    } else if (valor >= 50 && caixa[0].notaCinquenta - trocoCin >= 1) {
      contCin++;
      valor -= 50;
    } else if (valor >= 20 && caixa[0].notaVinte - trocoVin >= 1) {
      contVin++;
      console.log("entrou no 20");
      valor -= 20;
    } else if (valor >= 10 && caixa[0].notaDez - trocoDez >= 1) {
      contDez++;
      valor -= 10;
    } else if (valor >= 5 && caixa[0].notaCinco - trocoCnc >= 1) {
      contCinco++;
      valor -= 5;
    } else if (valor >= 2 && caixa[0].notaDois - trocoDois >= 1) {
      contDois++;
      valor -= 2;
    } else if (valor >= 1 && caixa[0].notaUm - trocoUm >= 1) {
      contUm++;
      valor -= 1;
    }
    return geraTroco();
  }

  async function retirarNotas(id) {
    let ntduz = caixa[0].notaDuzentos - Number(trocoDuz);
    let ntcem = caixa[0].notaCem - Number(trocoCem);
    let ntcin = caixa[0].notaCinquenta - Number(trocoCin);
    let ntvin = caixa[0].notaVinte - Number(trocoVin);
    let ntdez = caixa[0].notaDez - Number(trocoDez);
    let ntcnc = caixa[0].notaCinco - Number(trocoCnc);
    let ntdoi = caixa[0].notaDois - Number(trocoDois);
    let ntum = caixa[0].notaUm - Number(trocoUm);

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
    console.log(guardar);
    return guardar;
  }
  // useEffect(() => {
  //   calcularTroco(troco);
  // }, [troco])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <ToastContainer />
      <div>
        <div className="modal">
          <button
            onClick={() => {
              onRequestClose();
              setTrocoDuz(0);
              setTrocoCem(0);
              setTrocoCin(0);
              setTrocoVin(0);
              setTrocoDez(0);
              setTrocoCnc(0);
              setTrocoDois(0);
              setTrocoUm(0);
            }}
            className="btnModalCinza"
          >
            X
          </button>
        </div>
        <h1>O troco do Cliente é R$ {troco.toFixed(2)}</h1>
        <div>
          <div className="ntModal">
            <div className="cedula">
              <img
                className="imgModal"
                src="https://d6scj24zvfbbo.cloudfront.net/3d949126595157cda30612b6a5753d40/200000213-c9c3bc9c3d/um-real.png?ph=f33fd63e84"
                alt=""
              />
              <h5>Moeda de um: {trocoUm}</h5>
            </div>
            <div className="cedula">
              <img
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/2/2_back.jpg"
                alt=""
                className="imgModal"
              />
              <h5>Nota de Dois: {trocoDois}</h5>
            </div>
            <div className="cedula">
              <img
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/5/5_back.jpg"
                alt=""
                className="imgModal"
              />
              <h5>Nota de Cinco: {trocoCnc}</h5>
            </div>
            <div className="cedula">
              <img
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/10/10_back.jpg"
                alt=""
                className="imgModal"
              />
              <h5>Nota de Dez: {trocoDez}</h5>
            </div>
          </div>
          <div className="ntModal">
            <div className="cedula">
              <img
                className="imgModal"
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/20/20_back.jpg"
                alt=""
              />
              <h5>Nota de Vinte: {trocoVin}</h5>
            </div>
            <div className="cedula">
              <img
                className="imgModal"
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/50/50_front.jpg"
                alt=""
              />
              <h5>Nota de Cinquenta: {trocoCin}</h5>
            </div>
            <div className="cedula">
              <img
                className="imgModal"
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/100/100_back.jpg"
                alt=""
              />
              <h5>Nota de Cem: {trocoCem}</h5>
            </div>

            <div className="cedula">
              <img
                className="imgModal"
                src="https://www.bcb.gov.br/novasnotas/assets/img/section/200/200_front.jpg"
                alt=""
              />
              <h5>Nota de Duzentos: {trocoDuz}</h5>
            </div>
          </div>
        </div>
        <div className="ntModal">
          <button
            onClick={() => {
              calcularTroco(troco);
            }}
            className="btnModal"
          >
            Ver Notas
          </button>

          <button
            onClick={() => {
              retirarNotas(caixa[0]._id);
              onRequestClose();
            }}
            className="btnModal"
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
