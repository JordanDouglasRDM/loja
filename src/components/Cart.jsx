import styled from "styled-components";
import Button from "./Button.jsx";

const SLi = styled.li`
    padding: 16px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: #eeeeee 1px solid;
`;

const SDivInfo = styled.div`
    background-color: white;

    p {
        background-color: white;
        font-size: 16px;
        margin-bottom: 2px;
    }

    span {
        background-color: white;
        font-size: 16px;
        font-weight: bold;
    }
`;

const SDivUnits = styled.div`
    width: 86px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button{
        padding: 5px 10px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        cursor: pointer;
    }
`;

/**
 * Componente para listagem de produto no carrinho
 * @param {Object} product Produto para listagem
 */
function CartProduct ({product, onChange, isLoading}){
    const truncatedName = product.name.length > 55 ? product.name.substring(0, 55) + '...' : product.name;
    function formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }
    return(
    <SLi>
        <SDivInfo>
            <p>{truncatedName}</p>
            <span>{formatPrice(product.price)}</span>
        </SDivInfo>
        <SDivUnits>
            <button disabled={isLoading} onClick={() => onChange(product, -1)}>
            -
            </button>
            <p>{product.units}</p>
            <button disabled={isLoading} onClick={() => onChange(product, +1)}>
            +
            </button>
        </SDivUnits>
    </SLi>
    );
    }

    /* elemento de lista personalizado com CSS */
    const SSection = styled.section`
        max-height: 600px !important;
        padding: 20px;
        display: grid;
        gap: 20px;
    `;

    /* elemento de lista personalizado com CSS */
    const SUl = styled.ul`
    list-style-type: none;
        max-height: 800px;
        overflow-y: auto;
    `;

    /**
    * componente para listagem de produtos no carrinho
    * @param {Object[]} products Produtos para listagem
    * @param {Function} onClick Função de finalização
    * @param {Boolean} isLoading Status de loading
    */
    function Cart({ products, onChange, onClick, isLoading = false }){
    return(
    <SSection>
        <Button onClick={onClick} isLoading={isLoading}>
            Finalizar Compra
        </Button>
        <SUl>
            {products.map((product) => (
                <CartProduct
                    key={product.id}
                    product={product}
                    onChange={onChange}
                    isLoading={isLoading}
                />
            ))}
        </SUl>
    </SSection>
    );
    }

export default Cart;