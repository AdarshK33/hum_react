import React, { useState, useContext, Fragment, useEffect } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { AdminContext } from "../../context/AdminState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Select from 'react-select'

const GrantLeaveEdit = (props) => {



    //const [employeeId, setEmployeeId] = useState('');
    const [numOfDays, setNumOfDays] = useState('');
   /*  const [year, setYear] = useState(''); */
 
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [grantLeaveId, setGrantLeaveId] = useState('');
    const [count, setCount] = useState();
    const { viewGrantLeave, grantLeaveView, createLeaveForSameEmp, CostCenter, employeeIdData, employeeIdList } = useContext(AdminContext);

    var year = new Date().getFullYear()
    useEffect(() => {
        CostCenter()
        // viewGrantLeave()
        setCostCenter(props.editData.costCentre)
        setEmployeeCostCenter(props.editData.empId)
        setEmployeeName(props.editData.empName)
        setNumOfDays(props.editData.numOfDays)
        setCount(props.editData.numOfDays)
        setGrantLeaveId(props.editData.grantLeaveId)
        // employeeIdData()
    }, [props.editData])

    useEffect(() => {
    employeeIdData(props.editData.costCentre)
    },[props.editData.costCentre])

  /*   const setCostCenterHandler = (options) => {
        let data1 = options !== null ? options.value : ''
        setCostCenter(data1)
        employeeIdData(data1)
        console.log("data1", data1)
    } */
    const setCostCenterHandler = (e) => {
        let data1 = e.target.value
        setCostCenter(data1)
        console.log("data1", data1)
    }
    const setEmployeeCostCenterHandler = (e) => {
        setEmployeeCostCenter(e.target.value)
        console.log("data2", e.target.value)
    }
    useEffect(() => {
        CostCenter()
        viewGrantLeave()
    }, [])

    const setClear = () => {
        setCostCenter(props.editData.costCentre)
        setEmployeeCostCenter(props.editData.empId)
        setEmployeeName(props.editData.empName)
        setNumOfDays(props.editData.numOfDays)
        setCount(props.editData.numOfDays)
        setGrantLeaveId(props.editData.grantLeaveId)
    }

   
    const clearAndClose = () => {
        const setModal = props.handleEditClose;
        setModal()
    }

    const onSubmit = (event, props) => {
        event.preventDefault();
       
       // let empList = grantLeaveView;
        

        const addGrantLeave = {
            leaveId: 1,
            grantLeaveId: grantLeaveId,
            numOfDays,
            empId: employeeCostCenter,
            year
        }
        let result = {};
        
           if(numOfDays < 1){
            toast.info("Number of days should be greater than 0 ");
           }else if(count > numOfDays){
            toast.info("Number of days should be greater than " + count); 
           }else{
             result = createLeaveForSameEmp(addGrantLeave)
            .then((result) => {
                console.log("api response===", result.data.message);
                toast.info(result.data.message);
               /*  setTimeout(() => {
                    clearAndClose();
                }, 2000); */
                clearAndClose();
                viewGrantLeave();
            })
            .catch((error) => {
                alert(" In error catch ", error);
            })
            
        }
      /* 
        setTimeout(() => {
            clearAndClose();
        }, 2000); */
        clearAndClose();

        setClear()
        
    }
    const onCloseModal = () => {
        setClear()
        clearAndClose()
    }


    return (
        <Fragment>
            <Modal show={props.modal} onHide={clearAndClose} centered>

                <Modal.Header>
                    <Modal.Title>Grant Leave</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                </Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group md">
                                            <label htmlFor="exampleFormControlInput1"> Select Cost Center</label>
                                           
                                            <Form.Control size="sm" type="text" value={costCenter || ''} readOnly
                                            onChange={(e) => setCostCenterHandler(e)} />
                                           
                                           {/*  <Select
                                                 name="filters" 
                                               placeholder={costCenter}
                                                value={costCenter}
                                                selected={costCenter}
                                                style={{ fontSize: "0.8rem" }}
                                                options={costCenterList !== null &&  costCenterList !== undefined ?
                                                    costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                                                onChange={setCostCenterHandler}
                                                required isSearchable /> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group md">
                                            <label htmlFor="exampleFormControlInput1"> Select Employee</label>

                                            <select
                                                className="form-control"
                                                required value={employeeCostCenter} 
                                                placeholder={employeeCostCenter} 
                                                selected={employeeCostCenter}
                                                onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                                <option value={employeeCostCenter}>{employeeName}-{employeeCostCenter}</option>
                                                {employeeIdList !== null && employeeIdList.map((item, i) => {
                                                    return (
                                                        <option key={item.employeeId} value={item.employeeId}>
                                                            {item.firstName}-{item.employeeId}</option>
                                                    );
                                                })}
                                            </select>
                                            {/*  <Select
                                                 name="filters" 
                                               placeholder={employeeName + '-' + employeeCostCenter}
                                                selected={employeeName + '-' + employeeCostCenter}
                                                style={{ fontSize: "0.8rem" }}
                                                options={employeeIdList !== null &&  employeeIdList !== undefined ?
                                                    employeeIdList.map(e => ({ label: e.firstName + '-'+ e.employeeId, value: e.employeeId })) : []}
                                                onChange={setEmployeeCostCenterHandler}
                                                required isSearchable /> */}
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Number of days</label>

                                            <input type="number" className="form-control digit" required min={numOfDays} 
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
                   
                    </Form>
                </Modal.Body>

            </Modal>
        </Fragment>

    )
}

export default GrantLeaveEdit;
