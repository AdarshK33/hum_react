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
import WeekOffForm from "./WeekOffForm";
import EditWeekOffForm from "./EditWeekOffForm";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Edit2, Eye, Search } from "react-feather";
import { RosterContext } from "../../context/RosterState";
import { WeekOffContext } from "../../context/WeekOffState";
import moment from "moment";
const ViewWeekOff = () => {
  const { weekOffView, total, loader, weekOffDetails,viewWeekOffById } =
    useContext(WeekOffContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const pageRange = 10;

  const totalRecords = total;

  const [createShow, setCreateShow] = useState(false);
  const [editModal, setEditModal] = useState(false)
  const [contractType, setContractType] = useState("");
  const [currentRecords, setCurrentRecords] = useState([]);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  useEffect(() => {
    viewContractTypes();
    weekOffView("all", pageCount);
  }, []);

  useEffect(() => {
    if (
      weekOffDetails &&
      Object.keys(weekOffDetails).length !== 0 &&
      weekOffDetails !== null &&
      weekOffDetails !== undefined
    ) {
      setCurrentRecords(weekOffDetails);
    }
  }, [weekOffDetails, currentRecords]);

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
      weekOffView(contractType, pageNumber - 1);
    } else {
      weekOffView("all", pageNumber - 1);
    }
    setCurrentRecords(weekOffDetails);
  };

  const handleChange = (e) => {
    console.log("handleChange", e.target.value);
    let contractTypeValue = e.target.value;
    setContractType(e.target.value);
    if (contractTypeValue !== "") {
      weekOffView(contractTypeValue, pageCount);
    } else {
      weekOffView("all", pageCount);
    }
  };
  const editHandleClose = () => setEditModal(false)
  console.log("setCreateShow", createShow);
  return (
    console.log(new Date().getFullYear()),
    (
      <Fragment>
        <WeekOffForm
          createShow={createShow}
          createHandleClose={createHandleClose}
        />
         <EditWeekOffForm
          modal={editModal} 
          editHandleClose={editHandleClose}
        />
        <Breadcrumb title="Week Off" parent="Week Off" />
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
                <th>Number of weekoffs</th>
                <th>Edit</th>
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
                      <td>{item.numberOfWeekOffs}</td>
                      {new Date(item.effectiveDate) <= new Date()?
                      <td>
                      <Edit2/></td>:
                      <td style={{color:"blue"}}><Edit2 onClick={() => {    
                              setEditModal(true);
                              viewContractTypes()
                              viewWeekOffById(item.weekOffId)
                            }} />
                            </td>}
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
        {weekOffDetails !== null && weekOffDetails !== undefined && (
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
export default ViewWeekOff;
