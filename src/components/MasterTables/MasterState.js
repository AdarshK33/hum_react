import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";
import { MasterFilesContext } from "../../context/MasterFilesState";

const MasterState = () => {

  
  const { viewStates, stateList, uploadStateFile} = useContext(MasterFilesContext);

  useEffect(() =>{
    viewStates()
    
  }, [])

    
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    uploadStateFile(fileObj)
  }
  return (
    <Fragment>
      <Breadcrumb title="Master" parent="State Master" />
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
                      filename="statelist"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div>
            }
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> State Name</th>
                      <th scope="col"> State Code</th>                                     
                    </tr>
                  </thead>   

                  {stateList !== null && stateList !== undefined && stateList.length > 0 &&
                    stateList.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 }</td>
                            <td>{item.stateName}</td>
                            <td>{item.stateCode}</td>
                            
                            
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

export default MasterState;