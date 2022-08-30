import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION (
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(data: {
      name: $name
      description: $description
      price: $price
      status: "AVAILABLE"
      photo: {
        create: {
          image: $image
          altText: $name
        }
      }
    }) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {
  const {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  } = useForm({
    image: ``,
    name: `Yuriy`,
    price: `20`,
    description: ``,
  });

  const [
    createProduct,
    {
      data,
      error,
      loading,
    }
  ] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: {
      ...inputs,
      price: parseInt(inputs.price),
    },
    refetchQueries: [
      {query: ALL_PRODUCTS_QUERY},
    ],
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();

    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  }

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <ErrorMessage
        error={error}
      />
      <fieldset
        disabled={loading}
        aria-busy={loading}
      >
        <label htmlFor="image">
          Image:&nbsp;
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price:&nbsp;
          <input
            type="number"
            id="price"
            name="price"
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description:&nbsp;
          <textarea
            id="description"
            name="description"
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button
          type='submit'
        >
          + Add Product
        </button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
