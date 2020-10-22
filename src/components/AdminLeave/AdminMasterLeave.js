import React, { Fragment,  useEffect, useContext, useState } from 'react';
import {Button} from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import './AdminLeaves.css'
import Pagination from 'react-js-pagination'

const AdminMasterLeave = () => {
   /*  const [search, setSearch] = useState('') */
   
    const {leaveMasterView, leaveMasterList, uploadFile} = useContext(AdminContext)

  /*   const [searchResult, setSearchResult] = useState(leaveMasterList) */


    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = leaveMasterList !== null && leaveMasterList.length;
    const pageRange = 10;

   const indexOfLastRecord = currentPage * recordPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
   const currentRecords = leaveMasterList !== null ? leaveMasterList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

   const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
}
/*-----------------Pagination------------------*/

    useEffect(() => {
        leaveMasterView()
    },[])

  /*   const setSearchHandler = (e) => {
        setSearch(e.target.value)

        const result = currentRecords.filter(item => item.stateName.toLowerCase().includes(search.toLowerCase()) )
        setSearchResult(result)
    } */

    const changeHandler = (event)=>{
      let fileObj = event.target.files[0];
      console.log("clicked",fileObj)
      uploadFile(fileObj)
    }
    return (
        <Fragment>
            <Breadcrumb title="Admin" parent=" Leave Master " />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>

                            <div className="title_bar" >
                                {/* <input type='text' value={search} onChange={setSearchHandler}
                                placeholder='Search...' style={{lineHeight:'26px'}} /> */}
                                <input
                                    className="btn"
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={(e) => changeHandler(e)}
                                    style={{ padding: "10px" }}
                                />
                                {/* <Button type='submit' onClick={uploadClick}>Upload</Button> */}
                                <ReactHTMLTableToExcel
                                    className="btn btn-light mr-2"
                                    table="table-to-xls"
                                    filename="leaveMaster"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                            </div>

                            <div className="table-responsive">
                             <table id="table-to-xls" className="table table-hover">
                             <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                 <tr>
                                     <th>S. No</th>
                                     <th>Max Leave</th>
                                     <th>State Name</th>                                            
                                     <th>Year</th>
                                 </tr>
                             </thead>
                             {currentRecords !== null && currentRecords !== undefined &&
                              currentRecords.length>0 &&
                              currentRecords.map((item,i) => {
                                 return(
                                     <tbody key={i+1}>
                                         <tr>
                                             <td>{i+1+indexOfFirstRecord}</td>
                                             <td>{item.maxLeaves}</td>                                                  
                                             <td>{item.stateName}</td>
                                             <td>{item.year}</td>
                                         </tr>
                                     </tbody>
                                 )
                             })}
                         </table>
                            </div>
                        </div>
                    </div>
                </div>
                {leaveMasterList !== null && leaveMasterList.length > 10 &&
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

export default AdminMasterLeave;