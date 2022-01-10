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

import Breadcrumb from "../common/breadcrumb";
import { Edit, Edit2, Eye, Search } from "react-feather";
import BonusForm from "./BonusForm";
import { BonusContext } from "../../context/BonusState";
import EditBonus from "./EditBonus";
const ViewBonus = () => {
  const {
    bonusDetails,
    total,
    loader,
    viewBonus,
    viewBonusById,
    exportBonusList,
    getBonusDetailsById,
  } = useContext(BonusContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const pageRange = 10;

  const totalRecords = total;

  const [show, setShow] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentRecords, setCurrentRecords] = useState([]);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };
  const getMonthList = (month) => {
    switch (month) {
      case 1:
        return "January";
        break;
      case 2:
        return "Febrary";
        break;
      case 3:
        return "March";
        break;
      case 4:
        return "April";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "August";
        break;
      case 9:
        return "September";
        break;
      case 10:
        return "October";
        break;
      case 11:
        return "November";
        break;
      case 12:
        return "December";
        break;
      default:
        return "null";
    }
  };
  /*-----------------pagination ------------------*/
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "") {
      viewBonus(searchValue, pageNumber - 1);
    } else {
      viewBonus("all", pageNumber - 1);
    }
    setCurrentRecords(bonusDetails);
  };
  /*--------------------Search -------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      viewBonus(searchValue, pageCount);
    } else {
      viewBonus("all", pageCount);
    }
  };
  /*-----------Search Code End---------------*/
  /*-----------Export------------------*/
  const handleExport = (e) => {
    console.log(e.target.value);
    exportBonusList();
  };
  useEffect(() => {
    viewBonus("all", pageCount);
  }, []);
  useEffect(() => {
    if (bonusDetails !== null && bonusDetails !== undefined) {
      setCurrentRecords(bonusDetails);
    }
  }, [bonusDetails, currentRecords]);
  return (
    console.log(new Date().getFullYear()),
    (
      <Fragment>
        <BonusForm show={show} handleClose={handleClose} />
        <EditBonus editmodal={editmodal} handleEditClose={handleEditClose} />
        <Breadcrumb title="Bonus Structure" parent="Bonus Structure" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="title_bar">
                <div className="job-filter">
                  <div className="faq-form mr-2">
                    <input
                      className="form-control searchButton"
                      type="text"
                      placeholder="Search.."
                      onChange={(e) => searchHandler(e)}
                    />
                    <Search
                      className="search-icon"
                      style={{ color: "#313131" }}
                      onClick={searchDataHandler}
                    />
                  </div>
                </div>
                <Button className="btn btn-light mr-2" onClick={handleShow}>
                  Create
                </Button>

                <Button className="btn btn-light mr-2" onClick={handleExport}>
                  Export excel
                </Button>
              </div>
              {/* <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="OnBoardHeading">
                  <b>Bonus Structure </b>
                </div>
              </div> */}
            </div>
          </div>
          {/* <Row>
            <Col sm={4}>
              <div className="faq-form mr-2">
                <input
                  className="form-control "
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => searchHandler(e)}
                />
                <Search
                  className="search-icon"
                  style={{ color: "#313131" }}
                  onClick={searchDataHandler}
                />
              </div>
            </Col>
            <Col style={{ textAlign: "end" }}>
              <Button onClick={handleShow}>Create</Button>
            </Col>
            <Col style={{ float: "right" }}>
              <Button onClick={handleExport}>Export</Button>
            </Col>
          </Row> */}
          <Table className="mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Department</th>
                <th>Contract Type</th>
                <th>Effective Date</th>
                <th>Bonus %</th>
                <th>Edit</th>
              </tr>
            </thead>
            {loader === true &&
            bonusDetails !== null &&
            bonusDetails !== undefined ? (
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
            ) : (
              bonusDetails !== undefined &&
              bonusDetails !== null &&
              bonusDetails.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1 + indexOfFirstRecord}</td>
                      <td>{item.department}</td>
                      <td>{item.contractType}</td>
                      <td>{item.effectiveDate}</td>
                      <td>{item.bonus}</td>

                      <td>
                        {new Date(item.effectiveDate) > new Date() ? (
                          <Edit2
                            style={{ color: "blue" }}
                            onClick={() => {
                              setEditModal(true);
                              viewBonusById(item.bonusId);
                            }}
                          ></Edit2>
                        ) : (
                          <Edit2 style={{ color: "gray" }}></Edit2>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </Table>
        </div>
        {bonusDetails !== null && bonusDetails !== undefined && (
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
export default ViewBonus;
