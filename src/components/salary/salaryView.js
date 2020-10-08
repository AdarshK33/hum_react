import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import moment from 'moment';
import "./salary.css";
import { Form, Table, Row, Button} from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";
import EditSalary from './EditSalary'
import "react-datepicker/dist/react-datepicker.css";
import { Edit2, } from 'react-feather'
import { AppContext } from "../../context/AppState";

function ViewShift() {

  useEffect(()=>{
    viewCostCentre()
  }, [])
  const [shiftButton] = useState(false);
  const [getM, setGetM] = useState();

  const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
  const { viewSalary, salaryList } = useContext(ClusterContext); 

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
  const [additionalHours, setadditionalHours] = useState()
  const [year, setYear] = useState()

  const { user } = useContext(AppContext);

  const handleEditClose = () => setEditModal(false)


  const onSubmit = e => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format('YYYY');
    // alert(month, year)
    viewSalary(month, year, user.costCentre)
  }

  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="salary" />
      <div className="container-fluid">
        <Form  onSubmit={onSubmit}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                  <Form.Label>Select Month and Year</Form.Label>  
                    <input type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                    placeholder="Number Of Days"
                    required onChange={(e) => setGetM(e.target.value)} value={getM} />
              </Form.Group>
            </div>
           
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                <Form.Control type="text" disabled value={user.costCentre}  />
              </Form.Group>
            </div>
          </Row>

              <Button type="submit" disabled={shiftButton} value="Submit">Submit</Button>

            
        </Form>

        <Row style={{ marginTop: '2rem' }}>
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
                <ReactHTMLTableToExcel
                 className="btn btn-light mr-2"
                  table="table-to-xls1"
                  filename="salaryFile"
                  sheet="Sheet"

                  buttonText="Export excel" />
              </div>

              <div className="table-responsive">
                <Table id="table-to-xls1" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Number Of Hours</th>

                      <th scope="col">LOP</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Extra Hours</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>

                  {salaryList !== null && salaryList.length > 0 && salaryList.map((item, i) => {
                    return (
                      <tbody key={i + 1}>
                        <tr>
                          <td>{i + 1}</td>

                          <td>{item.employeeId}</td>
                          <td>{item.firstName} {item.lastName}</td>
                          <td>{item.numberOfHours}</td>

                          <td>{item.lop}</td>
                          <td>{item.contractType}</td>
                          <td>{item.extraHours}</td>
                          <td>{item.totalHours}</td>
                          <td>{item.statusDesc}</td>
                          <td>{item.statusDesc === 'Pending' ? 
                            <Edit2 onClick={() => {
                            setEditModal(true); setEmployeeId(item.employeeId);
                            setFirstName(item.firstName); setLastName(item.lastName); setNumberOfHours(item.numberOfHours)
                            setLop(item.lop); setContractType(item.contractType); setExtraHours(item.extraHours);
                            setReason(item.reason); setMonth(item.month); setSalaryId(item.salaryId);
                            setStatus(item.status); setStatusDesc(item.statusDesc);
                            setTotalHours(item.totalHours); setYear(item.year);
                            setadditionalHours(item.additionalHours);
                          }} /> : 
                          <Edit2 disabled style={{color:'lightgrey'}} />}
                          </td>


                        </tr>

                      </tbody>

                    )
                  })}
                </Table>
                {(salaryList  !== null && salaryList.length <= 0) ? <p style={{ textAlign: "center" }}>Select Month and Year</p> : null}
              </div>
            </div>
          </div>
        </Row>
        <EditSalary handleEditClose={handleEditClose} modal={editModal}
          employeeId={employeeId}
          firstName={firstName} lastName={lastName} numberOfHours={numberOfHours}
          lop={lop} contractType={contractType} extraHours={extraHours} reason={reason}
          month={month} salaryId={salaryId} status={status} statusDesc={statusDesc} totalHours={totalHours} year={year}
          additionalHours={additionalHours}
        />

      </div>
    </Fragment>

  )
}

export default ViewShift

