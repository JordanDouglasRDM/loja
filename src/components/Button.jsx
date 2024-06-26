import styled from "styled-components";

const SButton = styled.button`
    cursor: pointer;
    padding: 18px 8px;
    width: 100%;
    color: #ffffff;
    background-color: #3578ff;
    font-size: 18px;
    border: 0;
    border-radius:8px;
    height: 50px;
`;

/**
 * Componente de botão
 * @param {HTMLCollection} children Elementos internos
 * @param {Function} onClick Função ao clicar
 * @param {Boolean} isLoading Status de loading
 */
function Button({children, onClick, isLoading = false}) {
    return(
        <SButton onClick={onClick} disabled={isLoading}>
            {isLoading ? "Carregando...": children}
        </SButton>
    );
}

export default Button;