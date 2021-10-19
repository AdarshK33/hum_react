import React, { Fragment, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Employee360Context } from "../../context/Employee360State";

const ViewTheLetter = ({ DocName }) => {
  const { SetLetterView } = useContext(Employee360Context);
  const [show, setShow] = useState(true);

  // const show = true;
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  console.log("console.log(check, e);", DocName, show);

  return (
    <Fragment>
      {DocName !== null && DocName !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {DocName !== "" && DocName !== null && DocName !== undefined ? (
              <div>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={
                    // "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                    "http://humine-application.s3-website.ap-south-1.amazonaws.com/humine_dev/" +
                    DocName
                  }
                />
              </div>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ViewTheLetter;
