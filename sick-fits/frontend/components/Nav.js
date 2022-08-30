/* eslint-disable arrow-body-style */
import Link from 'next/link';
import NavStyles from './styles/NavStyles';


const Nav = () => {

  return (
    <NavStyles>
      <Link href='/products'>
        products
      </Link>
      <Link href='/sell'>
        sell
      </Link>
      <Link href='/orders'>
        orders
      </Link>
      <Link href='/account'>
        account
      </Link>
      <Link href='/cart'>
        cart
      </Link>
    </NavStyles>
  );
};

export default Nav;
