import { createGlobalStyle } from "styled-components"
// import reset from "styled-reset"
import reset from "./reset.module.css"
const GlobalStyle =createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif !important;
}

html,
body {
  width: 100%;
  height: 100%;
}

html {
    scroll-behavior: smooth;
    font-size: 62.5%; // 1rem = 10px;
}

body {
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1rem;
    color: #333;
    letter-spacing: 0.1px;
    word-break: keep-all;
}
h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1.3;
}

ul {
  list-style: none;
  padding-left: 0;
  font-size: 0;
}

li {
  font-size: 0.85rem;
}

p {
  font-size: 0.9rem;
  line-height: 1.3;
}

button,
a {
    all: unset;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
${reset}
`

export default GlobalStyle