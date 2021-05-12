import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import BonusReducer from "../reducers/BonusReducer";
import { toast } from "react-toastify";

const initial_state = {
  bonusData: [],
  bonusDetails: [],
  total: {},
  data: [],
  getBonusDetailsById: [],
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
  const viewBonusById = (id) => {
    setLoader(true);
    client.get("/api/v1/bonus/" + id).then((response) => {
      state.getBonusDetailsById = response.data.data;
      setLoader(false);
      return dispatch({
        type: "VIEW_BONUS_BY_ID",
        payload: state.getBonusDetailsById,
      });
    });
  };

  const updateBonus = (data) => {
    setLoader(true);
    client.post("/api/v1/bonus/update", data).then((response) => {
      state.bonusData = response.data.data;
      setLoader(false);
      toast.info(response.data.message);
      return dispatch({
        type: "BONUS_UPDATE",
        payload: state.bonusData,
      });
    });
  };
  return (
    <BonusContext.Provider
      value={{
        bonusCreate,
        viewBonus,
        setLoader,
        viewBonusById,
        updateBonus,
        loader: loader,
        bonusData: state.bonusData,
        bonusDetails: state.bonusDetails,
        total: state.total,
        getBonusDetailsById: state.getBonusDetailsById,
      }}
    >
      {props.children}
    </BonusContext.Provider>
  );
};
