import React, { Fragment, useState, useContext ,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { DSICharterContext } from "../../context/DSICharterState";

const ViewTheLetter = ({ DocName, Name }) => {
  const { SetLetterView,employeeProfileData ,ViewEmployeeProfile} = useContext(DSICharterContext);
  const [show, setShow] = useState(true);

  // const show = true;
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  useEffect(() => {
    ViewEmployeeProfile();
  }, []);
  console.log("console.log(check, e);", DocName,employeeProfileData, show);

  return (
    <Fragment>
      {DocName !== null && DocName !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line">
            <div>
            <b>Name :{employeeProfileData.firstName}</b><br/>
            <b>Employee ID :{employeeProfileData.employeeId}</b>
            </div>
          </Modal.Header>
          <Modal.Body>
         

            {DocName !== "" && DocName !== null && DocName !== undefined ? (
                  <iframe
                    src={
                      process.env.REACT_APP_S3_URL +
                      DocName +
                      "#toolbar=0& navpanes=0"
                    }
                    style={{ width: "100%", height: "900px" }}
                    frameborder="0"
                  ></iframe>
                ) 
            : (
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
