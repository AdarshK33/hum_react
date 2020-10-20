import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { MasterFilesContext } from "../../context/MasterFilesState";

const MasterDailyQty = () => {

  const {dailyQty, viewDailyQty, uploadDailyQty} = useContext(MasterFilesContext);

  useEffect(() =>{
    viewDailyQty()
  }, [])

    
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    uploadDailyQty(fileObj)
  }
  return (
    <Fragment>
      <Breadcrumb title="Master" parent="Week Master" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
            {                  
                  <div className="title_bar" >                   
                    <input
                      className="btn"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => changeHandler(e)}
                      style={{ padding: "10px" }}
                    />
                    <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="dailyQtyList"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div>
            }
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Store ID</th>
                      <th scope="col">  Date</th>
                      <th scope="col">  Day </th>     
                      <th scope="col"> Week </th>    
                      <th scope="col"> Month </th>  
                      <th scope="col"> To </th>  
                      <th scope="col"> Quantity </th>             
                    </tr>
                  </thead>

                  {dailyQty !== null && dailyQty !== undefined && dailyQty.length > 0 &&
                    dailyQty.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 }</td>
                            <td>{item.dqStoreId}</td>
                            <td>{item.dqDate}</td>
                            <td>{item.dqDay}</td>
                            <td>{item.dqWeek}</td>
                            <td>{item.dqMonth}</td>
                            <td>{item.dqTo}</td>
                            <td>{item.dqQty}</td>
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

export default MasterDailyQty;