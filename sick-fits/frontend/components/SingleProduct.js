import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';


const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 20px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: top;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: {
      id: $id
    }) {
      id
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const {
    data,
    loading,
    error,
  } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    }
  });

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <ErrorMessage 
      error={error}
    />
  }

  const {
    name,
    price,
    description,
    photo,
  } = data.Product;

  return (
    <ProductStyles>
      <Head>
        <title>{name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}


export default SingleProduct;
