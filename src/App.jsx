import { useEffect, useState } from "react";
import styled from "styled-components";
import Cart from "./components/Cart.jsx";
import Products from "./components/Products.jsx";

/**
* Funcao para chamar API
* @param {string} url caminho da função
* @param {string} method metodo da função
* @returns objeto de resposta
*/
async function api(url, method, body = undefined) {
  return await fetch(`https://api-loja-fatec-af114027199e.herokuapp.com${url}`, {
    body: body !== undefined ? JSON.stringify(body) : body,
    method: method,
    headers: {
      Accept: "application/json", "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

/**
* busca todos os produtos da API
* @returns lista de produtos
*/
async function apiGetProducts() {
  const data = await api("/products", "GET");
  return data.products;
}

/**
* Salva o carrinho de compras na API
* @param {Object[]} products lista de produtos
*/

async function apiSubmitCart(products) {
  await api("/purchases", "POST", { products });
}

function App() {

  const [productsLoading, setProductsLoading] = useState(false); // status do loading de produtos
  const [products, setProducts] = useState([]); //Lista de Produtos
  const [cart, setCart] = useState([]); // lista de produtos no carrinho
  const [cartLoading, setCartLoading] = useState(false); // status do loading do carrinho

  /**
  * busca os produtos
  */

  async function getProducts() {
    setProductsLoading(true); //ativa loading de produtos
    setProducts(await apiGetProducts()); // salva a lista de produtos na variavel global
    setProductsLoading(false); // desativa loading de produtos
  }

  /**
  *salva o carrinho
  */
  async function submitCart() {
    setCartLoading(true); //ativa loading do carrinho
    await apiSubmitCart(cart); // salva o carrinho
    setCart([]); // limpa o carrinho
    setCartLoading(false); // desativa loading do carrinho
    getProducts(); // busca os produtos novamente
  }

  /**
  * altera unidades do produto
  */
  function setProduct(product, change) {
    const products = cart.filter(({ id }) => {
      return id !== product.id;
    });

    product.units += change;
    if (product.units > 0) {
      setCart(() => [...products, product]);
    } else {
      setCart(() => [...products]);
      setProducts((LastProducts) => [...LastProducts, product]);
    }
  }

  /**
  * adiciona produto no carrinho
  */
  function addProduct(product) {
    product.units = 1;
    setCart(() => [...cart, product]);

    setProducts(() =>
      products.filter(({ id }) => {
        return id !== product.id;
      })
    );
  }

  useEffect(() => {
    getProducts(); //busca os produtos ao carregar a pagina
  }, []);


  /* elemento main personalizado com CSS */
    const SMain = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;
    `;

return (
  <SMain>
    <Cart
      products={cart}
      onChange={setProduct}
      onClick={submitCart}
      isLoading={cartLoading}
    />
    <Products
      products={products}
      onClick={addProduct}
      isLoading={productsLoading}
    />
  </SMain>
  );
}
export default App;

