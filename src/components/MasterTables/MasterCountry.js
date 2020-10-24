import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";
import { MasterFilesContext } from "../../context/MasterFilesState";

const MasterCountry = () => {

  const { user } = useContext(AppContext);
  const { viewCountries, countryList} = useContext(MasterFilesContext);

  useEffect(() =>{
    viewCountries()
    console.log(countryList)
  }, [])

    
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    // uploadFile(fileObj)
    setTimeout(()=>{
      window.location.reload()
    }, 5000)
  }
  return (
    <Fragment>
      <Breadcrumb title="Master" parent="Country Master" />
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
                      filename="countrylist"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div>
            }
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Country Name</th>
                      <th scope="col"> Country Code</th>
                      <th scope="col">Phone Code </th>                    
                    </tr>
                  </thead>   

                  {countryList !== null && countryList !== undefined && countryList.length > 0 &&
                    countryList.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 }</td>
                            <td>{item.countryName}</td>
                            <td>{item.countryCode}</td>
                            <td>{item.phoneCode}</td>
                            
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

export default MasterCountry;