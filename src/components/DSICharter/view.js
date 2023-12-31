import React, { Fragment, useState, useContext ,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { DSICharterContext } from "../../context/DSICharterState";
import { PermissionContext } from "../../context/PermissionState";
import { AppContext } from "../../context/AppState";

const ViewTheLetter = ({ DocName, Name,EmployeeId }) => {
  const { SetLetterView,employeeProfileData ,ViewEmployeeProfile} = useContext(DSICharterContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);
  const { getUserInfo,fetchEmployeeProfile, user } = useContext(AppContext);
  const [show, setShow] = useState(true);

  // const show = true;
  useEffect(()=>{
ImageView(DocName,EmployeeId)
  },[DocName])
  const handleClose = () => {
    setShow(false);
    SetLetterView(false);
  };
  useEffect(() => {
    ViewEmployeeProfile();
    fetchEmployeeProfile();
  }, []);
  console.log("console.log(check, e);", DocName,employeeProfileData, show);
  const handleDate = (data)=>{
    let current = new Date(data)
  let cDate = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
  let hours = current.getHours();
  let am_pm = (hours >= 12) ? "PM" : "AM";
  let minutes = current.getMinutes()<10?("0"+current.getMinutes()):current.getMinutes()
  if(hours >= 12){
      hours -=12;
  }
  
  let cTime = hours==0?("12" + ":" + minutes +"  "+ am_pm):(hours + ":" + minutes +"  "+ am_pm)
  let dateTime = cDate;
  return dateTime
  }
  return (
    <Fragment>
      {DocName !== null && DocName !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line">
            {/* <div>
            <b>Name :{employeeProfileData.firstName}</b><br/>
            <b>Employee ID :{employeeProfileData.employeeId}</b><br/>
            <b>Accepted Date :{handleDate(Name.auditField.updatedDate)}</b>
            </div> */}
          </Modal.Header>
          <Modal.Body>
         

            {DocName !== "" && DocName !== null && DocName !== undefined && 
            imageViewData !== undefined &&
            Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>
                  {/* <iframe
                    src={
                      process.env.REACT_APP_S3_URL +
                      DocName +
                      "#toolbar=0& navpanes=0"
                    }
                    style={{ width: "100%", height: "900px" }}
                    frameborder="0"
                  ></iframe> */}
                    <iframe
                    src={
                      imageViewData.data?imageViewData.data +
                      "#toolbar=0& navpanes=0":"" 
                      
                    }
                    style={{ width: "100%", height: "900px" }}
                    frameborder="0"
                  ></iframe>
                  </div>
                ) 
            : (
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
