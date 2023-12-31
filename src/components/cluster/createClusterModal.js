import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ClusterContext } from "../../context/ClusterState";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { AppContext } from "../../context/AppState";
import { RosterContext } from "../../context/RosterState";
import { PermissionContext } from "../../context/PermissionState";

const CreateClusterModal = (props) => {
  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [clusterLeader, setClusterLeader] = useState("");
  const [clustertButton, setClusterButton] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [sportsList, setSportsList] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [costCenterName, setCostCenterName] = useState("");

  const setClear = () => {
    setClusterName("");
    setDescription("");
    setClusterLeader("");
    setClusterButton("");
    setErrorMsg("");
    setSuccessMsg("");
    setSportsList("");
    setCostCenterName();
    setSuccessMsg("");
    setEmployee("");
    props.handleClose();
  };

  const {
    updateAdminaddCluster,
    viewSports,
    sportsNames,
    callClusterLeadersList,
    callClusterEmployeesList,
    callClusterEmployees,
    callClusterLeaders,
  } = useContext(ClusterContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  const { costCenter, costCenterList } = useContext(RosterContext);
  useEffect(() => {
    viewSports();
    callClusterEmployees();
  }, []);

  useEffect(() => {
    costCenter();
    if (
      rolePermission !== "superCostCenterManager" ||
      rolePermission !== "costCenterManager" ||
      rolePermission !== "manager" ||
      rolePermission !== "admin"
    ) {
      setCostCenterName(fetchemployeeData.costCentre);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const validate = validation();
    const newCluster = {
      clusterId: 0,
      clusterLeader,
      clusterName: clusterName.trim(),
      description: description.trim(),
      storeId: costCenterName,
      sportIds: sportsList.map((e) => e.sportId),
      employeeIds: employee.map((e) => e.employeeId),
    };

    if (validate) {
      updateAdminaddCluster(newCluster);
      setClear();
      props.handleClose();
    }
  };
  const validation = () => {
    let flag = true;
    if (employee.length === 0) {
      toast.error("Select employee is mandatory");
      flag = false;
      return;
    }

    if (sportsList.length === 0) {
      toast.error("Select sports is mandatory");
      flag = false;
      return;
    }

    return flag;
  };

  const onChangeHandler = (event) => {
    setClusterName(event.target.value);
    if (sportsList.length === 0) {
      setClusterButton(true);
      setErrorMsg("All the fields are required");
    } else {
      setClusterButton(false);
      setErrorMsg(false);
    }
  };

  const onDescprtion = (event) => {
    setDescription(event.target.value);
    if (sportsList.length > 0) {
      setClusterButton(false);
      setErrorMsg(false);
    } else {
      setClusterButton(true);
    }
  };
  const clusterLeaderSelect = (event) => {
    setClusterLeader(event.target.value);
    if (employee.length === 0) {
      setClusterButton(true);
      setErrorMsg("All the fields are required");
    } else {
      setClusterButton(false);
    }
  };
  // const getCostCenterName = (e) => {
  //   let data = e.target.value
  //   setCostCenterName(data)
  //   callClusterEmployees(data, user.employeeId)
  //   callClusterLeaders(data, user.employeeId)
  // }
  const getCostCenterName = (options) => {
    let data = options !== null ? options.value : "";
    setCostCenterName(data);
    callClusterEmployees(data, fetchemployeeData.employeeId);
    callClusterLeaders(data, fetchemployeeData.employeeId);
  };

  const handleMultiChange = (option) => {
    setClusterButton(false);
    setSportsList(option);
    setErrorMsg(false);
  };

  const handleMultiChange1 = (options) => {
    setEmployee(options);
    setClusterButton(false);
    setErrorMsg(false);
  };

  const clearAndClose = () => {
    setClear();
    props.handleClose();
  };
  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Modal.Header>
          <Modal.Title>Create Cluster</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={setClear}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    {" "}
                    Select Sports
                  </label>

                  <Multiselect
                    required
                    placeholder="Select Sports"
                    options={sportsNames}
                    value={sportsList}
                    displayValue="sportName"
                    onSelect={handleMultiChange}
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Name</label>

                  <input
                    type="text"
                    style={{ fontSize: "0.8rem" }}
                    className="form-control"
                    placeholder="Cluster Name"
                    required
                    value={clusterName}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Cluster Description
                  </label>

                  <input
                    type="text"
                    style={{ fontSize: "0.8rem" }}
                    className="form-control digit"
                    placeholder="Cluster Description"
                    required
                    value={description}
                    onChange={onDescprtion}
                  />
                </div>
              </div>
            </div>

            {(() => {
              if (
                rolePermission == "superCostCenterManager" ||
                rolePermission == "costCenterManager" ||
                rolePermission == "manager" ||
                rolePermission == "admin"
              ) {
                return (
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Select Cost Center
                        </label>
                        {/* <select

                          className="form-control"
                          required
                          onChange={(e) => getCostCenterName(e)}
                        >
                          <option value="">Select Cost Center</option>
                          {costCenterList.map((e, i) => {
                            return (
                              <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                          })}

                        </select> */}
                        <Select
                          name="filters"
                          placeholder="Cost Center"
                          //value={costCenter1}
                          style={{ fontSize: "0.9rem" }}
                          options={
                            costCenterList !== null &&
                            costCenterList !== undefined
                              ? costCenterList.map((e) => ({
                                  label: e.costCentreName,
                                  value: e.costCentreName,
                                }))
                              : []
                          }
                          onChange={getCostCenterName}
                          required
                          isSearchable
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
            <h6
              style={{
                color: "red",
                fontFamily: "work-Sans, sans-serif",
                fontSize: "14px",
                marginLeft: "5px",
              }}
            >
              {errormsg}
            </h6>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    {" "}
                    Select Employee
                  </label>
                  <Multiselect
                    placeholder="Select Employee"
                    options={callClusterEmployeesList}
                    value={employee}
                    displayValue="employeeName"
                    onSelect={handleMultiChange1}
                    isMulti
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    {" "}
                    Cluster Leader
                  </label>

                  <select
                    className="form-control"
                    required
                    style={{ fontSize: "0.8rem" }}
                    onChange={clusterLeaderSelect}
                  >
                    <option value="">Select Cluster Leader</option>
                    {callClusterLeadersList !== null &&
                      callClusterLeadersList.map((e, i) => {
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

            <button
              className="myclass mb-2 mr-2"
              type="submit"
              disabled={clustertButton}
              value="Submit"
            >
              Save
            </button>
            <button
              className="myclass mb-2 mr-2"
              onClick={() => {
                clearAndClose();
              }}
            >
              Close
            </button>

            <h5>
              {successMsg.length !== 0 && (
                <div className="text-success">{successMsg}</div>
              )}
            </h5>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CreateClusterModal;
