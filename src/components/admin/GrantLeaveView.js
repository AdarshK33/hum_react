import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Breadcrumb from '../common/breadcrumb';
import GrantLeaveAdd from './GrantLeaveAdd';
import GrantLeaveEdit from './GrantLeaveEdit';
import { Edit2, Search } from 'react-feather'
import Pagination from 'react-js-pagination'
import { AdminContext } from "../../context/AdminState";

const GrantLeaveView = () => {


  const { viewGrantLeave, grantLeaveView, loader } = useContext(AdminContext);


  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const [editModal, setEditModal] = useState(false);
  const handleShow = () => setModal(true)
  const [currentPage, setCurrentPage] = useState(1);
  const handleEditClose = () => setEditModal(false);
  const [empLeave, setEmpLeave] = useState();
  const [searchValue, setSearchValue] = useState(false);
  const [searchLeaveList, setLeaveList] = useState();

  const recordPerPage = 10;
  const totalRecords = searchLeaveList !== undefined && searchLeaveList !== null && searchLeaveList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = searchLeaveList !== undefined && searchLeaveList !== null ? searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  useEffect(() => {
    viewGrantLeave()
  }, [])

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  const editHandler = (item) => {

    setEmpLeave(item);

  }
  useEffect(() => {
    if (grantLeaveView !== undefined && grantLeaveView !== null && grantLeaveView.length > 0) {
      setLeaveList(grantLeaveView);
    }

  }, [grantLeaveView])

  const searchHandler = (e) => {
    setSearchValue(e.target.value)

  }

  const searchDataHandler = () => {
    if (searchValue !== "") {
      viewGrantLeave(searchValue);
    } else {
      viewGrantLeave()
    }

  }

  useEffect(() => {
    if (grantLeaveView !== undefined && grantLeaveView !== null && grantLeaveView.length > 0) {
      setLeaveList(grantLeaveView);
    }
  }, [grantLeaveView])
  return (
    <Fragment>
      <Breadcrumb title="Grant Leave " parent=" Grant Leave " />
      <div className="container-fluid">
        <div className="title_bar" style={{ background: "#006EBB" }} >

          <button className="btn btn-light mr-2" onClick={handleShow}>Create</button>
          <div className="job-filter">
            <div className="faq-form mr-2">
              <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
              <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
            </div>
          </div>
        </div>
        <GrantLeaveAdd handleClose={handleClose} modal={modal} />


        <Table id="table-to-xls" className="table table-hover">
          <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
            <tr>
              <th scope="col">S. No</th>
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Cost Centre Id</th>

              <th scope="col">No of Days</th>
              <th scope="col">Year</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {loader === true && currentRecords !== null && currentRecords !== undefined ?
            <tbody>
              <tr>
                <td colspan='6'>
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
            </tbody>

            :
            currentRecords !== undefined && currentRecords !== null &&
              currentRecords.length > 0 ?
              currentRecords.map((item, i) => {
                return (
                  <tbody key={i + 1}>
                    <tr>
                      <td>{i + 1 + indexOfFirstRecord}</td>
                      <td>{item.empId}</td>
                      <td>{item.empName}</td>
                      <td>{item.costCentre}</td>
                      <td>{item.numOfDays}</td>
                      <td>{item.year}</td>
                      <td><Edit2 style={{ color: '#376ebb' }}
                        onClick={() => {
                          setEditModal(true);
                          editHandler(item)
                        }}

                      /></td>
                    </tr>
                  </tbody>

                )
              }) : <tbody>
                <tr>
                  <td colspan='6'>No Record Found</td>
                </tr>
              </tbody>}
        </Table>

        {/*   {(grantLeaveView === null) ?
          <p style={{ textAlign: "center" }}>No Record Found</p> : null}

        {grantLeaveView !== undefined && grantLeaveView !== null && currentRecords.length === 0 ?

          <div className="loader-box loader" style={{ width: "100% !important" }}>
            <div className="loader">
              <div className="line bg-primary"></div>
              <div className="line bg-primary"></div>
              <div className="line bg-primary"></div>
              <div className="line bg-primary"></div>
            </div>
          </div>
          :
          null} */}
        {empLeave !== null && empLeave !== undefined &&
          empLeave.length !== 0 ? <GrantLeaveEdit handleEditClose={handleEditClose}
            modal={editModal}
            editData={empLeave}
          /> : ""}

        <div>
          {searchLeaveList !== undefined && searchLeaveList !== null && searchLeaveList.length > 10 &&
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
    </Fragment>
  )
}

export default GrantLeaveView;
