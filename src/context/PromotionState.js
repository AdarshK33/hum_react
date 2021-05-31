import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import PromotionReducer from "../reducers/PromotionReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";


export const PromotionContext = createContext();
const initial_state = {
  promotionList: [], 
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
          10
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
  
  return (
    <PromotionContext.Provider
      value={{
        promotionListView,
        setLoader,
        total: state.total,
        promotionList: state.promotionList,
        loader: state.loader,
  
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};


// import React, { createContext, useReducer, useState } from "react";
// import ProbationReducer from "../reducers/ProbationReducer";
// import { client } from "../utils/axios";
// import { toast } from "react-toastify";

// export const ProbationContext = createContext();

// const initial_state = {
//   probationListData: [],
//   probationListByDueDays: [],
//   total: {},
//   empId: "",
//   probationData: {},
// };

// export const ProbationProvider = (props) => {
//   const [loader, setLoader] = useState(false);
//   const [state, dispatch] = useReducer(ProbationReducer, initial_state);

//   const ProbationListView = (days, key, pageNumber) => {
//     setLoader(true);
//     client
//       .get(
//         "/api/v1/probation/view?days=" +
//           days +
//           "&key=" +
//           key +
//           "&page=" +
//           pageNumber +
//           "&size=10"
//         // "/api/v1/probation/view?key=" + key + "&page=" + pageNumber + "&size=10"
//         // " /api/v1/promotion/view?key=all&page=0&size=10"
//       )
//       .then((response) => {
//         state.probationListData = response.data.data.data;
//         state.total = response.data.data.total;
//         setLoader(false);
//         console.log(state.total);
//         console.log(response);

//         return dispatch({
//           type: "PROBATION_LISTING",
//           payload: state.probationListData,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const ViewProbationDataById = (employeeId) => {
//     setLoader(true);
//     client
//       .get("/api/v1/probation/view/" + employeeId)
//       .then((response) => {
//         state.probationData = response.data.data;

//         setLoader(false);
//         console.log("--->", state.probationData);
//         console.log(response);

//         return dispatch({
//           type: "PROBATION_DATA_BY_ID",
//           payload: state.probationData,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const dueDaySearchByDays = (days) => {
//     setLoader(true);
//     client
//       .get("/api/v1/probation/search?days=" + days)
//       .then((response) => {
//         state.probationListData = response.data.data.data;
//         state.total = response.data.data.total;
//         setLoader(false);
//         console.log(state.probationListData);
//         console.log("duesearch", response);

//         return dispatch({
//           type: "PROBATION_LISTING",
//           payload: state.probationListData,
//         });

//         // return dispatch({
//         //   type: "PROBATION_LISTING_BY_DUE",
//         //   payload: state.probationListByDueDays,
//         // });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const changeEmpId = (employeeId) => {
//     setLoader(true);
//     state.empId = employeeId;
//     setLoader(false);
//     return dispatch({
//       type: "EMP_ID",
//       payload: state.empId,
//     });
//   };
//   return (
//     <ProbationContext.Provider
//       value={{
//         ProbationListView,
//         dueDaySearchByDays,
//         changeEmpId,
//         ViewProbationDataById,
//         probationData: state.probationData,
//         empId: state.empId,
//         probationListByDueDays: state.probationListByDueDays,
//         probationListData: state.probationListData,
//         total: state.total,
//         loader: loader,
//       }}
//     >
//       {props.children}
//     </ProbationContext.Provider>
//   );
// };