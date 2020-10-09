import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import GrantLeaveAdd from './GrantLeaveAdd';
import Pagination from 'react-js-pagination'
import { AdminContext } from "../../context/AdminState";
const GrantLeaveView = () => {


  const { viewGrantLeave, grantLeaveView } = useContext(AdminContext);

  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = grantLeaveView.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = grantLeaveView.slice(indexOfFirstRecord, indexOfLastRecord);

  useEffect(() => {
    viewGrantLeave()
  }, [])

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      <Breadcrumb title="Grant Leave " parent=" Grant Leave " />
      <div className="container-fluid">
        <div className="title_bar" style={{ background: "#006EBB" }} >

          <button className="btn btn-light mr-2" onClick={handleShow}>Create</button>
        </div>
        <GrantLeaveAdd handleClose={handleClose} modal={modal} />


        <table id="table-to-xls" className="table table-hover">
          <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
            <tr>
              <th scope="col">S. No</th>
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Cost Centre Id</th>

              <th scope="col">No of Days</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          {currentRecords !== undefined && currentRecords !== null &&
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
                  </tr>
                </tbody>

              )
            })}
        </table>
        <div>
          {grantLeaveView !== null && grantLeaveView.length > 0 &&
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
