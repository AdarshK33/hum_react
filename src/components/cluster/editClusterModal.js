import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from "react-toastify";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import "react-toastify/dist/ReactToastify.css";
const EditClusterModal = (props) => {


  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [clusterLeader, setClusterLeader] = useState('');
  const [clusterId, setClusterId] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const [employee, setEmployee] = useState([])
  const [errormsg, setErrorMsg] = useState(false);
  const [sportsList, setSportsList] = useState([])
  const [clustertButton, setClusterButton] = useState(false);
  const [costCenterName, setCostCenterName] = useState('');
  const [status, setStatus] = useState(0);
  const [clusterLeaderName, setClusterLeaderName] = useState('')




  const setClear = () => {
    setClusterName('')
    setDescription('')
    setClusterLeader('')
    setClusterButton('')
    setErrorMsg('')
    setSuccessMsg('')
    setSportsList('');
    setSuccessMsg('');
    setEmployee('')
  }


  const { updateAdminEditCluster, getSingleCluster, viewSports, costCenterEmpAndMgrList, sportsNames, callClusterEmployees, callClusterLeaders
    , getSingleCluster1, getEmployeesNames } = useContext(ClusterContext);
  const { user } = useContext(AppContext);
  const { costCenter, costCenterList } = useContext(RosterContext);

  useEffect(() => {
    viewSports()
  }, [])

  useEffect(() => {
    setClusterName(getSingleCluster.clusterName)
    setDescription(getSingleCluster.description)
    setClusterLeader(getSingleCluster.clusterLeader)
    setStatus(getSingleCluster.status)
    setCostCenterName(props.shiftData.storeId)
  }, [props])

  useEffect(() => {
    setClusterId(props.clusterId)
  }, [props.clusterId])

  useEffect(() => {
    setSportsList(props.clusterData)
  }, [props.clusterData])


  useEffect(() => {
    setEmployee(props.clusterData1)
  }, [props.clusterData1])


  useEffect(() => {
    costCenter()
    if (user.loginType !== "1" || user.loginType !== "9" || user.loginType !== "3" || user.loginType !== "7" ||
      user.additionalRole !== "1" || user.additionalRole !== "9" || user.additionalRole !== "3" || user.additionalRole !== "7") {
      setCostCenterName(user.costCentre)
    }
  }, [user.costCentre, user.loginType]);


  const getCostCenterName = (e) => {
    let data = e.target.value
    setCostCenterName(data)
    callClusterEmployees(data, user.employeeId)
    callClusterLeaders(data, user.employeeId)
    //selectClusterLeader(data1)
  }


  //cost center name

  const onSubmit = (event) => {
    event.preventDefault();
    const validate = validation();
    const editCluster = {

      clusterId: getSingleCluster.clusterId,
      clusterLeader,
      clusterName: clusterName.trim(),
      description: description.trim(),
      storeId: costCenterName,
      sportIds: sportsList.map((e) => e.sportId),
      employeeIds: employee.map((e) => e.employeeId),
      status: status
    }
    if (validate) {
      updateAdminEditCluster(editCluster)

      props.handleEditClose()
    }
  }

  const validation = () => {
    let flag = true
    if (employee.length === 0) {
      toast.info("Select employee is mandatory")
      flag = false;
      return;
    }

    if (sportsList.length === 0) {
      toast.info("Select sports is mandatory")
      flag = false;
      return;
    }

    return flag;
  }



  const clusterLeaderSelect = event => {
    setClusterLeader(event.target.value);
    if (employee.length === 0) {
      setClusterButton(true)
      setErrorMsg("All the fields are required");
    }
    else {
      setClusterButton(false)

    }
  };

  const onChangeHandler = event => {
    setClusterName(event.target.value);
    if (sportsList.length === 0) {
      setClusterButton(true)
      setErrorMsg("All the fields are required");
    }
    else {
      setClusterButton(false)
      setErrorMsg(false)
    }
  };
  const onDescprtion = event => {
    setDescription(event.target.value);
    if (sportsList.length > 0) {
      setClusterButton(false)
      setErrorMsg(false)
    }
    else {
      setClusterButton(true)

    }
  };


  const handleMultiChange = (option) => {
    setClusterButton(false)
    setSportsList(option)
    console.log(sportsList);
    setErrorMsg(false)
  }

  const onRemove = (option) => {
    setSportsList(option)
    console.log(sportsList);
  }

  const handleMultiChange1 = (options) => {
    setEmployee(options)
    console.log("--------" + employee);
    setClusterButton(false)
    setErrorMsg(false)
  }


  const onRemoveEmployee = (options) => {
    setEmployee(options)
    console.log(employee);
  }




  //Timer to close modal 
  const callTimer = () => {
    const setModal = props.handleEditClose;
    setClear()
    setModal()
  }

  // edit api need to integrate 

  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleEditClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Edit Cluster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group" >
                  <label htmlFor="exampleFormControlInput1"> Select Sports</label>

                  <Multiselect
                    options={sportsNames}
                    value={sportsList}
                    defaultValue={getSingleCluster.sportId}
                    selectedValues={getSingleCluster1}
                    displayValue="sportName"
                    onRemove={onRemove}
                    onSelect={handleMultiChange}
                    isMulti
                  />

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput">Cluster Name</label>
                  <input type="text"
                    value={clusterName}
                    className="form-control"
                    defaultValue={getSingleCluster.clusterName}
                    required
                    onChange={onChangeHandler} />
                </div>
              </div>
            </div>

            <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px", marginLeft: "5px" }}>{errormsg}</h6>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Description</label>

                  <input type="text" className="form-control digit" required placeholder="Desc" defaultValue={getSingleCluster.description} value={description} onChange={onDescprtion} />
                </div>
              </div>
            </div>



            {(() => {
              if (user.loginType === "1" || user.loginType === "9" || user.loginType === "3" || user.loginType === "7" || user.additionalRole === "1" || user.additionalRole === "9" || user.additionalRole === "7" || user.additionalRole === "3") {
                return (
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Select Cost Center</label>
                        <select
                          value={costCenterName}
                          className="form-control"
                          required
                          defaultValue={props.shiftData.storeId}
                          onChange={(e) => getCostCenterName(e)}
                        >
                          <option value="">Select cost center</option>
                          {costCenterList.map((e, i) => {
                            return (
                              <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                          })}

                        </select>
                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            {/* <h3>{getSingleCluster.employeeIds}</h3> */}

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Employee</label>

                  <Multiselect
                    placeholder="Select Employee"
                    options={costCenterEmpAndMgrList}
                    value={employee}
                    selectedValues={getEmployeesNames}
                    displayValue="employeeName"
                    onRemove={onRemoveEmployee}
                    onSelect={handleMultiChange1}
                    isMulti
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Cluster Leader</label>
                  <select
                    className="form-control"
                    required
                    defaultValue={getSingleCluster.employeeId}
                    value={clusterLeader}
                    onChange={clusterLeaderSelect}>
                    <option selected>{getSingleCluster.clusterLeaderName}</option>
                    {costCenterEmpAndMgrList !== null && costCenterEmpAndMgrList.map((e, i) => {
                      return (

                        <option key={e.employeeId} value={e.employeeId}>
                          {e.firstName}&nbsp;{e.lastName}
                        </option>
                      );
                    })}

                  </select>
                </div>
              </div>
            </div>



            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Cluster Status</label>
                  <select
                    className="form-control"
                    value={status}
                    defaultValue={getSingleCluster.status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="0">Active</option>
                    <option value="1">Inactive</option>

                  </select>
                </div>
              </div>
            </div>

            <button className="myclass mb-2 mr-2" type="submit" disabled={clustertButton} value="Submit">Save</button>

            <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
          </form>
        </Modal.Body>

      </Modal>
    </Fragment >
  )
}

export default EditClusterModal
