import React, { Children, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
//Components & ReduxModules
import {
  fetchDataSetLocalStorage,
  setInitialData,
} from "../redux/modules/fanLetterDataSlice";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
function LayOut() {
  console.log("LayOut Render");
  const getData = localStorage.getItem("Tooniverse");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
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
  useEffect(() => {
    console.log("render auth");
    console.log(auth.accessToken);
    auth.accessToken ? navigate("/home") : navigate("/login");
  }, [auth.accessToken, navigate]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayOut;
