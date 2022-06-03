import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { PermissionContext } from "../../context/PermissionState";


const ViewTheLetter = ({ DocName, Name }) => {
  const { SetLetterView } = useContext(EmployeeProfileContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [render ,setRender] = useState(false)

  // const show = true;
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  useEffect(() => {
    setName(Name);
  }, [Name]);
  console.log("console.log(check, e);", DocName, name, show);
  console.log(imageViewData,"imageViewData my profile")

  return (
    <Fragment>
      {DocName !== null && DocName !== undefined && name !== "" ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {DocName !== "" && DocName !== null && DocName !== undefined &&
            imageViewData !== undefined &&
            Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>
                {name === "PDF" ? (
                  // <iframe
                  //   src={
                  //     process.env.REACT_APP_S3_URL +
                  //     DocName +
                  //     "#toolbar=0& navpanes=0"
                  //   }
                  //   style={{ width: "100%", height: "900px" }}
                  //   frameborder="0"
                  // ></iframe>
                  <iframe
                  src={
                    imageViewData.data ? imageViewData.data + "#toolbar=0& navpanes=0": ""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
                ) : (
                  // <img
                  //   style={{ width: "100%", height: "100%" }}
                  //   src={
                  //     // "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                  //     // "http://humine-application.s3-website.ap-south-1.amazonaws.com/humine_dev/" +
                  //     process.env.REACT_APP_S3_URL + DocName
                  //   }
                  // />
                  <img
                  style={{ width: "100%", height: "100%" }}
                  src={imageViewData.data ? imageViewData.data : ""}
                />
                )}
              </div>
            ) : (
              "File does not exist"
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
