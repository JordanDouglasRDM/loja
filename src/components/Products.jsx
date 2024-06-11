import styled from "styled-components";

/*elemento de bloco personalizado com CSS */
const SDiv = styled.div`
	height: 300px;
	padding: 10px 5px 5px 5px;
	border-radius: 10px;
	background: #ffffff;
	cursor: pointer;
	position: relative;
	border: #d4d4d4 solid 1px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	width: 180px;
	//margin-top: 10px;

	img {
		width: 100%;
		height: 110px;
		border-radius: 5px;
	}
	&:hover {
		#name {
			color: #6297ff;
		}
	}
`;

/* elemento de bloco de informação personalizado com CSS */
const SDivInfo = styled.div`
	padding: 0 15px 0 15px;
	background-color: white !important;

	p {
		font-size: 15px;
		background-color: white;
		text-align: left;
	}

	#price {
		margin-top: 40px;
		text-align: center;
		background-color: #ccffcf;
		font-size: 20px;
		border-radius: 5px;
		color: #006206;
	}

	#unit {
		color: #a8a8a8;
		text-align: right;
		font-size: 12px;
		margin-top: 25px;
	}
`;

/** componente para listagem de produto
* @param {Object} product produto para listagem
* @param {Function} onClick Função de seleção
*/
function Product({product, onClick}) {
	function formatPrice(price) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
	}
	const truncatedName = product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name;
return(
<SDiv onClick={() => onClick(product)}>
	<img src={product.image} alt={product.name} />
	<SDivInfo>
		<p id="name">{truncatedName}</p>
		<p id="price" >{formatPrice(product.price)}</p>
		<p id="unit">{product.units} disponíveis</p>
	</SDivInfo>
</SDiv>
);
}

/* elemento de seção personalizado com CSS */
const SSection = styled.section`
	
	max-height: 800px;
    overflow: auto;
    padding: 20px;
    display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
    gap: 20px;
`;

/**
* @param {Object[]} products produts para listagem
* @param {Function} onClick Função de seleção
*/
function Products({products, onClick, isLoading = false }) {
return(
<SSection>
	{isLoading //verifica se está em loading
		? "Carregando..."
		: products.length > 0 // verifica se existem produtos
		? products.map((product) => (
			<Product key={product.id} product={product} onClick={onClick} />
		 ))
		: "Nenhum produto encontrado!"}
</SSection>
);
}

export default Products;
