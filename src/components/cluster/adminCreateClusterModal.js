import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { RosterContext } from "../../context/RosterState";
const AdminCreateClusterModal = (props) => {


    const [clusterName, setClusterName] = useState("");
    const [description, setDescription] = useState("");
    const [clusterLeader, setClusterLeader] = useState('');
    const [clustertButton, setClusterButton] = useState(false);
    const [errormsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [sportsList, setSportsList] = useState([])
    const [employee, setEmployee] = useState([])
    const [costCenterName, setCostCenterName] = useState('');

    const setClear = () => {
        setClusterName('')
        setDescription('')
        setClusterLeader('')
        setClusterButton('')
        setErrorMsg('')
        setSuccessMsg('')
        setSportsList('');
        setCostCenterName()
        setSuccessMsg('');
        setEmployee('')

    }



    const { addCluster, viewSports, sportsNames, viewCluster, viewManagerByCostCenterList,
        callClusterLeadersList, callClusterEmployeesList, viewManagerByCostCenter,
        callClusterEmployees, callClusterLeaders,
    } = useContext(ClusterContext);
    const { user, } = useContext(AppContext);
    const { costCenter, costCenterList } = useContext(RosterContext);
    useEffect(() => {
        viewSports()
    }, [])

    useEffect(() => {
        costCenter()
        if (user.loginType !== "1" || user.loginType !== "9" || user.loginType !== "3" || user.loginType !== "7" ||
            user.additionalRole !== "1" || user.additionalRole !== "9" || user.additionalRole !== "3" || user.additionalRole !== "7") {
            setCostCenterName(user.costCentre)
        }
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const newCluster = {
            clusterId: 0,
            clusterLeader,
            clusterName,
            description,
            storeId: costCenterName,
            sportIds: sportsList.map((e) => e.sportId),
            employeeIds: employee.map((e) => e.employeeId)
        }
        const result = addCluster(newCluster)
            .then((result) => {
                //   console.log("api response===", result.data.message);

                toast.info(result.data.message);
                setTimeout(() => {
                    callTimer();
                }, 1000);
                viewCluster()
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




    const getCostCenterName = (e) => {
        let data = e.target.value
        setCostCenterName(data)
        viewManagerByCostCenter(data)
    }

    const getEmployeeId = (e) => {
        let data = e.target.value;
        alert(data);
        callClusterEmployees(costCenterName, data)
        callClusterLeaders(costCenterName, data)
    }


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



                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Select cost center</label>
                                    <select
                                        className="form-control"
                                        required
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Select Manager</label>
                                    <select
                                        className="form-control"
                                        required
                                        onChange={(e) => getEmployeeId(e)}
                                    >
                                        <option value="">Select Manager</option>

                                        {viewManagerByCostCenterList !== null
                                            && viewManagerByCostCenterList.map((e, i) => {
                                                return (
                                                    <option key={i + 1} value={e.employeeId}>{e.firstName}</option>)
                                            })}

                                    </select>
                                </div>
                            </div>
                        </div>

                        <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px", marginLeft: "5px" }}>{errormsg}</h6>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1"> Select Employee</label>
                                    <Multiselect

                                        placeholder="Select Employee"
                                        options={callClusterEmployeesList}
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
                                        {callClusterLeadersList !== null
                                            && callClusterLeadersList.map((e, i) => {
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



                    </form>
                </Modal.Body>

            </Modal>
        </Fragment>
    )
}

export default AdminCreateClusterModal





