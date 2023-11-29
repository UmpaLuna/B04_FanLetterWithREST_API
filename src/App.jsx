import React from "react";
import GlobalStyle from "./styledComponents/GlobalStyle.js";
import Router from "./shared/Router.jsx";
import { ThemeProvider } from "styled-components";
import theme from "./styledComponents/theme/theme";

function App() {
  console.log("App :", "Render");

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
