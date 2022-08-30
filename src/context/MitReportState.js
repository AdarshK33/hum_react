import React, { createContext, useReducer, useState } from "react";
import MitReducer from "../reducers/MitReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initialState = {
  mitReportStatus: false,
  mitReport: {},
};

export const MitReportContext = createContext();

export const MitProvider = (props) => {
  const [state, dispatch] = useReducer(MitReducer, initialState);
  const [loader, setLoader] = useState(false);

  const getMitReport = (company, month, year, monthName) => {
    setLoader(true);
    console.log("company",company)
//     var companyName = null
//     if(company === "PRODIN"){
// companyName = "Prodin Sporting Pvt Ltd"
//     }else if(company === "INDECA"){
//       companyName = "Indeca Sporting Goods Pvt Ltd"
//     }else{
//       companyName = company
//     }
    client
      .get(
        "/api/v1/employee/reports/mit/download?company=" +
          company +
          "&month=" +
          month +
          "&year=" +
          year,
        { responseType: "arraybuffer" }
      )
      .then((response) => {
        console.log(response, "reponse excel");
        setLoader(false);

        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = `${monthName} Report.xlsx`;
        saveAs(blob, fileName);
        toast.info(`File downloaded successfully`);
        return dispatch({
          type: "MIT_REPORT_DOWNLOAD",
          payload: state.mitReport,
        });
      })
      .catch(() => {
        setLoader(false);
        toast.error(`No data found`);
      });
  };

  const setMitReportStatus = () => {
    return dispatch({
      type: "SET_MIT_REPORT_STATUS",
      payload: state.mitReportStatus,
    });
  };

  //   const getMitReport = (company, month, year) => {
  //     setLoader(true);
  //     client
  //       .post(
  //         "/api/v1/employee/reports/mit/download?company=" +
  //           company +
  //           "&month=" +
  //           month +
  //           "&year=" +
  //           year,
  //         {
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((response) => {
  //         setLoader(false);
  //         var blob = new Blob([response.data], {
  //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //         });
  //         var fileName = "Report.xlsx";
  //         saveAs(blob, fileName);
  //         toast.info(`File downloaded successfully`);
  //       })
  //       .catch(() => {
  //         setLoader(false);
  //         toast.error(`No data found`);
  //       });
  //   };

  //   const setMitReportStatus = () => {
  //     return dispatch({
  //       type: "SET_MIT_REPORT_STATUS",
  //     });
  //   };

  return (
    <MitReportContext.Provider
      value={{
        loader,
        getMitReport,
        setMitReportStatus,
        mitReportStatus: state.mitReportStatus,
      }}
    >
      {props.children}
    </MitReportContext.Provider>
  );
};
