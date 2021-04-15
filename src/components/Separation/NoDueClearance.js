
import React, { useEffect, Fragment, useContext, useState } from 'react'
import moment from 'moment';
import {
  JsonToExcel
} from 'react-json-excel';
import Breadcrumb from "../common/breadcrumb";
import "./nodueclearance.css";
import '../../assets/css/search.css'
// import CreateShiftModal from "./createShiftModal";
// import EditShiftModal from "./editShiftModal";
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
      <Breadcrumb title="No Due Clearance" parent="No Due Clearance" />
      <div className="container-fluid">
        <div className="row">
        <div className="row">
        <div className="job-filter">
                  <div className="faq-form mr-4">
                    <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                    <Search className="search-icon" style={{ color: "#313131",alignContent:"center" }} onClick={searchDataHandler} />
                  </div>
                </div>
                <div className="job-filter">
                  <div className="faq-form mr-4">
                    <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                    <Search className="search-icon" style={{ color: "#313131",alignContent:"center" }} onClick={searchDataHandler} />
                  </div>
                </div>
                </div>
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
              <b className="title">NO DUE CLEARANCE LISTING </b>
               
              </div>
              <div className="table-responsive">

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                    <th  className="GreenCell">Sl No</th>
       <th className="PinkCell">Employee ID</th>
      <th className="GreenCell">Employee Name</th>
       <th className="PinkCell">Manager Name</th>
      <th className="GreenCell">Joining Date</th>
      <th className="PinkCell">last Working Day</th>
      <th className="GreenCell">IT amount to be Recovered</th>
      <th className="PinkCell">IT Clearance</th>
      <th className="GreenCell">IT Clearance Remarks</th>
      <th className="PinkCell">IT Clearance UpdatedBy</th>
      <th className="GreenCell">Finance Amount to be Recovered</th>
      <th className="PinkCell">Finance Clearance</th>
      <th className="GreenCell">Finance Clearance Remarks</th>
      <th className="PinkCell">Finance Clearance UpdatedBy</th>
                    </tr>
                  </thead>
                <tbody>
                  <tr>
       <td className="BodyCell">1</td>
      <td className="BodyCell">Mark</td>
      <td className="BodyCell">Otto</td>
     <td className="BodyCell">@mdo</td>
     <td className="BodyCell">1</td>
      <td className="BodyCell">Mark</td>
      <td className="BodyCell">Otto</td>
       <td className="BodyCell">@mdo</td>
      <td className="BodyCell">1</td>
       <td className="BodyCell">Mark</td>
       <td className="BodyCell">Otto</td>
      <td className="BodyCell">@mdo</td>
       <td className="BodyCell">1</td>
      <td className="BodyCell">Mark</td>
     </tr>
     </tbody>

{/* 
                  {currentRecords !== undefined && currentRecords !== null &&
                    currentRecords.map((e, i) => {
                    })
                    */}
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
{/* 
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
                  modal={editModal} /> */}
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


