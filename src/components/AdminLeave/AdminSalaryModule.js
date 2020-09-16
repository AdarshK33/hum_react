import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import moment from 'moment';
import "../salary/salary.css";
import '../Leaves/Leaves.css'
import './AdminLeaves.css'
import { Button, Table, Modal } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ClusterContext } from "../../context/ClusterState";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

const AdminSalaryModule = () => {

  const [shiftButton, setShiftButton] = useState(false);
  const [getM, setGetM] = useState();
  const [deleteModal, setDeleteModal] = useState(false)
  /*   const [editModal, setEditModal] = useState(false)
    const [employeeId, setEmployeeId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [numberOfHours, setNumberOfHours] = useState()
    const [lop, setLop] = useState()
    const [contractType, setContractType] = useState()
    const [extraHours, setExtraHours] = useState()
    const [reason, setReason] = useState()
    const [month, setMonth] = useState()
    const [salaryId, setSalaryId] = useState()
    const [status, setStatus] = useState()
    const [statusDesc, setStatusDesc] = useState()
    const [totalHours, setTotalHours] = useState()
    const [year, setYear] = useState() */
  let history = useHistory();


  const { salaryStoreList, viewStoreSalary, viewSalaryData, salaryApproval } = useContext(ClusterContext);

  const handleDeleteClose = () => setDeleteModal(false)

  const cancelLeave = (salaryId) => {
    const cancelData = {
      salaryIds: [salaryId],
      status: 2
    }
    salaryApproval(cancelData)
    setDeleteModal(false)
    history.push("/AdminLeaves/AdminSalaryModule");
  }

  useEffect(() => {
    viewStoreSalary()
  }, [])

  const onSubmit = e => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format('YYYY');
    // alert(month, year)
    viewStoreSalary(month, year)
  }
  const approvedButton = (salaryId) => {

    const approvalData = {
      salaryIds: [salaryId],
      status: 1
    }
    console.log("approval data=====", approvalData)
    salaryApproval(approvalData)
    history.push("/AdminLeaves/AdminSalaryModule");

  }
  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="Admin" />
      <div className="container-fluid">
        <form className="form-inline" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Select Month and Year</label>
                <br />
                <br />

                <input type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                  placeholder="Number Of Days"
                  required onChange={(e) => setGetM(e.target.value)} value={getM} />

              </div>

            </div>

            <div className="col-sm-3 mt-4">
              <button className="btn btn-primary.btn-primary.dec mb-2 mt-3" style={{ background: "#006EBB", color: "#FFF" }} type="submit" disabled={shiftButton} value="Submit">Submit</button>

            </div>
            <div className="col-sm-3" style={{ marginTop: "39px" }}>
              <ReactHTMLTableToExcel
                className="myclass"
                table="table-to-xls1"
                filename="salaryFile"
                sheet="Sheet"

                buttonText="Export excel" />
            </div>
          </div>

        </form>
        {/* Table */}
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="table-responsive">
                <table id="table-to-xls1" className="table table-hover">
                  <thead style={{ background: '#006EBB', color: 'white' }}>
                    <tr>
                      <th>No</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Number Of Hours</th>

                      <th scope="col">LOP</th>
                      <th scope="col">Contract Type</th>

                      <th scope="col">Reason</th>
                      <th scope="col">Extra Hours</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  {salaryStoreList.map((item, i) => {
                    return (
                      <tbody key={i + 1}>
                        <tr>
                          <td>{i + 1}</td>

                          <td>{item.employeeId}</td>
                          <td>{item.firstName} {item.lastName}</td>
                          <td>{item.numberOfHours}</td>

                          <td>{item.lop}</td>
                          <td>{item.contractType}</td>

                          <td>{item.reason}</td>
                          <td>{item.extraHours}</td>
                          <td>{item.totalHours}</td>
                          <td>{item.statusDesc}</td>
                          <td><Button size="sm" style={{ backgroundColor: '#006EBB' }}
                            onClick={(e) =>
                              approvedButton(item.salaryId)

                            }>Approved</Button></td>
                          <td><Button variant="danger" size="sm" onClick={() => {
                            setDeleteModal(true)
                          }}>Cancel</Button></td>

                          <Modal show={deleteModal} onHide={handleDeleteClose} centered>
                            <Modal.Body style={{ marginTop: '1rem' }}>
                              <h5>Are you sure to cancel the item ?</h5>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" className="deleteNoButton"
                                onClick={() => handleDeleteClose()}>No</Button>
                              <Button variant="primary" className="deleteYesButton"
                                onClick={() => cancelLeave(item.salaryId)}>Yes</Button>
                            </Modal.Footer>
                          </Modal>


                        </tr>

                      </tbody>

                    )
                  })}
                </table>
                {(salaryStoreList.length <= 0) ? <p style={{ textAlign: "center" }}>Select Month and Year</p> : null}
                {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
              </div>
            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default AdminSalaryModule

