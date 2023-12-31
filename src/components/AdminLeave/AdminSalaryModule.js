import React, { useEffect, Fragment, useContext, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import moment from "moment";
import "../salary/salary.css";
import "../Leaves/Leaves.css";
import "./AdminLeaves.css";
import { Edit2 } from "react-feather";
import {
  Col,
  Button,
  Modal,
  Form,
  Table,
  Row,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { ClusterContext } from "../../context/ClusterState";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardState";
import Pagination from "react-js-pagination";
import AdminSalaryEdit from "./AdminSalaryEdit";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactExport from "react-data-export";
import MultiSelect from "react-multi-select-component";
import { AdminContext } from "../../context/AdminState";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { PermissionContext } from "../../context/PermissionState";
import { AppContext } from "../../context/AppState";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AdminSalaryModule = () => {
  const [shiftButton] = useState(false);
  const [getM, setGetM] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [costCenter, setCostCenter] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [numberOfHours, setNumberOfHours] = useState();
  const [lop, setLop] = useState();
  const [contractType, setContractType] = useState();
  const [contractTypeList, setContractTypeList] = useState([]);
  const [extraHours, setExtraHours] = useState();
  const [reason, setReason] = useState();
  const [month, setMonth] = useState();
  const [salaryId, setSalaryId] = useState();
  const [status, setStatus] = useState();
  const [statusDesc, setStatusDesc] = useState();
  const [totalHours, setTotalHours] = useState();
  const [additionalHours, setadditionalHours] = useState();
  const [year, setYear] = useState();
  const [error, setError] = useState(false);
  const [department, setDepartment] = useState([]);
  const [radioValue, setRadioValue] = useState("1");

  let history = useHistory();

  const { salaryList, viewSalary, salaryApproval, loader, salaryPending } =
    useContext(ClusterContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const {
    departmentView,
    departmentName,
    managerList,
    allManagerList,
    costcenterByDepartment,
    costcenterByDepartmentData,
  } = useContext(OfferContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const handleEditClose = () => setEditModal(false);
  const handleDeleteClose = () => setDeleteModal(false);

  useEffect(() => {
    CostCenter();
    departmentView();
    viewContractTypes();
  }, []);

  useEffect(() => {
    console.log("cosCentreList", costCenterList);
    if (
      costCenterList !== null &&
      costCenterList !== undefined &&
      Object.keys(costCenterList).length !== 0 &&
      Object.keys(costCenterList).length === 1
    ) {
      console.log("cosCentreList inside", costCenterList);
      // ({ label: costCenterList[0].costCentreName, value: costCenterList[0].costCentreName })
      setCostCenter([
        {
          label: costCenterList[0].costCentreName,
          value: costCenterList[0].costCentreName,
        },
      ]);
    } else {
      setCostCenter([]);
    }
  }, [costCenterList]);
  console.log("set costCenter", costCenter);

  useEffect(() => {
    console.log("departmentName", departmentName);
    if (
      departmentName !== null &&
      departmentName !== undefined &&
      Object.keys(departmentName).length !== 0 &&
      Object.keys(departmentName).length === 1
    ) {
      console.log("departmentName inside", departmentName);
      setDepartment([
        {
          label: departmentName[0].departmentName,
          value: departmentName[0].departmentName,
        },
      ]);
    } else {
      setDepartment([]);
    }
  }, [departmentName]);
  console.log("CostCenterr", costCenter);
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords =
    salaryList !== null && salaryList !== undefined && salaryList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords =
    salaryList !== null && salaryList !== undefined
      ? salaryList.slice(indexOfFirstRecord, indexOfLastRecord)
      : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /*-----------------Pagination------------------*/

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validation();

    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    let flag = localStorage.getItem("flag");
    const salaryData = {
      cluster: flag,
      month: month,
      storeIds:
        costCenter.length > 0
          ? costCenter.map((e, i) => costCenter[i].value)
          : null,
      departments:
        department.length > 0
          ? department.map((e, i) => department[i].value)
          : null,
      contractType: contractTypeList,
      year: year,
    };
    console.log("salaryData", salaryData);
    if (validate) {
      setCurrentPage(1);
      viewSalary(salaryData);
    }
    setGetM(getM);
    /* setCostCenter(costCenter) */
  };

  const validation = () => {
    let flag = true;

    if (getM === "") {
      toast.error("Select Month and Year");
      flag = false;
      return;
    }
    if (costCenter === "" || Object.keys(costCenter).length === 0) {
      toast.error("Select Cost Center");
      flag = false;
      return;
    }
    if (
      rolePermission == "admin" &&
      (department === "" || Object.keys(department).length === 0)
    ) {
      toast.error("Select Department");
      flag = false;
      return;
    }
    if (contractTypeList === "" || Object.keys(contractTypeList).length === 0) {
      toast.error("Select Contract type");
      flag = false;
      return;
    }
    return flag;
  };

  const setCostCenterHandler = (options) => {
    let data1 = options !== null ? options.map((e, i) => options[i].value) : [];
    setCostCenter(options);
    console.log("options in cost center", data1, options);
  };

  const setDepartmentHandler = (options) => {
    let data1 = options !== null ? options.map((e, i) => options[i].value) : [];
    setDepartment(options);
    console.log("options in cost center", data1, options);
  };

  const setContractTypeHandler = (options) => {
    let data1 = options !== null ? options.map((e, i) => options[i].value) : [];
    setContractTypeList(options);
    console.log("options in ContractType", options);
  };

  const approvedButton = () => {
    const approvalData = {
      salaryIds: checked,
      status: 1,
    };
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    console.log("approval data=====", approvalData);
    let flag = localStorage.getItem("flag");
    const salaryData = {
      cluster: flag,
      month: month,
      storeIds:
        costCenter.length > 0
          ? costCenter.map((e, i) => costCenter[i].value)
          : null,
      departments:
        department.length > 0
          ? department.map((e, i) => department[i].value)
          : null,
      contractType: contractTypeList,
      year: year,
    };
    const validate = validation();
    if (validate) {
      salaryApproval(approvalData, salaryData);
    }

    /*  salaryApproval(approvalData); */
    setChecked([]);

    /*  console.log("month, costCenter, year",month, year, costCenter)
     viewSalary(month, year, costCenter) */
    history.push("/salary/approval");
  };

  const pendingButton = () => {
    const pendingId = checked;
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    let flag = localStorage.getItem("flag");
    const salaryData = {
      cluster: flag,
      month: month,
      storeIds:
        costCenter.length > 0
          ? costCenter.map((e, i) => costCenter[i].value)
          : null,
      departments:
        department.length > 0
          ? department.map((e, i) => department[i].value)
          : null,
      contractType: contractTypeList,
      year: year,
    };
    const validate = validation();
    if (validate) {
      salaryPending(pendingId, salaryData);
    }
    setChecked([]);
    history.push("/salary/approval");
  };

  const cancelLeave = () => {
    const cancelData = {
      salaryIds: checked,
      status: 2,
    };
    const month = moment(getM, ["YYYY-MM"]).format("M");
    const year = moment(getM, ["MMM Do YY"]).format("YYYY");
    let flag = localStorage.getItem("flag");
    const salaryData = {
      cluster: flag,
      month: month,
      storeIds:
        costCenter.length > 0
          ? costCenter.map((e, i) => costCenter[i].value)
          : null,
      departments:
        department.length > 0
          ? department.map((e, i) => department[i].value)
          : null,
      contractType: contractTypeList,
      year: year,
    };
    const validate = validation();
    if (validate) {
      salaryApproval(cancelData, salaryData);
    }

    setDeleteModal(false);
    setChecked([]);

    /*   console.log("month, costCenter, year",month, costCenter, year)
      viewStoreSalary(month, costCenter, year) */
    history.push("/salary/approval");
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

  const disabledText = () => {
    toast.error("No Records to be Export");
  };

  console.log("radiovalue", radioValue);
  console.log("contract type admin", contractTypeList);
  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="Admin" />
      <div className="container-fluid">
        <Form onSubmit={onSubmit}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Month and Year</Form.Label>
                {/* <input type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                  placeholder="Number Of Days"
                  required onChange={(e) => setGetM(e.target.value)} value={getM} /> */}
                <div className="salary-date">
                  <DatePicker
                    selected={getM}
                    onChange={(date) => setGetM(date)}
                    className="form-control salary-view"
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="Select Month and Year"
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                <span style={{ color: "red" }}>*</span>
                {/*  <Form.Control as="select" required value={costCenter} onChange={(e) => costCenterHandler(e)}>
                  <option value="">Select</option>
                  {cosCentreList.map((e, i) => {
                    return (
                      <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                  })}

                </Form.Control> */}
                {/* <Select
                  name="filters"
                  placeholder="Select Cost Center"
                  style={{ fontSize: "0.8rem" }}
                  options={cosCentreList !== null ?
                    cosCentreList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                  onChange={costCenterHandler}
                  required={true} isSearchable
                /> */}
                {costCenterList !== null &&
                costCenterList !== undefined &&
                Object.keys(costCenterList).length !== 0 &&
                Object.keys(costCenterList).length === 1 ? (
                  <input
                    type="text"
                    className="form-control Value"
                    required
                    readOnly
                    value={fetchemployeeData.costCentre}
                  />
                ) : (
                  <MultiSelect
                    options={
                      costCenterList !== null
                        ? costCenterList.map((e) => ({
                            label: e.costCentreName,
                            value: e.costCentreName,
                          }))
                        : []
                    }
                    value={costCenter}
                    onChange={setCostCenterHandler}
                    labelledBy={"Select"}
                    hasSelectAll={true}
                    disableSearch={false}
                  />
                )}
                <div>
                  {error && (
                    <span style={{ color: "red" }}>
                      Cost Center is Required
                    </span>
                  )}
                </div>
              </Form.Group>
            </div>
            <div className="col-sm-4">
              {rolePermission == "admin" ? (
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <span style={{ color: "red" }}>*</span>
                  <MultiSelect
                    options={
                      departmentName !== null
                        ? departmentName.map((e) => ({
                            label: e.departmentName,
                            value: e.departmentName,
                          }))
                        : []
                    }
                    value={department}
                    onChange={setDepartmentHandler}
                    labelledBy={"Select"}
                    hasSelectAll={true}
                    disableSearch={false}
                  />
                  <div>
                    {error && (
                      <span style={{ color: "red" }}>
                        Department is Required
                      </span>
                    )}
                  </div>
                </Form.Group>
              ) : (
                ""
              )}
            </div>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <Form.Label>
                Contract Type <span style={{ color: "red" }}>*</span>
              </Form.Label>
            </Col>
            <Col sm={7}>
              {/* <ButtonGroup>
                        {shiftContractNames !== null &&
                    shiftContractNames !== undefined &&
                    shiftContractNames.length > 0 &&shiftContractNames.map((radio, idx) => (
                      <React.Fragment>
                          <p>&nbsp;&nbsp;&nbsp;</p><ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={'outline-primary'}
                            name="radio"
                            value={radio.contractType}
                            checked={radioValue === radio.contractType}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                          >
                            {radio.contractType}
                          </ToggleButton>
                          </React.Fragment>
                        ))}
                      </ButtonGroup> */}
              {shiftContractNames !== null &&
                shiftContractNames !== undefined &&
                shiftContractNames.length > 0 &&
                shiftContractNames.map((radio, idx) => (
                  <ToggleButtonGroup
                    type="checkbox"
                    value={contractTypeList}
                    onChange={setContractTypeHandler}
                  >
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <ToggleButton
                      className="Btn-Blue-BG"
                      value={radio.contractType}
                    >
                      {radio.contractType}
                    </ToggleButton>
                  </ToggleButtonGroup>
                ))}
            </Col>

            {/* {shiftContractNames !== null &&
                    shiftContractNames !== undefined &&
                    shiftContractNames.length > 0 &&
                    shiftContractNames.map((item) => {
                      return (
                        
                        <Button type="button" className="submitButton">{item.contractType}</Button>
                      );
                    })} */}
          </Row>
          <Button
            type="submit"
            disabled={shiftButton}
            value="Submit"
            className="submitButton"
          >
            Submit
          </Button>
        </Form>

        <Row style={{ marginTop: "2rem" }}>
          <div className="col-sm-12">
            <div className="title_bar">
              {currentRecords !== null &&
              currentRecords !== undefined &&
              currentRecords.length > 0 ? (
                <ExcelFile
                  filename="Salary List"
                  element={
                    <Button className="btn btn-light mr-2">
                      {" "}
                      Export excel
                    </Button>
                  }
                >
                  <ExcelSheet
                    data={salaryList}
                    name="Salary List"
                    style={{ width: "500px" }}
                  >
                    <ExcelColumn label="Cost Center" value="costCenter" />
                    <ExcelColumn label="Employee Id" value="employeeId" />
                    <ExcelColumn
                      label="Employee Name"
                      value={(col) =>
                        col.firstName !== null &&
                        col.firstName + " " + col.lastName
                      }
                    />
                    <ExcelColumn
                      label="Number Of Hours"
                      value="numberOfHours"
                    />
                    <ExcelColumn label="LOP" value="lop" />
                    <ExcelColumn label="Contract Type" value="contractType" />
                    <ExcelColumn label="Reason" value="reason" />
                    <ExcelColumn label="Extra Hours" value="extraHours" />
                    <ExcelColumn label="Total Hours" value="totalHours" />
                    <ExcelColumn label="Status" value="statusDesc" />
                  </ExcelSheet>
                </ExcelFile>
              ) : (
                <Button className="btn btn-light mr-2" onClick={disabledText}>
                  Export excel
                </Button>
              )}
              {currentRecords !== null &&
              currentRecords !== undefined &&
              currentRecords.length > 0 ? (
                <div className="ml-2" style={{ float: "left" }}>
                  <Button
                    className="btn btn-light mr-2"
                    onClick={approvedButton}
                  >
                    Approve
                  </Button>
                  {rolePermission == "admin" && (
                    <Button
                      className="btn btn-light mr-2"
                      onClick={pendingButton}
                    >
                      Pending
                    </Button>
                  )}
                  {/* <Button
                    variant="danger"
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                  >
                    Cancel{" "}
                  </Button> */}
                </div>
              ) : (
                <div></div>
              )}
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
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th>Select</th>
                      <th>S. No</th>
                      <th scope="col">Cost Center</th>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Number Of Hours</th>

                      <th scope="col">LOP</th>
                      <th scope="col">Contract Type</th>

                      <th scope="col">Reason</th>
                      <th scope="col">Extra Hours</th>
                      <th scope="col">Additional Hours</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  {loader === true &&
                  currentRecords !== null &&
                  currentRecords !== undefined ? (
                    <tbody>
                      <tr>
                        <td colSpan="10">
                          <div
                            className="loader-box loader"
                            style={{ width: "100% !important" }}
                          >
                            <div className="loader">
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                              <div className="line bg-primary"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : currentRecords !== null &&
                    currentRecords !== undefined &&
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>
                              {" "}
                              {item.statusDesc === "Pending" ||
                              (rolePermission == "admin" &&
                                (item.statusDesc === "Approved" ||
                                  item.statusDesc === "Pending")) ? (
                                <input
                                  type="checkbox"
                                  checked={checked.indexOf(item.salaryId) >= 0}
                                  onChange={() =>
                                    checkboxHandler(item.salaryId)
                                  }
                                  name="selectCheckbox"
                                />
                              ) : (
                                <input type="checkbox" disabled />
                              )}{" "}
                            </td>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.costCenter}</td>
                            <td>{item.employeeId}</td>
                            <td>
                              {item.firstName} {item.lastName}
                            </td>
                            <td>{item.numberOfHours}</td>

                            <td>{item.lop}</td>
                            <td>{item.contractType}</td>

                            <td>{item.reason}</td>
                            <td>{item.extraHours}</td>
                            <td>{item.additionalHours}</td>
                            <td>{item.totalHours}</td>
                            <td>{item.statusDesc}</td>
                            <td>
                              {(rolePermission == "admin" &&
                                moment().format("DD") <= "25" &&
                                (item.statusDesc === "Pending" ||
                                  item.statusDesc === "Approved")) ||
                              (moment().format("DD") <= "20" &&
                                item.statusDesc === "Pending") ? (
                                <Edit2
                                  onClick={() => {
                                    setEditModal(true);
                                    setEmployeeId(item.employeeId);
                                    setFirstName(item.firstName);
                                    setLastName(item.lastName);
                                    setNumberOfHours(item.numberOfHours);
                                    setLop(item.lop);
                                    setContractType(item.contractType);
                                    setExtraHours(item.extraHours);
                                    setReason(item.reason);
                                    setMonth(item.month);
                                    setSalaryId(item.salaryId);
                                    setStatus(item.status);
                                    setStatusDesc(item.statusDesc);
                                    setTotalHours(item.totalHours);
                                    setYear(item.year);
                                    setadditionalHours(item.additionalHours);
                                  }}
                                />
                              ) : (
                                <Edit2
                                  disabled
                                  style={{ color: "lightgrey" }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="10">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
                {/*  {salaryList !== null && salaryList.length <= 0 ? (
                  <p style={{ textAlign: "center" }}>Select Month and Year</p>
                ) : null} */}
                {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
              </div>
            </div>
          </div>
        </Row>
        <AdminSalaryEdit
          handleEditClose={handleEditClose}
          modal={editModal}
          employeeId={employeeId}
          firstName={firstName}
          lastName={lastName}
          numberOfHours={numberOfHours}
          lop={lop}
          contractType={contractType}
          contractTypeList={contractTypeList}
          extraHours={extraHours}
          reason={reason}
          month={month}
          salaryId={salaryId}
          status={status}
          statusDesc={statusDesc}
          totalHours={totalHours}
          year={year}
          additionalHours={additionalHours}
          department={
            department.length > 0
              ? department.map((e, i) => department[i].value)
              : null
          }
          costCenter={
            costCenter.length > 0
              ? costCenter.map((e, i) => costCenter[i].value)
              : null
          }
        />
      </div>
      {salaryList !== null &&
        salaryList !== undefined &&
        salaryList.length > 10 && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
          />
        )}
    </Fragment>
  );
};

export default AdminSalaryModule;
