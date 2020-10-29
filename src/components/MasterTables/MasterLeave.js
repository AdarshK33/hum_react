import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import { Button } from 'react-bootstrap';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import { toast } from "react-toastify";
import {
    JsonToExcel
} from 'react-json-excel';
import Pagination from 'react-js-pagination'

const MasterLeave = () => {

    const { leaveMasterView, leaveMasterList, uploadFile } = useContext(AdminContext)
    const [fileUpload, setFileUpload] = useState();
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
    }, [])

    console.log("leave", leaveMasterList)
    const changeHandler = (event) => {
        let fileObj = event.target.files[0];
        console.log("clicked", fileObj)
        setFileUpload(fileObj)
    }

    const filename = 'masterleave';
    let fields = {
        "masterLeaveId": "S. No",
        "maxLeaves": "Max Leaves",
        "stateName": "State Name",
        "year": "Year",

    }

    let data = [];
    for (let i = 0; i < leaveMasterList.length; i++) {
        // console.log(leaveMasterList[i].holidayDate)
        data.push({
            masterLeaveId: i + 1,
            maxLeaves: leaveMasterList[i].maxLeaves,
            stateName: leaveMasterList[i].stateName,
            year: leaveMasterList[i].year,

        })
    }






    const handleUpload = () => {
        if (fileUpload !== undefined && fileUpload !== null) {
            uploadFile(fileUpload)
        } else {
            toast.info("Please select a file to upload")
        }

        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
    return (
        <Fragment>
            <Breadcrumb title="Admin" parent=" Leave Master " />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>

                            <div className="title_bar" >
                                <input
                                    className="btn"
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={(e) => changeHandler(e)}
                                    style={{ padding: "10px" }}
                                />
                                <Button className="btn btn-light mr-2" onClick={handleUpload}>Upload File</Button>
                                {data.length > 0 &&
                                    <JsonToExcel
                                        data={data}
                                        className="btn btn-light mr-2"
                                        filename={filename}
                                        fields={fields}

                                        text="Export excel"
                                    />}
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
                                        currentRecords.length > 0 &&
                                        currentRecords.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1 + indexOfFirstRecord}</td>
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

export default MasterLeave;