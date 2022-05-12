import { useState } from "react";

const FecharCaixa = (props) => {
  const { ultimoCaixa } = props;
  const [valor, setValor] = useState();
  const [mensagem, setMensagem] = useState();

  async function fecharCaixa(_id) {
    const result = await fetch("http://localhost:4321/api/caixas/fechamento", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, valorFinal: valor }),
    });
    setMensagem("Caixa fechado com sucesso!");
    return result;
  }

  return (
    <div>
      <p>{mensagem && mensagem}</p>
      <div>
        {ultimoCaixa &&
          ultimoCaixa.map((item) => (
            <div className="conteudoProd">
              <h3>Inicio do caixa: {item.valorInicial}</h3>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>Término do caixa:</h3>{" "}
                <textarea
                  style={{ resize: "none", width: 100, height: 20 }}
                  onChange={(e) => {
                    setValor(e.target.value);
                  }}
                >
                  {item.valorFinal}
                </textarea>
              </div>
              <p>notas de Duzentos: {item.notaDuzentos}</p>
              <p>notas de Cem:{item.notaCem}</p>
              <p>notas de Cinquenta:{item.notaCinquenta}</p>
              <p>notas de Vinte:{item.notaVinte}</p>
              <p>notas de Dez:{item.notaDez}</p>
              <p>notas de Cinco:{item.notaCinco}</p>
              <p>notas de Dois:{item.notaDois}</p>
              <p>notas de Um:{item.notaUm}</p>
              <p>Data: {item.data}</p>
              <br />
              <button
                onClick={() => {
                  fecharCaixa(item._id);
                }}
                className="btnHeader"
              >
                Fechar Caixa
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FecharCaixa;
