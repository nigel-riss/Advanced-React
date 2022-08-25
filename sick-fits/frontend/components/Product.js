import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from "./styles/PriceTag";
import formatMoney from '../lib/formatMoney';


const Product = (props) => {
  const {
    product,
  } = props;

  return <ItemStyles>
    <img 
      src={product?.photo?.image?.publicUrlTransformed}
      alt={product.name}
    />
    <Title>
      <Link
        href={`/product/${product.id}`}
      >
        {product.name}
      </Link>
    </Title>
    <PriceTag>
      {formatMoney(product.price)}
    </PriceTag>
    <p>{product.description}</p>
    {/* TODO: ADD and DELETE button */}
  </ItemStyles>;
};

export default Product;
