import React, { useState, useContext, Fragment, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { AdminContext } from "../../context/AdminState";

const GrantLeaveAdd = (props) => {



    const [numOfDays, setNumOfDays] = useState('');
    const [year, setYear] = useState('');
    const [successMsg, setSuccessMsg] = useState("");
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState('')
    const { viewGrantLeave, createGrantLeave, CostCenter, costCenterList, employeeIdData, employeeIdList } = useContext(AdminContext);

    const setCostCenterHandler = (e) => {
        let data1 = e.target.value
        setCostCenter(data1)
        console.log("data1", data1)
    }
    const setEmployeeCostCenterHandler = (e) => {
        let data2 = e.target.value
        setEmployeeCostCenter(data2)
        console.log("data2", data2)
    }
    useEffect(() => {
        CostCenter()
    }, [])
    
    useEffect(() => {
        employeeIdData(costCenter)
    }, [costCenter])



    const setClear = () => {
        setNumOfDays('')
        setYear('')
        setSuccessMsg('')
    }

    const callTimer = () => {
        const setModal = props.handleClose;
        setModal()
    }
    const clearAndClose = () => {
        props.handleClose();
    }

    const onSubmit = (event) => {
        event.preventDefault();


        const addGrantLeave = {
            leaveId: 1,
            grantLeaveId: 0,
            numOfDays,
            empId: employeeCostCenter,
            year
        }
        const result = createGrantLeave(addGrantLeave)
            .then((result) => {
                console.log("api response===", result.data.message);

                setSuccessMsg(result.data.message);
                setTimeout(() => {
                    callTimer();
                    setClear();
                }, 4000);
                viewGrantLeave();
            })
            .catch((error) => {
                alert(" In error catch ", error);
            })
        console.log(result, "in competent");
    }


    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title >Grant Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"> Select Cost Center</label>
                                            <select
                                                className="form-control"
                                                style={{fontSize:"0.8rem"}}
                                                required
                                                onChange={(e) => setCostCenterHandler(e)}>
                                                <option value="">Select Cost Center</option>
                                                {costCenterList.map((item, i) => {
                                                    return (
                                                        <option key={item.costCenterId} value={item.costCentreName}>
                                                            {item.costCentreName}</option>

                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"> Select Employee</label>

                                            <select
                                                className="form-control"
                                                required
                                                style={{fontSize:"0.8rem"}}
                                                onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                                <option value="">Select Employee</option>
                                                {employeeIdList.map((item, i) => {
                                                    return (
                                                        <option key={item.employeeId} value={item.employeeId}>
                                                            {item.firstName}-{item.employeeId}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Number Of Days</label>

                                            <input type="number" style={{fontSize:"0.8rem"}} className="form-control digit" placeholder="Number Of Days" required onChange={(e) => setNumOfDays(e.target.value)} value={numOfDays} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Year</label>
                                            <input type="number"  style={{fontSize:"0.8rem"}} placeholder="YYYY" min="2019" max="2021" className="form-control digit" required onChange={(e) => setYear(e.target.value)} value={year} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mb-2 mr-2" type="submit" value="Submit">Save</button>
                        <button className="btn btn-primary mb-2 ml-2" onClick={() => { clearAndClose() }}>Close</button>
                        <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
                    </form>
                </Modal.Body>

            </Modal>
        </Fragment>

    )
}

export default GrantLeaveAdd;