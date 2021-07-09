import React, { useContext, useEffect } from "react";
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
    <>
      {loader ? (
        <LoaderIcon />
      ) : (
        <>
          <div className="font-weight-bold mb-4">
            Date: {moment().format("DD-MM-YYYY")}
          </div>
          <div className="font-weight-bold">To</div>
          <div className="font-weight-bold">{transferData.employeeName}</div>
          <div className="font-weight-bold">
            {transferData.currentEmployeeId}
          </div>
          <div className="font-weight-bold my-5">
            Dear {transferData.employeeName}
          </div>

          <div className="mb-4">
            This is bring to your kind notice that your position has been
            changes to {transferData.currentPosition} and working location to{" "}
            {transferData.currentLocationName} effective from{" "}
            {transferData.promotedJoiningDate}
          </div>

          <div className="mb-4">
            All the rules mentioned in your appointment letter will remain
            unchanged
          </div>

          <div className="mb-4">Decathlon Sports India Pvt Ltd</div>
        </>
      )}
    </>
  );
};

export default TransferInitationLetter;
