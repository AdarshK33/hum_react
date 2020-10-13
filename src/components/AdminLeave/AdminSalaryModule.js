import React, { useEffect, Fragment, useContext, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import moment from "moment";
import "../salary/salary.css";
import "../Leaves/Leaves.css";
import "./AdminLeaves.css";
import { Button, Modal,Form, Table, Row, Container } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ClusterContext } from "../../context/ClusterState";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { DashboardContext } from "../../context/DashboardState";
import Pagination from 'react-js-pagination'

const AdminSalaryModule = () => {
  const [shiftButton] = useState(false);
  const [getM, setGetM] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [costCenter, setCostCenter] = useState()

  let history = useHistory();

  const {
    salaryStoreList,
    viewStoreSalary,
    salaryApproval,
  } = useContext(ClusterContext);
  const { cosCentreList, viewCostCentre } = useContext(DashboardContext);

  const { user } = useContext(AppContext);

  const handleDeleteClose = () => setDeleteModal(false);

   useEffect(() => {
    viewCostCentre();
   }, []);

/*-----------------Pagination------------------*/
   const [currentPage, setCurrentPage] = useState(1);
   const recordPerPage = 10;
   const totalRecords = salaryStoreList !== null && salaryStoreList.length;
   const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = salaryStoreList !== null ? salaryStoreList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  const handlePageChange = pageNumber => {
   setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/

  const onSubmit = (e) => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    // alert(month, year)
    viewStoreSalary(month, year, costCenter);
  };

  const costCenterHandler = e => {
    setCostCenter(e)
  }

  const approvedButton = () => {
    const approvalData = {
      salaryIds: checked,
      status: 1,
    };
    console.log("approval data=====", approvalData);
    salaryApproval(approvalData);
    setChecked([])
    salaryStoreList.map((i, e) => {
      return (
        <div>
          <p>{i.month} {i.year}</p>
          {viewStoreSalary(i.month, i.year, i.costCenter)}
        </div>

      )
    })
    history.push("/AdminLeaves/AdminSalaryModule");
  };


  const cancelLeave = () => {
    const cancelData = {
      salaryIds: checked,
      status: 2,
    };
    salaryApproval(cancelData);
    setDeleteModal(false);
    setChecked([])
    salaryStoreList.map((i, e) => {
      return (
        <div>
          <p>{i.month} {i.year}</p>
          {viewStoreSalary(i.month, i.year, i.costCenter)}
        </div>

      )
    })
    history.push("/AdminLeaves/AdminSalaryModule");
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
  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="Admin" />
      <div className="container-fluid">
        <Form onSubmit={onSubmit}>
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
                <Form.Label>Cost Center</Form.Label><span style = {{color:'red'}}>*</span>
                <Form.Control as="select" required  onChange={(e) => costCenterHandler(e)}>
                  <option value="">Select</option>
                    {cosCentreList.map((e, i) => {
                      return (
                        <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                    })}

                </Form.Control>
              </Form.Group>
            </div>
          </Row>

          <Button type="submit" disabled={shiftButton} value="Submit" className="submitButton">Submit</Button>


        </Form>

          <Row style={{ marginTop: '2rem' }}>
            <div className="col-sm-12">
              <div className="title_bar">
                <ReactHTMLTableToExcel
                 className="btn btn-light mr-2"
                  table="table-to-xls1"
                  filename="salaryFile"
                  sheet="Sheet"

                  buttonText="Export excel" />
                  <div className="ml-2" style={{float:'left'}}>
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
                        <th>Select</th>
                        <th>S. No</th>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Number Of Hours</th>

                        <th scope="col">LOP</th>
                        <th scope="col">Contract Type</th>

                        <th scope="col">Reason</th>
                        <th scope="col">Extra Hours</th>
                        <th scope="col">Total Hours</th>
                        <th scope="col">Status</th>

                      </tr>
                    </thead>

                    {currentRecords !== null &&
                      currentRecords.map((item, i) => {
                        return (
                          <tbody key={i + 1}>
                            <tr>
                              <td>
                                {" "}
                                {item.statusDesc === "Pending" ? (
                                  <input
                                    type="checkbox"
                                    checked={checked.indexOf(item.salaryId) >= 0}
                                    onChange={() => checkboxHandler(item.salaryId)}
                                    name="selectCheckbox"
                                  />
                                ) : (
                                    <input type="checkbox" disabled />
                                  )}{" "}
                              </td>
                              <td>{i + 1 + indexOfFirstRecord}</td>

                              <td>{item.employeeId}</td>
                              <td>
                                {item.firstName} {item.lastName}
                              </td>
                              <td>{item.numberOfHours}</td>

                              <td>{item.lop}</td>
                              <td>{item.contractType}</td>

                              <td>{item.reason}</td>
                              <td>{item.extraHours}</td>
                              <td>{item.totalHours}</td>
                              <td>{item.statusDesc}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </Table>
                  {salaryStoreList !== null && salaryStoreList.length <= 0 ? (
                    <p style={{ textAlign: "center" }}>Select Month and Year</p>
                  ) : null}
                  {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
                </div>
              </div>
            </div>
          </Row>
        </div>
        {salaryStoreList !== null && salaryStoreList.length > 10 &&
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
  );
};

export default AdminSalaryModule;
