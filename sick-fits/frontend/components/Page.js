import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src:  url('/static/rednikanext-medium-webfont.woff2')
          format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --boxShadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika__next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika__next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;



const Page = (props) => {
  const { children } = props;

  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>
        {children}
      </InnerStyles>
    </div>
  );
};

export default Page;

Page.propTypes = {
  children: PropTypes.any,
};
