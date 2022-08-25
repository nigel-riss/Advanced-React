import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import nProgress from 'nprogress';
import Page from '../components/Page.js';
import '../components/styles/nprogress.css';
import withData from '../lib/withData.js';

Router.events.on(`routeChangeStart`, () => {
  nProgress.start();
});
Router.events.on(`routeChangeComplete`, () => {
  nProgress.done();
});
Router.events.on(`routeChangeError`, () => {
  nProgress.done();
});


const MyApp = (props) => {
  const {
    Component,
    pageProps,
    apollo,
  } = props;

  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
};

MyApp.getInitialProps = async ({ Component, ctx}) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
