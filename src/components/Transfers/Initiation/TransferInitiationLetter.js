import React, { Fragment, useContext, useEffect,useRef,useState} from "react";
import moment from "moment";
import { TransferContext } from "../../../context/TransferState";
import LoaderIcon from "../../Loader/LoaderIcon";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";

const TransferInitationLetter = ({ transferId,props }) => {
  const { getTransferData, transferData, loader, regularResponse,
    ExportPDFandUploadRegular,
    uploadRegularTransferForm, } = useContext(TransferContext);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);

  const inputRef = useRef(null);
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
            <div id="regular" ref={inputRef}>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          {/* <h5 className="text-center"> TRANSFER LETTER</h5> */}
          <p>To,</p>
          <p>Name:{transferData.employeeName}</p>
          <p>Employee ID: {transferData.currentEmployeeId}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{transferData.employeeName},</b>{" "}
            </p>

            <p>
              This is to bring to your kind notice that your position has been
              changed to <b>{transferData.promotedPosition}</b> and working
              location to <b>{transferData.promotedLocationName}</b> effective
              from{" "}
              <b>
                {transferData.promotedJoiningDate !== null &&
                transferData.promotedJoiningDate !== undefined
                  ? moment(new Date(transferData.promotedJoiningDate)).format(
                      "DD-MM-YYYY"
                    )
                  : ""}
              </b>
              .
              <br />
              <br />
              All the rules mentioned in your appointment letter will remain
              unchanged.
            </p>
            <p className="mt-5 ">
              <b> {transferData.currentCompany}</b>
            </p>
            {/* <Row>
              <Col sm="8">
                <p>Authorised Signatory</p>
              </Col>
            </Row> */}
            {/* <div className="float-right "></div> */}
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TransferInitationLetter;
