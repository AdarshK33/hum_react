import React, { useReducer, createContext, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ModuleReportReducer from "../reducers/ModuleReportReducer";

const initialState = {
  reportStatus: false,
};

export const ModuleReportContext = createContext();

export const ModuleReportProvider = (props) => {
  const [state, dispatch] = useReducer(ModuleReportReducer, initialState);
  const [loader, setLoader] = useState(false);

  const getModuleReport = (reportData) => {
    setLoader(true);
    client
      .post("/api/v1/employee/reports/download", reportData.apiInfo, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        setLoader(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileName = `${reportData.fileName}.xlsx`;
        saveAs(blob, fileName);
        toast.info(`${reportData.fileName} downloaded successfully!`);
        return dispatch({
          type: "FETCH_REPORT",
        });
      })
      .catch(() => {
        setLoader(false);
        toast.error(`No data found in ${reportData.fileName}`);
        return dispatch({
          type: "FETCH_REPORT_ERR",
        });
      });
  };

  const setReportStatus = () => {
    return dispatch({
      type: "SET_REPORT_STATUS",
    });
  };

  return (
    <ModuleReportContext.Provider
      value={{
        loader,
        getModuleReport,
        reportStatus: state.reportStatus,
        setReportStatus,
      }}
    >
      {props.children}
    </ModuleReportContext.Provider>
  );
};
