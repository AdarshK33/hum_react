import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import { TransferContext } from "../../../context/TransferState";
import LoaderIcon from "../../Loader/LoaderIcon";

const TransferInitationLetter = ({ transferId }) => {
  const { getTransferData, transferData, loader } = useContext(TransferContext);

  useEffect(() => {
    if (transferId !== null && transferId !== undefined && transferId !== "") {
      getTransferData(transferId);
    }
  }, [transferId]);

  return (
    <Fragment>
      {loader ? (
        <LoaderIcon />
      ) : (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> TRANSFER LETTER</h5>
          <p>To,</p>
          <p>Name:{transferData.employeeName}</p>
          <p>EmployeeId: {transferData.currentEmployeeId}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{transferData.employeeName},</b>{" "}
            </p>

            <p>
              This is bring to your kind notice that your position has been
              changes to {transferData.currentPosition} and working location to{" "}
              {transferData.currentLocationName} effective from{" "}
              {transferData.promotedJoiningDate}.
              <br />
              <br />
              All the rules mentioned in your appointment letter will remain
              unchanged.
            </p>
            <p className="mt-5 ">
              <b>For Decathlon Sports India India Pvt Ltd,</b>
            </p>
            <div className="float-right "></div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TransferInitationLetter;
