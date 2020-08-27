import React, { Fragment, useState, useContext, useEffect } from 'react';
import TagsInput from 'react-tagsinput'
 import 'react-tagsinput/react-tagsinput.css'
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
const CreateClusterModal=(props)=> {


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
                        <label htmlFor="exampleFormControlInput1"> Select Contract Type</label>
                        <select
                          className="form-control"
                          required
                         >

                          <option value="">Select Contract Type</option>
                         
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
                    
                        <input type="text" className="form-control digit"  />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Cluster Name</label>
                    
                        <input type="text" className="form-control digit"  placeholder="Desc" />
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

                          <option value="">Select Contract Type</option>
                         
                            return (
                              <option>    </option>              
                             
                            );
                        
                        </select>
                      </div>
                    </div>
                  </div>

                  



                    <button type="submit" class="btn btn-primary">Sign in</button>

                </Modal.Body>

            </Modal>
        </Fragment>
    )
}

export default CreateClusterModal
