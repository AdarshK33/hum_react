import React, { useEffect, Fragment, useContext, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import moment from "moment";
import "../salary/salary.css";
import "../Leaves/Leaves.css";
import "./AdminLeaves.css";
import { Button, Modal } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ClusterContext } from "../../context/ClusterState";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppState";

const AdminSalaryModule = () => {
  const [shiftButton] = useState(false);
  const [getM, setGetM] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState([]);

  let history = useHistory();

  const {
    salaryStoreList,
    viewStoreSalary,
    salaryApproval,
  } = useContext(ClusterContext);

  const { user } = useContext(AppContext);

  const handleDeleteClose = () => setDeleteModal(false);

 /*  useEffect(() => {
    viewStoreSalary();
  }, []); */

  const onSubmit = (e) => {
    e.preventDefault();
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    const storeId = user.costCenter
    // alert(month, year)
    viewStoreSalary(month, year, storeId);
  };

  const approvedButton = () => {
    const approvalData = {
      salaryIds: checked,
      status: 1,
    };
    console.log("approval data=====", approvalData);
    salaryApproval(approvalData);
    setChecked([])
    salaryStoreList.map((i,e) => {
      return(
        <div>
        <p>{i.month} {i.year}</p>
        {viewStoreSalary(i.month, i.year)}
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
    salaryStoreList.map((i,e) => {
      return(
        <div>
        <p>{i.month} {i.year}</p>
        {viewStoreSalary(i.month, i.year)}
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
        <form className="form-inline" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">
                  Select Month and Year
                </label>
                <br />
                <br />

                <input
                  type="month"
                  style={{ fontSize: "0.8rem" }}
                  className="form-control digit"
                  min="2020-08"
                  placeholder="Number Of Days"
                  required
                  onChange={(e) => setGetM(e.target.value)}
                  value={getM}
                />
              </div>
            </div>

            <div className="col-sm-3 mt-4">
              <button
                className="btn btn-primary.btn-primary.dec mb-2 mt-3"
                style={{ background: "#006EBB", color: "#FFF" }}
                type="submit"
                disabled={shiftButton}
                value="Submit"
              >
                Submit
              </button>
            </div>
            <div className="col-sm-3" style={{ marginTop: "39px" }}>
              <ReactHTMLTableToExcel
                className="myclass"
                table="table-to-xls1"
                filename="salaryFile"
                sheet="Sheet"
                buttonText="Export excel"
              />
            </div>
          </div>
        </form>
        {/* Table */}
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="title_bar">
            <Button
                className="btn btn-light mr-2"
                onClick={approvedButton}
              >
                Approved
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  setDeleteModal(true);
                }}
              >Cancel </Button>
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
                  className="deleteYesButton"
                  onClick={() => cancelLeave()}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="table-responsive">
                <table id="table-to-xls1" className="table table-hover">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Sr No.</th>
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

                  {salaryStoreList !== null &&
                  salaryStoreList.map((item, i) => {
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
                          <td>{i + 1}</td>

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
                </table>
                {salaryStoreList !== null && salaryStoreList.length <= 0 ? (
                  <p style={{ textAlign: "center" }}>Select Month and Year</p>
                ) : null}
                {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSalaryModule;
