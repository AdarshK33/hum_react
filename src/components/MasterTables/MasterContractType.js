import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState';
import { RosterContext } from '../../context/RosterState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'

const MasterContractType = () => {

  const { uploadFile } = useContext(LeaveContext);
  const { viewContractTypes, shiftContractNames} = useContext(RosterContext)


  useEffect(() => {
    viewContractTypes()
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
      <Breadcrumb title="Master" parent= "Contract Type" />
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
                      filename="masterContractType"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div> 
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col">Contract Type</th>
                    </tr>
                  </thead>

                  {shiftContractNames !== null && shiftContractNames !== undefined && shiftContractNames.length > 0 &&
                    shiftContractNames.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.contractType}</td>
                          </tr>
                        </tbody>
                      )
                    })}

                </table>

                {(shiftContractNames === null) ?
                        <p style={{ textAlign: "center" }}>No Record Found</p> : null}
                    
                    {shiftContractNames !== undefined && shiftContractNames !== null && shiftContractNames.length === 0 ?

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

              </div>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

};

export default MasterContractType;