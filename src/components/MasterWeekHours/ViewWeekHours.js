import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import Pagination from "react-js-pagination";
import WorkHourForm from "./WorkHourForm";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Edit2, Eye, Search } from "react-feather";
import { RosterContext } from "../../context/RosterState";
import { WorkHourContext } from "../../context/WorkHourState";
import moment from "moment";
const ViewWorkHours = () => {
  const { workHourView, total, loader, workHourDetails } =
    useContext(WorkHourContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const pageRange = 10;

  const totalRecords = total;

  const [createShow, setCreateShow] = useState(false);
  const [contractType, setContractType] = useState("");
  const [currentRecords, setCurrentRecords] = useState([]);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  useEffect(() => {
    viewContractTypes();
    workHourView("all", pageCount);
  }, []);

  useEffect(() => {
    if (
      workHourDetails &&
      Object.keys(workHourDetails).length !== 0 &&
      workHourDetails !== null &&
      workHourDetails !== undefined
    ) {
      setCurrentRecords(workHourDetails);
    }
  }, [workHourDetails, currentRecords]);

  const handleShow = () => {
    setCreateShow(true);
  };
  const createHandleClose = () => {
    setCreateShow(false);
  };

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (contractType !== "") {
      workHourView(contractType, pageNumber - 1);
    } else {
      workHourView("all", pageNumber - 1);
    }
    setCurrentRecords(workHourDetails);
  };

  const handleChange = (e) => {
    console.log("handleChange", e.target.value);
    let contractTypeValue = e.target.value;
    setContractType(e.target.value);
    if (contractTypeValue !== "") {
      workHourView(contractTypeValue, pageCount);
    } else {
      workHourView("all", pageCount);
    }
  };

  console.log("setCreateShow", createShow);
  return (
    console.log(new Date().getFullYear()),
    (
      <Fragment>
        <WorkHourForm
          createShow={createShow}
          createHandleClose={createHandleClose}
        />
        <Breadcrumb title="Work Hours" parent="Work Hours" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="title_bar">
                <Button className="btn btn-light mr-2" onClick={handleShow}>
                  Create
                </Button>
                <div className="job-filter">
                  <div className="faq-form mr-2">
                    <Form.Control
                      as="select"
                      name="contractType"
                      onChange={handleChange}
                      value={contractType}
                    >
                      <option value="">All Contract type</option>
                      {shiftContractNames !== null &&
                        shiftContractNames !== undefined &&
                        shiftContractNames.length > 0 &&
                        shiftContractNames.map((item) => {
                          return (
                            <option key={item.typeId}>
                              {item.contractType}
                            </option>
                          );
                        })}
                    </Form.Control>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Table className="mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Effective From</th>
                <th>Contract Type</th>
                <th>Shift Hours/Day</th>
                <th>Work Hours/Day</th>
                <th>Break Hours/Day</th>
              </tr>
            </thead>
            {loader === true &&
            currentRecords !== null &&
            currentRecords !== undefined ? (
              <tbody>
                <tr>
                  <td colSpan="12">
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
            ) : currentRecords !== undefined &&
              currentRecords !== null &&
              currentRecords.length > 0 &&
              total > 0 ? (
              currentRecords.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1 + indexOfFirstRecord}</td>
                      <td>{moment(item.effectiveDate).format("DD-MM-YYYY")}</td>

                      <td>{item.contractType}</td>
                      <td>{item.shiftHours}</td>
                      <td>{item.workHours}</td>
                      <td>{item.breakHours}</td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tbody>
                <tr>
                  <td colSpan="12">No Record Found</td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
        {workHourDetails !== null && workHourDetails !== undefined && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
            firstPageText="First"
            lastPageText="Last"
          />
        )}
      </Fragment>
    )
  );
};
export default ViewWorkHours;
