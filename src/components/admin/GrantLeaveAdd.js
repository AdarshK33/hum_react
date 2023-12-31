import React, { useState, useContext, Fragment, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { AdminContext } from "../../context/AdminState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select'

const GrantLeaveAdd = (props) => {



    const [employeeId, setEmployeeId] = useState('');
    const [numOfDays, setNumOfDays] = useState('');
   /*  const [year, setYear] = useState(''); */
    const [successMsg, setSuccessMsg] = useState("");
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState('')
    const { viewGrantLeave, grantLeaveView, createLeaveForSameEmp, createGrantLeave, CostCenter, costCenterList, employeeIdData, employeeIdList } = useContext(AdminContext);

    var year = new Date().getFullYear()

    const setCostCenterHandler = (options) => {
        let data1 = options !== null ? options.value : ''
        setCostCenter(data1)
        employeeIdData(data1)
        console.log("data1", data1)
    }
    const setEmployeeCostCenterHandler = (e) => {
        let data2 = e.target.value
        setEmployeeCostCenter(data2)
        console.log("data2", data2)
    }
    useEffect(() => {
        CostCenter()
        viewGrantLeave()
    }, [])

    const setClear = () => {
        setEmployeeId('')
        setNumOfDays('')
        setSuccessMsg('')
    }

    const callTimer = () => {
        const setModal = props.handleClose;
        setModal()
    }
    const clearAndClose = () => {
        props.handleClose();
    }

    const onSubmit = (event, props) => {
        event.preventDefault();
        clearAndClose();
        let empList = grantLeaveView;
        // let flag = 0;
        // for (let i = 0 ; i<empList.length ; i++){
        //     if(empList[i].empId === employeeCostCenter){
        //         flag = 1;
        //     }
        // }

        const addGrantLeave = {
            leaveId: 1,
            grantLeaveId: 0,
            numOfDays,
            empId: employeeCostCenter,
            year
        }
        let result = {};
        // if(flag === 0){
             result = createGrantLeave(addGrantLeave)
            .then((result) => {
                console.log("api response===", result.data.message);
                toast.info(result.data.message);
                setTimeout(() => {
                    callTimer();
                    setClear();
                }, 2000);
                viewGrantLeave();
            })
            .catch((error) => {
                alert(" In error catch ", error);
            })
        // }else {
        //      result = createLeaveForSameEmp(addGrantLeave)
        //     .then((result) => {
        //         console.log("api response===", result.data.message);
        //         toast.info(result.data.message);
        //         setTimeout(() => {
        //             callTimer();
        //             setClear();
        //         }, 2000);
        //         viewGrantLeave();
        //     })
        //     .catch((error) => {
        //         alert(" In error catch ", error);
        //     })
        // }
        
        console.log(result, "in competent");
        
    }


    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title>Grant Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group md">
                                            <label htmlFor="exampleFormControlInput1"> Select Cost Center</label>
                                            {/* <select
                                                className="form-control"
                                                required
                                                onChange={(e) => setCostCenterHandler(e)} >
                                                <option value="">Select Cost Center</option>
                                                {costCenterList !== null && costCenterList !== undefined
                                                 && costCenterList.map((item, i) => {
                                                    return (
                                                        <option key={item.costCenterId} value={item.costCentreName}>
                                                            {item.costCentreName}</option>

                                                    );
                                                })}
                                            </select> */}
                                            <Select
                                                name="filters"
                                                placeholder="Select Cost Center"
                                                /* value={costCenter} */
                                                style={{ fontSize: "0.8rem" }}
                                                options={costCenterList !== null ?
                                                    costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                                                onChange={setCostCenterHandler}
                                                required isSearchable />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group md">
                                            <label htmlFor="exampleFormControlInput1"> Select Employee</label>

                                            <select
                                                className="form-control"
                                                required
                                                onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                                <option value="">Select Employee</option>
                                                {employeeIdList !== null && employeeIdList.map((item, i) => {
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
                                            <label htmlFor="exampleFormControlInput1">Number of days</label>

                                            <input type="number" className="form-control digit" required min='1'
                                            onChange={(e) => setNumOfDays(e.target.value)} value={numOfDays} placeholder="Number of days" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Year</label>
                                            <input type="number" placeholder="YYYY" className="form-control digit" required /* onChange={(e) => setYear(e.target.value)} */ 
                                            value={year} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="myclass mb-2 mr-2" type="submit" value="Submit" >Save</button>
                        <button className="myclass mb-2 mr-2" onClick={() => { clearAndClose() }}>Close</button>
                        <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
                    </form>
                </Modal.Body>

            </Modal>
        </Fragment>

    )
}

export default GrantLeaveAdd;
