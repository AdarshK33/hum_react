import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import {
    JsonToExcel
} from 'react-json-excel';
import { PermissionContext } from '../../context/PermissionState'
const MasterWorkLocation = () => {


    const { locationDetails, locationDetailsList } = useContext(PermissionContext)
    const [fileUpload, setFileUpload] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0;
    let indexOfFirstRecord = 0;
    let indexOfLastRecord = 0;
    const pageRange = 10;
    let currentRecords = [];

    if (locationDetailsList !== null) {
        totalRecords = locationDetailsList.length;
        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = locationDetailsList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    let data = [];
    const filename = 'masterworklocation';
    let fields = {
        "holidayId": "S. No",
        "holidayDate": "Date",
        "holidayName": "Name",
        "year": "Year",
        "state": "State",
        "department": "Department"
    }


    useEffect(() => {
        locationDetails()
    }, [])

    const changeHandler = (event) => {
        let fileObj = event.target.files[0];
        console.log("clicked", fileObj)
        // uploadMasterLocation(fileObj)
    }
    const handleUpload = () => {
        if (fileUpload !== undefined && fileUpload !== null) {
            // uploadFile(fileUpload)
        } else {
            toast.info("Please select a file to upload")
        }

        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
    return (
        <Fragment>
            <Breadcrumb title="Work Location" parent="Work Location" />
            <div className="container-fluid">
                <div className="title_bar" style={{ background: "#006EBB" }} >

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
                </div>


                <div className="table-responsive">
                    <table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th scope="col">S. No</th>
                                <th scope="col">Location Name</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Zone</th>

                                <th scope="col">Flat/Plot No</th>
                                <th scope="col">Street</th>
                                <th scope="col">Locality</th>
                                <th scope="col">Address Line</th>
                                <th scope="col">Pin Code</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Opening Time</th>
                                <th scope="col">Closing Time</th>
                            </tr>
                        </thead>
                        {currentRecords !== null &&
                            currentRecords.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                            <td>{item.locationName}</td>
                                            <td>{item.cityName}</td>
                                            <td>{item.stateName}</td>
                                            <td>{item.zone}</td>

                                            <td>{item.plotNo}</td>
                                            <td>{item.street}</td>
                                            <td>{item.locality}</td>
                                            <td>{item.addressLine}</td>
                                            <td>{item.pinCode}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.openAt}</td>
                                            <td>{item.closeAt}</td>


                                        </tr>
                                    </tbody>

                                )
                            })}
                    </table>
                </div>
                <div>
                    {locationDetailsList !== null && locationDetailsList.length > 10 &&
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

export default MasterWorkLocation;
