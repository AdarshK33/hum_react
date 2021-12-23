import React, { useContext, useEffect } from "react";
import { PayrollContext } from "../../context/PayrollState";
import MyPayroll from "./MyPayroll";
import { AppContext } from "../../context/AppState";

const ManagerPayroll = (props) => {
  const { setManagerFlag, setEmployeeId } = useContext(PayrollContext);
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (user && Object.keys(user).length) {
      setEmployeeId("");
      setManagerFlag(true);
    }
  }, []);

  return <MyPayroll />;
};
export default ManagerPayroll;
