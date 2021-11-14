import React, { createContext, useReducer, useState } from "react";
import MitReducer from "../reducers/MitReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initialState = {
  mitReportStatus: false,
};

export const MitReportContext = createContext();

export const MitProvider = (props) => {
  const [state, dispatch] = useReducer(MitReducer, initialState);
  const [loader, setLoader] = useState(false);

  const getMitReport = (company, month, year) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/reports/mit/download?company=" +
          company +
          "&month=" +
          month +
          "&year=" +
          year,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        console.log("mit response", response);
        setLoader(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileName = `${company}_Report.xlsx`;
        saveAs(blob, fileName);
        toast.info(`${company} Report downloaded successfully`);
        return dispatch({
          type: "FETCH_MIT_REPORT",
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
