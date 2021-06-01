import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import PromotionReducer from "../reducers/PromotionReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";


export const PromotionContext = createContext();
const initial_state = {
  promotionList: [], 
  promotionEmployeeData:{},
  total: {},
  data: [],
};

export const PromotionProvider = (props) => {
  const [state, dispatch] = useReducer(PromotionReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const promotionListView = (key, page) => {
    console.log(key, page,"promotion ")
    setLoader(true);
    client
      .get(
        "/api/v1/promotion/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10,
          {
            headers: {
              'Authorization': "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1BSU4iLCJwaS5hdG0iOiI2In0.eyJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIl0sImNsaWVudF9pZCI6IkM2YTdiNjhkNTJhZDIxYzBkNTU0NmZiZWY3OGMwOTAzYTU1MTkwNDgwIiwiaXNzIjoiaWRwZGVjYXRobG9uLnByZXByb2Qub3JnIiwianRpIjoiOVR1VVdDblR6SyIsInN1YiI6IktOQUdBUjI2IiwidWlkIjoiS05BR0FSMjYiLCJvcmlnaW4iOiJjb3Jwb3JhdGUiLCJleHAiOjE2MjI0NTE3NTh9.yFXiQe7zXeA8rFlzXZbPaP5thK_Nl51_WhQf77UoDo__MSUIDNk7z6laqVhxr-d6NRG472sxNAaf9-Dj6-7Z03_NPCnTRt3nY-jppjQ27lyp0zPoaY8_8EmVz2-L7xl6bG_QWkd_1n0wPIWHtbAI4IvzrwIvwAa6riKksG-fp7HbP6-RH4KTTiMBfAVCbgVsnUAv-zstu8aILUfEe4YL_IDP_9XbYlV4Iw3WPDl_NW1LbDeNfIvrWvrMQr_ztvb7Y4pqrWon79lVnHp9xNap-Lx1djpkAd3RfZunzWgdO8d6xl33tcJC6JM_Mjro3faGPlvjeULzU7To_LVJNNpqYA"
            }
          }
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.promotionList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        return dispatch({
          type: "PROMOTION_LIST",
          payload: state.promotionList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewPromotionEmployeeById = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/promotion/view/" + employeeId)
      .then((response) => {
        state.promotionEmployeeData = response.data.data;

        setLoader(false);
        console.log("--->", state.promotionEmployeeData);
        console.log(response);

        return dispatch({
          type: "PROMOTION_EMPLOYEE_ID",
          payload: state.promotionEmployeeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <PromotionContext.Provider
      value={{
        promotionListView,
        ViewPromotionEmployeeById,
        setLoader,
        total: state.total,
        promotionList: state.promotionList,
        promotionEmployeeData:state.promotionEmployeeData,
        loader: state.loader,
  
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};

