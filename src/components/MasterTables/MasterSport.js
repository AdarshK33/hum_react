import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState';
import { ClusterContext } from '../../context/ClusterState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";

const MasterSport = () => {

  const { uploadFile } = useContext(LeaveContext);
  const { viewSports, sportsNames} = useContext(ClusterContext)
  const { user } = useContext(AppContext);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = sportsNames !== null && sportsNames.length;
  const pageRange = 10;

 const indexOfLastRecord = currentPage * recordPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
 const currentRecords = sportsNames !== null ? sportsNames.slice(indexOfFirstRecord, indexOfLastRecord) : [];

 const handlePageChange = pageNumber => {
  setCurrentPage(pageNumber);
 }
 /*-----------------Pagination------------------*/

  useEffect(() => {
    viewSports()
  }, [])
/* 
  console.log("holida", holidayDataList)
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    uploadFile(fileObj)
  } */
  return (
    <Fragment>
      <Breadcrumb title="Master" parent="Sports" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
            
                  <div className="title_bar" >                   
                   {/*  <input
                      className="btn"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => changeHandler(e)}
                      style={{ padding: "10px" }}
                    /> */}
                    <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="masterSport"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div> 
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col">Sports Name</th>
                    </tr>
                  </thead>

                  {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 &&
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.sportName}</td>
                          </tr>
                        </tbody>
                      )
                    })}

                </table>

              </div>

            </div>
          </div>
        </div>
        {sportsNames !== null && sportsNames.length > 10 &&
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
    </Fragment>
  );

};

export default MasterSport;