import "./pedidos.css";

const Item = (props) => {
  const { item, carrinho, listarProdutos, gerarCarrinho, setCarrinho } = props;

  // const [effect, setEffect] = useState(false);

  function adicionarProduto(nome, contador, preco) {
    //    setAdd(true);
    // if (carrinho.length > 0) {
    //   for (let i = 0; i < carrinho.length; i++) {
    //     let pegaCarrinho = [...carrinho];
    //     let idxCar = carrinho[i];
    //     console.log(idxCar);
    //     if (carrinho.nome == pegaCarrinho.nome) {
    //       setCarrinho([
    //         ...carrinho,
    //         {qtd: contador },
    //       ]);
    //     }
    //   }
    // if (carrinho.length === 1) {
    //   setCarrinho({ nome, preco, qtd: contador });
    //   return;
    // } else {
    //   for (let i = 0; i < carrinho.length; i++) {
    //     if (carrinho[i].nome === nome) {
    //       let quantidade = carrinho.qtd;
    //       carrinho[i] = quantidade + 1;
    //       break;
    //     } else {
    //       setCarrinho(
    //         ...carrinho,
    //         carrinho.push({ nome, preco, qtd: contador })
    //       );
    //     }
    //   }
    // }
    // if (carrinho.nome === nome) {
    //   console.log(carrinho.nome);
    //   const updatedCars = carrinho.map((car) => {
    //     if (car.nome === nome) {
    //       let quantidade = car.qtd;
    //       console.log(quantidade);
    //       return {
    //         ...car,
    //         qtd: quantidade++,
    //       };
    //     }
    //     return {
    //       ...car,
    //     };
    //   });
    //   setCarrinho(updatedCars);
    //   console.log(updatedCars);
    // } else {
    //   carrinho.push(setCarrinho(...carrinho, { nome, preco, qtd: contador }));
    // }
    // setCarrinho({ nome, preco, qtd: contador });
    // }
  }

  async function adicionarQuantidade(evt, qtd) {
    const _id = evt.target.id;
    const result = await fetch(
      "http://localhost:4321/api/produtos/alterarQuantidade",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, qtd: qtd + 1 }),
      }
    );
    return result;
  }
  async function removerQuantidade(evt, qtd) {
    const _id = evt.target.id;
    console.log(_id, qtd);
    const result = await fetch(
      "http://localhost:4321/api/produtos/alterarQuantidade",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, qtd: qtd - 1 }),
      }
    );
    return result;
  }

  return (
    <div className="cardItem" id={item._id}>
      <h3>{item.nome}</h3>
      <div>
        <p>Preço: {item.preco}</p>
        <p>Estoque: {item.estoque}</p>
      </div>
      <button
        className="btnHeader"
        id={item._id}
        onClick={(evt) => {
          adicionarQuantidade(evt, item.qtd);
          listarProdutos();
          if (item.qtd === 0) {
          } else {
            setCarrinho({
              nome: item.nome,
              preco: item.preco,
              qtd: item.qtd + 1,
            });
          }
        }}
      >
        Adicionar
      </button>

      {item.qtd >= 1 && (
        <button
          id={item._id}
          onClick={(evt) => {
            removerQuantidade(evt, item.qtd);
            listarProdutos();
            setCarrinho({
              nome: item.nome,
              preco: item.preco,
              qtd: item.qtd - 1,
            });
          }}
          className="btnHeaderCinza"
        >
          Remover
        </button>
      )}
      <br />
      <p>
        Qtd.:{item.qtd}
        {/* {item._id === idCard ? contador.cont : ""} */}
      </p>
    </div>
  );
};

export default Item;
