import React, { useEffect, Fragment, useContext, useState } from 'react'
import moment from 'moment';
import {
  JsonToExcel
} from 'react-json-excel';
import Breadcrumb from "../common/breadcrumb";
import "./roster.css";
import '../../assets/css/search.css'
import CreateShiftModal from "./createShiftModal";
import EditShiftModal from "./editShiftModal";
import Pagination from 'react-js-pagination';
import { Button } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { Edit2, Search } from 'react-feather';
import { SearchContext } from '../../context/SearchState';
import { toast } from "react-toastify";
function ViewShift() {
  useEffect(() => {
    viewShift()
  }, [])
  const [modal, setModal] = useState(false);

  const handleShow = () => setModal(true)

  const [editModal, setEditModal] = useState(false)
  const handleEditClose = () => setEditModal(false)
  const handleEditShow = () => setEditModal(true)

  const [contractType, setContractType] = useState('');
  const [shiftType, setShiftType] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [breakStartTime, setStartBreakTime] = useState(new Date());
  const [breakEndTime, setBreakEndTime] = useState(new Date());
  const [workingHours, setWorkingHour] = useState();
  const [status, setStatus] = useState('')
  const [searchValue, setSearchValue] = useState(false);
  const [searchShift, setShiftList] = useState();

  const { searchShiftList, viewSearchSiftList } = useContext(SearchContext);
  const { shiftList, editShift, viewShift, viewShiftTypes, viewContractTypes, singleShiftList } = useContext(RosterContext);
  //pagenation data




  //pagenation data
  useEffect(() => {
    if (shiftList !== undefined && shiftList !== null && shiftList.length > 0) {
      setShiftList(shiftList);
    }
  }, [shiftList])

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = searchShift !== undefined && searchShift !== null && searchShift.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = searchShift !== undefined && searchShift !== null ? searchShift.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }

  const searchHandler = (e) => {
    setSearchValue(e.target.value)

  }

  const searchDataHandler = () => {
    if (searchValue !== "") {
      viewSearchSiftList(searchValue);
    } else {
      viewShift()
    }
  }

  const handleClose = () => {
    setModal(false)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (searchShiftList !== undefined && searchShiftList !== null && searchShiftList.length > 0) {
      setShiftList(searchShiftList);
    }
  }, [searchShiftList])
  const disabledText = () => {
    toast.error("No Records to be Export")
  }
  const filename = 'Shiftlist';
  let fields = {
    "id": "S. No",
    "storeId": "Cost Center",
    "time": "Shift Timings",
    "workingHours": "Working Hours",
    "breakTime": "Break Time",
    "contractType": "Contract Type",
    "shiftType": "Shift Type",
    "status": "Status"
  }

  let data = [];
  if (shiftList !== null) {
    for (let i = 0; i < shiftList.length; i++) {

      data.push({
        id: i + 1,
        storeId: shiftList[i].storeId,
        time: shiftList[i].startTime + "-" + shiftList[i].endTime,
        workingHours: shiftList[i].workingHours,
        breakTime: shiftList[i].breakStartTime + "-" + shiftList[i].breakEndTime,
        contractType: shiftList[i].contractType,
        shiftType: shiftList[i].shiftType,
        status: shiftList[i].status
      })
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="View Shift" parent="View Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
                <div className="job-filter">
                  <div className="faq-form mr-2">
                    <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                    <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                  </div>
                </div>
                <Button className="btn btn-light mr-2" onClick={handleShow}>Create</Button>
                {data.length > 0 ?
                  <JsonToExcel
                    data={data}
                    className="btn btn-light mr-2"
                    filename={filename}
                    fields={fields}
                    text="Export excel"
                  /> : <Button className="btn btn-light mr-2" onClick={disabledText}>
                    Export excel</Button>
                }
              </div>
              <CreateShiftModal handleClose={handleClose} modal={modal} />
              <div className="table-responsive">

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th>Cost Center</th>
                      <th>Shift Timings</th>
                      <th>Working Hours</th>
                      <th>&nbsp;Break Time&nbsp;</th>
                      <th>Contract Type</th>
                      <th>Shift Type</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>

                  {currentRecords !== undefined && currentRecords !== null &&
                    currentRecords.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{e.storeId}</td>
                            <td> {moment(e.startTime, ["h:mm A"]).format("HH:mm")}-{moment(e.endTime, ["h:mm A"]).format("HH:mm")}</td>

                            <td>{e.workingHours}</td>
                            <td>{moment(e.breakStartTime, ["h:mm A"]).format("HH:mm")}-{moment(e.breakEndTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.contractType}</td>
                            <td>{e.shiftType}</td>

                            <td>{e.status === 0 ? "Active" : "Inactive"} </td>
                            <td><Edit2 onClick={() => {
                              viewShift()
                              setEditModal(true);
                              editShift(e.shiftMasterId);
                              setShiftType(e.shiftType);
                              setContractType(e.contractType);
                              setStartTime(e.startTime)
                              setEndTime(e.endTime)
                              setStartBreakTime(e.breakStartTime)
                              setBreakEndTime(e.breakEndTime)
                              setWorkingHour(e.workingHours)
                              setStatus(e.status)
                              viewShiftTypes()
                              viewContractTypes()
                            }} />
                            </td>

                            {/* <td>  <Link to={{ pathname: `EditShift/${e.shiftMasterId}`, data: { id: e.shiftMasterId } }}><Edit2 onClick={() => editShift(e.shiftMasterId)} /></Link></td> */}
                          </tr>

                        </tbody>
                      );
                    })}
                </table>
                {(shiftList === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {shiftList !== undefined && shiftList !== null && currentRecords.length === 0 ?

                  <div className="loader-box loader" style={{ width: "100% !important" }}>
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                  :
                  null}

                <EditShiftModal handleEditClose={handleEditClose}
                  shiftType={shiftType}
                  contractType={contractType}
                  startTime={startTime}
                  endTime={endTime}
                  breakStartTime={breakStartTime}
                  breakEndTime={breakEndTime}
                  workingHours={workingHours}
                  status={status}
                  shiftData={singleShiftList}
                  modal={editModal} />
              </div>

              <div>
                {shiftList !== null && shiftList.length > 10 &&
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
              </div>




            </div>
          </div>
        </div>


      </div>
    </Fragment >

  )
}

export default ViewShift

