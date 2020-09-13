import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import moment from 'moment';
import "./salary.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ClusterContext } from "../../context/ClusterState";
import DatePicker from "react-datepicker";
import EditSalary from './EditSalary'
import "react-datepicker/dist/react-datepicker.css";
import { X, Edit2, Trash2 } from 'react-feather'
function ViewShift() {
  useEffect(() => {
    viewSalary()
  }, [])
  const [shiftButton, setShiftButton] = useState(false);
  const [getM, setGetM] = useState();
  const { viewSalary, salaryList, viewSalaryData } = useContext(ClusterContext);
  const [editModal, setEditModal] = useState(false)
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
  const [year, setYear] = useState()

  const handleEditShow = () => setEditModal(true)
  const handleEditClose = () => setEditModal(false)


  const onSubmit = e => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format('YYYY');
    // alert(month, year)
    viewSalary(month, year)
  }



  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="salary" />
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
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>

                  {salaryList.map((item, i) => {
                    return (
                      <tbody key={i + 1}>
                        <tr>
                          <td>{i + 1}</td>

                          <td>{item.employeeId}</td>
                          <td>{item.firstName} {item.lastName}</td>
                          <td>{item.numberOfHours}</td>

                          <td>{item.lop}</td>
                          <td>{item.contractType}</td>
                          <td><Edit2 onClick={() => {
                            setEditModal(true); setEmployeeId(item.employeeId);
                            setFirstName(item.firstName); setLastName(item.lastName); setNumberOfHours(item.numberOfHours)
                            setLop(item.lop); setContractType(item.contractType); setExtraHours(item.extraHours);
                            setReason(item.reason); setMonth(item.month); setSalaryId(item.salaryId);
                            setStatus(item.status); setStatusDesc(item.statusDesc);
                            setTotalHours(item.totalHours); setYear(item.year);
                          }} /></td>


                        </tr>

                      </tbody>

                    )
                  })}
                </table>
                {(salaryList.length <= 0) ? <p style={{ textAlign: "center" }}>Select Month and Year</p> : null}
                {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
              </div>
            </div>
          </div>
        </div>
        <EditSalary handleEditClose={handleEditClose} modal={editModal}
          employeeId={employeeId}
          firstName={firstName} lastName={lastName} numberOfHours={numberOfHours}
          lop={lop} contractType={contractType} extraHours={extraHours} reason={reason}
          month={month} salaryId={salaryId} status={status} statusDesc={statusDesc} totalHours={totalHours} year={year}
        />

      </div>
    </Fragment>

  )
}

export default ViewShift

