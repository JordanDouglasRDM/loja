import styled from "styled-components";
import './Total.css';

function Total(props) {
    const totalItems = props.totalItems
    const totalPrice = props.totalPrice
    function formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    return (
        <div className="total">
            <p className="total-items">Quantidade de items selecionado: {totalItems}</p>
            <p className="total-price">Preço total: {formatPrice(totalPrice)}</p>
        </div>
    );
}

export default Total;