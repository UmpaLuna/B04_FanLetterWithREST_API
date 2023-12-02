import React from "react";
import GlobalStyle from "./styledComponents/GlobalStyle.js";
import Router from "./shared/Router.jsx";
import { ThemeProvider } from "styled-components";
import theme from "./styledComponents/theme/theme";
import { useSelector } from "react-redux";

function App() {
  console.log("App :", "Render");
  const data = useSelector((state) => state.data);
  console.log(data);
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
