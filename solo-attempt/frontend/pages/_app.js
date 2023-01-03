import Page from '../components/Page'


const App = ({ Component, pageProps }) => {
  return (
    <Page>
      <Component {...pageProps}/>
    </Page>
  )
}


export default App
