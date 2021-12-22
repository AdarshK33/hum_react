import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { SeparationContext } from "../../context/SepearationState";

const ViewTheLetter = ({ DocName, Name }) => {
  const { SetLetterView } = useContext(SeparationContext);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");

  // const show = true;
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  useEffect(() => {
    setName(Name);
  }, [Name]);
  console.log("console.log(check, e);", DocName, name, show);

  return (
    <Fragment>
      {DocName !== null && DocName !== undefined && name !== "" ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {DocName !== "" && DocName !== null && DocName !== undefined ? (
              <div>
                {name === "PDF" ? (
                  <iframe
                    src={
                      process.env.REACT_APP_S3_URL +
                      DocName +
                      "#toolbar=0& navpanes=0"
                    }
                    style={{ width: "100%", height: "900px" }}
                    frameborder="0"
                  ></iframe>
                ) : (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={
                      // "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                      // "http://humine-application.s3-website.ap-south-1.amazonaws.com/humine_dev/" +
                      process.env.REACT_APP_S3_URL + DocName
                    }
                  />
                )}
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
