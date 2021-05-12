import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import BonusReducer from "../reducers/BonusReducer";
import { toast } from "react-toastify";

const initial_state = {
  bonusData: [],
  bonusDetails: [],
  total: {},
  data: [],
};
export const BonusContext = createContext();
export const BonusProvider = (props) => {
  const [state, dispatch] = useReducer(BonusReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const bonusCreate = (data) => {
    setLoader(true);
    client
      .post("/api/v1/bonus/create", data)
      .then((response) => {
        state.bonusData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "BONUS_CREATE",
          payload: state.bonusData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewBonus = (key, page) => {
    console.log(key);
    setLoader(true);
    client
      .get("/api/v1/bonus?key=" + key + "&page=" + page + "&size=" + 10)
      .then((response) => {
        console.log(response.data.data.data);
        state.bonusDetails = response.data.data.data;
        state.total = response.data.data.total;
        state.data = response.data.data;
        setLoader(false);

        return dispatch({
          type: "VIEW_BONUS",
          payload: state.bonusDetails,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    console.log(state),
    (
      <BonusContext.Provider
        value={{
          bonusCreate,
          viewBonus,
          setLoader,
          loader: loader,
          bonusData: state.bonusData,
          bonusDetails: state.bonusDetails,
          total: state.total,
        }}
      >
        {props.children}
      </BonusContext.Provider>
    )
  );
};
