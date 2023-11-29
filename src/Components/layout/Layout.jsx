import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

//Components & ReduxModules
import {
  fetchDataSetLocalStorage,
  setInitialData,
} from "../../redux/modules/fanLetterDataSlice";
import Header from "./Header";
import Footer from "./Footer";
function Layout({ children }) {
  const getData = localStorage.getItem("Tooniverse");

  //Reducer
  const dispatch = useDispatch();
  const getLocalStorageItem = useCallback(() => {
    const parseData = JSON.parse(getData);
    return parseData;
  }, [getData]);

  useEffect(() => {
    console.log("Layout useEffect :", "render");
    const getItem = getLocalStorageItem();
    if (getItem === null) return dispatch(fetchDataSetLocalStorage());

    dispatch(setInitialData(getItem));
  }, [dispatch, getLocalStorageItem]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default React.memo(Layout);
