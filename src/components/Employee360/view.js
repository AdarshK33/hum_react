import React, { Fragment, useState, useContext ,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { Employee360Context } from "../../context/Employee360State";
import { PermissionContext } from "../../context/PermissionState";


const ViewTheLetter = ({ DocName, Name }) => {
  const { SetLetterView } = useContext(Employee360Context);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const [show, setShow] = useState(true);
  useEffect(() => {
    ImageView(DocName)
  }, [DocName]);
  // const show = true;
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  console.log("console.log(check, e);", DocName, show);
console.log(imageViewData,"imageViewData")
  return (
    <Fragment>
      {DocName !== null && DocName !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {DocName !== "" && DocName !== null && DocName !== undefined &&
             imageViewData !== undefined &&
             Object.keys(imageViewData).length !== 0 &&imageViewData.data!=="File does not exist" ? (
              <div>
                {Name === "Code Of Conduct" || Name === "It Charter" ? (
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
                    imageViewData.data ? imageViewData.data +
                    "#toolbar=0& navpanes=0":""
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
                    src={imageViewData.data ? imageViewData.data:""}
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
