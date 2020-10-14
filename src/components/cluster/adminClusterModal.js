import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { RosterContext } from "../../context/RosterState";
import { AdminContext } from "../../context/AdminState";
const AdminClusterModal = (props) => {


    const [clusterName, setClusterName] = useState("");
    const [description, setDescription] = useState("");
    const [clusterLeader, setClusterLeader] = useState('');
    const [clustertButton, setClusterButton] = useState(false);
    const [errormsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [sportsList, setSportsList] = useState([])
    const [employee, setEmployee] = useState([])
    const [costCenterName, setCostCenterName] = useState('');
    const [costCenterForAdmin, setCostCenterForAdmin] = useState()

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
        selectClusterLeader()
        selectEmployeeForCluster()
    }



    const { addCluster, viewClusterForAdmin, viewSports, sportsNames, clusterLeaderNames,
        selectClusterLeader, selectEmployeeForCluster } = useContext(ClusterContext);
    const { user, } = useContext(AppContext);
    const { costCenter, costCenterList } = useContext(RosterContext);
    const { employeeIdData, employeeIdList } = useContext(AdminContext);
    useEffect(() => {
        viewSports()
        costCenter()
    }, [])

    useEffect(() => {


        if (user.loginType !== "1" && user.loginType !== "9" && user.additionalRole !== "1" && user.additionalRole !== "9") {
            setCostCenterName(user.costCentre)
        }
    }, [user.costCentre, user.loginType]);



    const setCostCenterHandler = (e) => {
        let data1 = e.target.value
        setCostCenterForAdmin(data1)
        employeeIdData(data1)
        console.log("data1", data1)
        selectClusterLeader(data1)
    }





    const onSubmit = (event) => {
        event.preventDefault();
        const newCluster = {
            clusterId: 0,
            clusterLeader,
            clusterName,
            description,
            storeId: user.costCentre,
            sportIds: sportsList.map((e) => e.sportId),
            employeeIds: employee.map((e) => e.employeeId)
        }

        // console.log("^^^^" + JSON.stringify(newCluster));
        const result = addCluster(newCluster)
            .then((result) => {
                //   console.log("api response===", result.data.message);

                toast.info(result.data.message);
                setTimeout(() => {
                    callTimer();
                }, 1000);
                viewClusterForAdmin(user.costCentre);
            })
            .catch((error) => {
                alert(" In error catch ", error);
            })
        console.log(result, "in competent");
    }


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



    const handleMultiChange = (option) => {
        setClusterButton(false)
        setSportsList(option)
        setErrorMsg(false)
    }


    const handleMultiChange1 = (options) => {
        setEmployee(options)
        setClusterButton(false)
        setErrorMsg(false)
    }

    //Timer to close modal 
    const callTimer = () => {
        const setModal = props.handleClose;
        setClear()
        setModal()
    }
    const clearAndClose = () => {
        setClear();
        props.handleClose();
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title>Create Cluster</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1"> Select Sports</label>


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

                                    <input type="text" style={{ fontSize: "0.8rem" }} className="form-control" placeholder="Cluster Name" required value={clusterName} onChange={onChangeHandler} />

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Cluster Description</label>

                                    <input type="text" style={{ fontSize: "0.8rem" }} className="form-control digit" placeholder="Cluster Description" required value={description} onChange={onDescprtion} />
                                </div>
                            </div>
                        </div>

                        {(() => {
                            if (user.loginType === "1" || user.loginType === "9" || user.additionalRole === "1" || user.additionalRole === "9") {
                                return (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlInput1">Select cost center</label>
                                                <select
                                                    value={costCenterName}
                                                    className="form-control"
                                                    required
                                                    onChange={(e) => setCostCenterHandler(e)}
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

                        <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px", marginLeft: "5px" }}>{errormsg}</h6>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1"> Select Employee</label>
                                    <Multiselect
                                        placeholder="Select Employee"
                                        options={employeeIdList}
                                        value={employee}
                                        displayValue="firstName"
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
                                        style={{ fontSize: "0.8rem" }}
                                        onChange={clusterLeaderSelect}>
                                        <option value="">Select Cluster Leader</option>
                                        {clusterLeaderNames !== null
                                            && clusterLeaderNames.map((e, i) => {
                                                return (

                                                    <option key={e.employeeId} value={e.employeeId}>
                                                        {e.firstName}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="myclass mb-2 mr-2" type="submit" disabled={clustertButton} value="Submit">Save</button>
                        <button className="myclass mb-2 mr-2" onClick={() => { clearAndClose() }}>Close</button>


                        <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
                    </form>
                </Modal.Body>

            </Modal>
        </Fragment>
    )
}

export default AdminClusterModal




