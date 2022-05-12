import { useState, useEffect } from "react";
import Item from "./Item";
import "./pedidos.css";

const Itens = (props) => {
  const {
    listar,
    listarProdutos,
    gerarCarrinho,
    getArray,
    setCarrinho,
    carrinho,
  } = props;
  const [add, setAdd] = useState(false);
  const [contador, setContador] = useState({ idCard: "", cont: 0 });

  useEffect(() => {
    getArray();
  }, []);

  return (
    <div className="pagamento">
      <div className="mapProdutos">
        {listar &&
          listar.map((item) => (
            <div>
              {/* {item._id} */}
              <Item
                key={item._id}
                item={item}
                add={add}
                idCard={contador.idCard}
                contador={contador}
                setAdd={setAdd}
                setContador={setContador}
                listarProdutos={listarProdutos}
                gerarCarrinho={gerarCarrinho}
                carrinho={carrinho}
                setCarrinho={setCarrinho}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Itens;
