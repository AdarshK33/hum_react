import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import BonusReducer from "../reducers/BonusReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {
  bonusData: [],
  bonusDetails: [],
  total: {},
  data: [],
  getBonusDetailsById: [],
  bonusListExport: {},
  getBonusByContractType: [],
};
export const BonusContext = createContext();
export const BonusProvider = (props) => {
  const [state, dispatch] = useReducer(BonusReducer, initial_state);
  const [loader, setLoader] = useState(false);
  /*----------Api to create Bonus ------------*/
  const bonusCreate = (data) => {
    setLoader(true);
    client
      .post("/api/v1/bonus/create", data)
      .then((response) => {
        state.bonusData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        viewBonus("all", 0);
        return dispatch({
          type: "BONUS_CREATE",
          payload: state.bonusData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*--------------View list of created bonus structures -------------*/
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
  /*-----------------get bonus data using bonusId-----------------*/
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
  /*------------------api to update bonus structure---------------------------------*/
  const updateBonus = (data) => {
    setLoader(true);
    client.post("/api/v1/bonus/update", data).then((response) => {
      state.bonusData = response.data.data;
      setLoader(false);
      toast.info(response.data.message);
      viewBonus("all", 0);

      return dispatch({
        type: "BONUS_UPDATE",
        payload: state.bonusData,
      });
    });
  };

  const exportBonusList = () => {
    client
      .get("/api/v1/bonus/export", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response, "export excel ");
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "bonusList.xlsx";
        saveAs(blob, fileName);

        toast.info(response.data.message);
        return dispatch({
          type: "EXPORT_BONUS_LIST",
          payload: state.bonusListExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* bonus according to contract type*/
  const viewBonusByContarctType = (contractType, department, position) => {
    client
      .get(
        "/api/v1/bonus/view?contractType=" +
          contractType +
          "&department=" +
          department +
          "&position=" +
          position
      )
      .then((response) => {
        state.getBonusByContractType = response.data.data;
        return dispatch({
          type: "VIEW_BONUS_BY_CONTRACT",
          payload: state.getBonusByContractType,
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
        exportBonusList,
        viewBonusByContarctType,
        loader: loader,
        bonusListExport: state.bonusListExport,
        bonusData: state.bonusData,
        bonusDetails: state.bonusDetails,
        total: state.total,
        getBonusDetailsById: state.getBonusDetailsById,
        getBonusByContractType: state.getBonusByContractType,
      }}
    >
      {props.children}
    </BonusContext.Provider>
  );
};
