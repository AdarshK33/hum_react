import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";
import { toast } from "react-toastify";
import { MasterFilesContext } from "../../context/MasterFilesState";
import {
  JsonToExcel
} from 'react-json-excel';
import { Button } from 'react-bootstrap';

const MasterState = () => {

  
  const { viewStates, stateList, uploadStateFile} = useContext(MasterFilesContext);
  const [fileUpload, setFileUpload] = useState();

  useEffect(() =>{
    viewStates()
    
  }, [])

    
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
  }

  const filename = 'masterStateList';
  let fields = {
    "stateId": "S. No",
    "stateName": "State Name",
    "stateCode": "State Code",
  }

  let data = [];
  for (let i = 0; i < stateList.length; i++) {
    
    data.push({
      stateId: i + 1,
      stateName: stateList[i].stateName,
      stateCode: stateList[i].stateCode
    })
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadStateFile(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
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

                    <Button className="btn btn-light mr-2" onClick={handleUpload}>Upload File</Button>
                    {data.length > 0 &&
                      <JsonToExcel
                        data={data}
                        className="btn btn-light mr-2"
                        filename={filename}
                        fields={fields}

                        text="Export excel"
                      />}
                    {/* <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="statelist"
                      sheet="Sheet"
                      buttonText="Export excel" /> */}
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