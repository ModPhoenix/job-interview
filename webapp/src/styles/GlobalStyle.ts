import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    color: #fff;
    background-color: #000;
  }

  body {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

export default GlobalStyle;
