import React, { useContext, useEffect } from "react";
import { PayrollContext } from "../../context/PayrollState";
import MyPayroll from "./MyPayroll";
import { AppContext } from "../../context/AppState";

const EmpPayroll = (props) => {
  const { setManagerFlag, setEmployeeId } = useContext(PayrollContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  useEffect(() => {
    if (fetchemployeeData && Object.keys(fetchemployeeData).length) {
      setEmployeeId(fetchemployeeData.employeeId);
      setManagerFlag(false);
    }
  }, []);

  return <MyPayroll />;
};
export default EmpPayroll;
