import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import moment from 'moment';
import "./salary.css";
import { Form, Table, Row, Button, Modal } from 'react-bootstrap'
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";
import EditSalary from './EditSalary'
import "react-datepicker/dist/react-datepicker.css";
import { Edit2, } from 'react-feather'
import { AppContext } from "../../context/AppState";
import Pagination from 'react-js-pagination'
import '../AdminLeave/AdminLeaves.css'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ViewShift() {

  useEffect(() => {
    viewCostCentre()
  }, [])
  const [shiftButton] = useState(false);
  const [getM, setGetM] = useState('');

  const { cosCentreList, viewCostCentre } = useContext(DashboardContext);
  const { viewSalary, salaryList, salaryApproval, loader } = useContext(ClusterContext);

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
  const [checked, setChecked] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  

  let history = useHistory();

  const { user } = useContext(AppContext);

  const handleEditClose = () => setEditModal(false)
  const handleDeleteClose = () => setDeleteModal(false);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = salaryList !== null && salaryList !== undefined && salaryList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = salaryList !== null && salaryList !== undefined ? salaryList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/
 /*  useEffect(() => {
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format('YYYY');
    viewSalary(month, year, user.costCentre)
  }, []) */

  const onSubmit = e => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year  = moment(getM, ["MMM Do YY"]).format('YYYY');
    // alert(month, year)
    viewSalary(month, year, user.costCentre)
    setGetM(getM)
  }

  const validation = () => {
    let flag = true
    if (getM === '') {
        toast.error("Select Month and Year")
        flag = false;
        return;
    }
    return flag;
}

  const approvedButton = () => {
    const approvalData = {
      salaryIds: checked,
      status: 1,
    };
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    console.log("approval data=====", approvalData);
    /* salaryApproval(approvalData, month, year, user.costCentre); */
    const validate = validation()
    if(validate){
    salaryApproval(approvalData, month, year, user.costCentre);
    }
    setChecked([])

    /*  console.log("month, costCenter, year",month, year, user.costCentre)
     viewSalary(month, year, user.costCentre) */
    history.push("/salary/processsalary");
  };

  const cancelLeave = () => {
    const cancelData = {
      salaryIds: checked,
      status: 2,
    };
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    const validate = validation()
    if(validate){
    salaryApproval(cancelData, month, year, user.costCentre);
    }
    setDeleteModal(false);
    setChecked([])

    /* console.log("month, costCenter, year",month, year, user.costCentre)
    viewSalary(month, year, user.costCentre) */
    history.push("/salary/processsalary");
  };

  const checkboxHandler = (salaryId) => {
    console.log("salary Id in checkbox", salaryId);
    setChecked((checked) => {
      const indexOfSalaryId = checked.indexOf(salaryId);
      if (indexOfSalaryId < 0) {
        return [...checked, salaryId];
      } else {
        return [
          ...checked.slice(0, indexOfSalaryId),
          ...checked.slice(indexOfSalaryId + 1),
        ];
      }
    });
  };
  //File export 
 /*  const filename = 'salaryList';
  let fields = {
    "salaryListId": "S. No",
    "employeeId": "Employee Id",
    "firstName": "Employee Name",
    "numberOfHours": "Number Of Hours",
    "lop": "LOP",
    "contractType": "Contract Type",
    "extraHours": "Extra Hours",
    "totalHours": "Total Hours",
    "statusDesc": "Status"
  }

  let data = [];
  if (salaryList !== undefined && salaryList !== null) {
    for (let i = 0; i < salaryList.length; i++) {
      console.log(salaryList[i].holidayDate)
      data.push({
        salaryListId: i + 1,
        employeeId: salaryList[i].employeeId,
        firstName: salaryList[i].firstName,
        numberOfHours: salaryList[i].numberOfHours,
        lop: salaryList[i].lop,
        contractType: salaryList[i].contractType,
        extraHours: salaryList[i].extraHours,
        totalHours: salaryList[i].totalHours,
        statusDesc: salaryList[i].statusDesc
      })
    }
  } */
  const disabledText = () => {
    toast.error("No Records to be Export")
  }

  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="salary" />
      <div className="container-fluid">
        <Form onSubmit={onSubmit}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Month and Year</Form.Label>
               {/*  <input type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                  placeholder="Number Of Days"
                  required onChange={(e) => setGetM(e.target.value)} value={getM} /> */}
                <div className="salary-date">
                <DatePicker selected={getM} onChange={(date) => setGetM(date)}
                  className="form-control salary-view" dateFormat="MM/yyyy" showMonthYearPicker
                  placeholderText='Select Month and Year' />
                </div>
              </Form.Group>
            </div>

            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                <Form.Control type="text" disabled value={user.costCentre} />
              </Form.Group>
            </div>
          </Row>

          <button type="submit" className="myclass mb-2 mr-2" disabled={shiftButton} value="Submit">Submit</button>


        </Form>

        <Row style={{ marginTop: '2rem' }}>
          <div className="col-sm-12">
            <div className="title_bar" >
            {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 ?
                <ExcelFile filename='Salary List' element={<Button className="btn btn-light mr-2"> Export excel</Button>}>
                  <ExcelSheet data={salaryList} name="Salary List" style={{ width: '500px' }}>
                    <ExcelColumn label="Employee Id" value="employeeId" />
                    <ExcelColumn label="Employee Name"
                                        value={(col) => col.firstName !== null && col.firstName+' '+ col.lastName} />
                    <ExcelColumn label="Number Of Hours" value="numberOfHours" />
                    <ExcelColumn label="LOP" value="lop" />
                    <ExcelColumn label="Contract Type" value="contractType" />
                    <ExcelColumn label="Extra Hours" value="extraHours" />
                    <ExcelColumn label="Total Hours" value="totalHours" />
                    <ExcelColumn label="Status" value="statusDesc" />
                   
                  </ExcelSheet>
                </ExcelFile>

                :
                <Button className="btn btn-light mr-2" onClick={disabledText}>
                  Export excel</Button>
              }


              {
                (user.loginType === "1" || user.additionalRole === "1" ||
                  user.loginType === "7" || user.additionalRole === "7" ||
                  user.loginType === "9" || user.additionalRole === "9"
                ) && currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 ?
                  <div className="ml-2" style={{ float: 'left' }}>
                    <Button
                      className="btn btn-light mr-2"
                      onClick={approvedButton}
                    >
                      Approve
                  </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                    >Cancel </Button>
                  </div>
                  : <div></div>
                  
              }
            </div>
            <Modal show={deleteModal} onHide={handleDeleteClose} centered>
              <Modal.Body style={{ marginTop: "1rem" }}>
                <h5>Are you sure to cancel the item ?</h5>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="deleteNoButton"
                  onClick={() => handleDeleteClose()}
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  className="submitButton"
                  onClick={() => cancelLeave()}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Row>
        <Row>
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="table-responsive">
                <Table id="table-to-xls1" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      {
                        (user.loginType === "7" || user.additionalRole === "7") ?
                          <th>Select</th> : <th></th>
                      }

                      <th>S. No</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Number Of Hours</th>

                      <th scope="col">LOP</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Extra Hours</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  {loader === true && currentRecords !== null && currentRecords !== undefined &&
                    currentRecords.length === 0 ?
                    <tbody>
                      <tr>
                        <td colSpan='10'>
                          <div className="loader-box loader" style={{ width: "100% !important" }}>
                            <div className="loader">
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody> :
                    currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 &&
                      (
                        user.loginType === "7" || user.additionalRole === "7" ||
                        user.loginType === "3" || user.additionalRole === "3" ||
                        (user.role !== "MANAGER" && user.isClusterManager === 1)
                      ) ?
                      currentRecords.map((item, i) => {
                        return (
                          <tbody key={i + 1}>
                            <tr>
                              {(user.loginType === "7" || user.additionalRole === "7") ?
                                <td>
                                  {" "}
                                  {
                                    item.statusDesc === "Pending" ?
                                      <input
                                        type="checkbox"
                                        checked={checked.indexOf(item.salaryId) >= 0}
                                        onChange={() => checkboxHandler(item.salaryId)}
                                        name="selectCheckbox"
                                      />
                                      :
                                      <input type="checkbox" disabled />
                                  }{" "}
                                </td> : <td></td>}
                              <td>{i + 1 + indexOfFirstRecord}</td>

                              <td>{item.employeeId}</td>
                              <td>{item.firstName} {item.lastName}</td>
                              <td>{item.numberOfHours}</td>

                              <td>{item.lop}</td>
                              <td>{item.contractType}</td>
                              <td>{item.extraHours}</td>
                              <td>{item.totalHours}</td>
                              <td>{item.statusDesc}</td>
                              {user.loginType === "7" || user.additionalRole === "7" ?
                                <td>{
                                  item.statusDesc === 'Pending' ?
                                    <Edit2 onClick={() => {
                                      setEditModal(true); setEmployeeId(item.employeeId);
                                      setFirstName(item.firstName); setLastName(item.lastName); setNumberOfHours(item.numberOfHours)
                                      setLop(item.lop); setContractType(item.contractType); setExtraHours(item.extraHours);
                                      setReason(item.reason); setMonth(item.month); setSalaryId(item.salaryId);
                                      setStatus(item.status); setStatusDesc(item.statusDesc);
                                      setTotalHours(item.totalHours); setYear(item.year);
                                      setadditionalHours(item.additionalHours);
                                    }} /> :
                                    <Edit2 disabled style={{ color: 'lightgrey' }} />}
                                </td>
                                : <td></td>}


                            </tr>

                          </tbody>

                        )
                      }) :
                      <tbody>
                        <tr>
                          <td colSpan="10">No Record Found</td>
                        </tr>
                      </tbody>
                  }
                </Table>
                {/*  {(salaryList !== null && salaryList.length <= 0) ? <p style={{ textAlign: "center" }}>Select Month and Year</p> : null} */}
              </div>
            </div>
          </div>
        </Row>
        <EditSalary handleEditClose={handleEditClose} modal={editModal}
          employeeId={employeeId}
          firstName={firstName} lastName={lastName} numberOfHours={numberOfHours}
          lop={lop} contractType={contractType} extraHours={extraHours} reason={reason}
          month={month} salaryId={salaryId} status={status} statusDesc={statusDesc} totalHours={totalHours} year={year}
          additionalHours={additionalHours} costCenter={user.costCentre}
        />

      </div>
      {salaryList !== null && salaryList !== undefined && salaryList.length > 10 &&
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={currentPage}
          itemsCountPerPage={recordPerPage}
          totalItemsCount={totalRecords}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
        />
      }
    </Fragment>

  )
}

export default ViewShift

