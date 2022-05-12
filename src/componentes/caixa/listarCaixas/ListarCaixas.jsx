import { useState } from "react";

const ListarCaixas = (props) => {
  const { lista } = props;
  const [data, setData] = useState()
  return (
    <div>
      <p>Listagem de Caixas</p>

      <div className="mapProdutos">
        {lista &&
          lista.map((item) => (
            <div className="conteudoProd">
              <h3>Inicio do caixa: {item.valorInicial}</h3>
              <h3>Término do caixa: {item.valorFinal}</h3>
              <p>notas de Duzentos: {item.notaDuzentos}</p>
              <p>notas de Cem:{item.notaCem}</p>
              <p>notas de Cinquenta:{item.notaCinquenta}</p>
              <p>notas de Vinte:{item.notaVinte}</p>
              <p>notas de Dez:{item.notaDez}</p>
              <p>notas de Cinco:{item.notaCinco}</p>
              <p>notas de Dois:{item.notaDois}</p>
              <p>notas de Um:{item.notaUm}</p>
              <p>Data: {item.data}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListarCaixas;
