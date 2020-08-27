import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap';
// import { Multiselect } from 'multiselect-react-dropdown';
const CreateClusterModal = (props) => {

//   const data =[

//     {country:'India',id:1},
//     {country:'Usa',id:2},
//     {country:'Pakisthan',id:3},
//     {country:'Spain',id:4}

//   ]
// const [options] = useState(data);
  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Create Cluster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row"> 
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"> Select Sports</label>
                <select
                  className="form-control"
                  required
                >

                  <option value="">Select Sports</option>

                            return (
                              <option>    </option>

                            );

                        </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Cluster Name</label>

                <input type="text" className="form-control"  placeholder="Cluster Name"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Cluster Desc</label>

                <input type="text" className="form-control digit" placeholder="Desc" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"> Cluster Leader</label>
                <select
                  className="form-control"
                  required
                >

                  <option value="">Select cluster leader</option>

                            return (
                              <option>    </option>

                            );

                        </select>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"> Select Counttry</label>
                <Multiselect
                displayValue="Counttry"
                options={options}
                />
              </div>
            </div>
          </div> */}



          <button type="submit" class="btn btn-primary">Submit</button>

        </Modal.Body>

      </Modal>
    </Fragment>
  )
}

export default CreateClusterModal
