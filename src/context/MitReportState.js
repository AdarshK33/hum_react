import React, { createContext, useReducer, useState } from "react";
import MitReducer from "../reducers/MitReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
export const MitReportContext = createContext();
var fileDownload = require("js-file-download");
const initial_state = {
  mitReportStatus: false,
};

export const MitProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(MitReducer, initial_state);

  const getMitReport = (company, month, year) => {
    setLoader(true);
    client
      .post(
        "/api/v1/employee/reports/mit/download?company=" +
          company +
          "&month=" +
          month +
          "&year=" +
          year
      )
      .then((response) => {
        setLoader(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileName = "Report.xlsx";
        saveAs(blob, fileName);
        toast.info(`File downloaded successfully`);
      })
      .catch(() => {
        setLoader(false);
        toast.error(`No data found`);
      });
  };

  const setMitReportStatus = () => {
    return dispatch({
      type: "SET_MIT_REPORT_STATUS",
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
