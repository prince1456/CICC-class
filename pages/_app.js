import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Layout from 'components/Layout'
import 'antd/dist/antd.css'

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

`
const theme = {
  maxWidth: 1400,
  colors: {
    primary: "#332c2c",
  },
  typography: {
    h1: {
      fontSize: 44,
      color: '#000',
      fontWeight: 600,
    },
    h2: {
      fontSize: 34,
      color: '#000',
      fontWeight: 600,
    },
    h3: {
      fontSize: 24,
      color: '#000',
      fontWeight: 500,
    },
    h4: {
      fontSize: 18,
      color: '#000',
      fontWeight: 500,
    }
  }
}
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
