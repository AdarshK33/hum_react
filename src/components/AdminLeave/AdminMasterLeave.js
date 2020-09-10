import React, { Fragment, useState, useEffect, useContext } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'

const AdminMasterLeave = () => {

    const {leaveMasterView, leaveMasterList, uploadFile} = useContext(AdminContext)

    useEffect(() => {
        leaveMasterView()
    },[])

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
                                <input
                                    className="btn"
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={changeHandler}
                                    style={{ padding: "10px" }}
                                />
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
                                            <th>Sr.</th>
                                            <th>Leave MasterId</th>
                                            <th>State Name</th>
                                            <th>Max Leaves</th>
                                            <th>Employment Type</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    {leaveMasterList.length>0 &&
                                    leaveMasterList.map((item,i) => {
                                        return(
                                            <tbody key={i}>
                                                <tr>
                                                    <td>{i+1}</td>
                                                    <td>{item.leaveMasterId}</td>
                                                    <td>{item.stateName}</td>
                                                    <td>{item.maxLeaves}</td>
                                                    <td>{item.employmentType}</td>
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
            </div>
        </Fragment>
    );
};

export default AdminMasterLeave;