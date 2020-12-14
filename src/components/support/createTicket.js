import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import '../common/style.css'
import 'react-dropzone-uploader/dist/styles.css';
import { AppContext } from "../../context/AppState";
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../common/style.css'

const CreateTicket = () => {

    const [role, setRole] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('');
    const [priority, setPriority] = useState('')
    const [filesCount, setFilesCount] = useState([])
    const [fileName, setFileName] = useState([])
    const [loader, setLoader] = useState(false);
    let history = useHistory();
    const { user } = useContext(AppContext);
    const submitHandler = () => {
        history.push("./ticketListingPage")
    }

    useEffect(() => {
        setTimeout(() => { callLoader() }, 2000);
    }, [])

    const callLoader = () => {
        setLoader(true)
    }
    const fileHandler = () => {
        var inp = document.getElementById('fileElementId');
        if (inp.files.length > 3) {
            toast.error("Maximum three files can be selected.")
        }
        else {
            for (var i = 0; i < inp.files.length; ++i) {
                var name = inp.files.item(i).name;
                var size = inp.files.item(i).size / 1000
                // alert("File name: " + name + " size " + size + "kb");
            }
        }
    }



    return (

        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />

            <Container fluid>
                {loader === true ?
                    <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.position} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Cost Center :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.costCentre} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Name :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.firstName + " " + user.lastName} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>FED ID :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.fedId} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Emai Id :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.email} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>




                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Select Role :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                        // value={contractType}

                                        // defaultValue={shiftContractNames.contractType}
                                        // onChange={(e) => getContractType(e)}
                                        >

                                            <option value="">Select Role</option>
                                            {/* {shiftContractNames !== null &&
                                                 shiftContractNames.map((e, i) => { */}
                                                     return (
                                                         <option >

                                            </option>
                                            {/* <option key={e.typeId} value={e.contractType}>
                                                             {e.contractType}
                                                         </option> */}
                                            {/* );
                                                 })} */}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Select Issue and Category :</Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                        // value={contractType}

                                        // defaultValue={shiftContractNames.contractType}
                                        // onChange={(e) => getContractType(e)}
                                        >

                                            <option value="">Select Issue and Category</option>
                                            {/* {shiftContractNames !== null &&
                                                 shiftContractNames.map((e, i) => { */}
                                                     return (
                                                         <option >

                                            </option>
                                            {/* <option key={e.typeId} value={e.contractType}>
                                                             {e.contractType}
                                                         </option> */}
                                            {/* );
                                                 })} */}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Title :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                        // value={contractType}

                                        // defaultValue={shiftContractNames.contractType}
                                        // onChange={(e) => getContractType(e)}
                                        >

                                            <option value="">Select Title</option>
                                            {/* {shiftContractNames !== null &&
                                                 shiftContractNames.map((e, i) => { */}
                                                     return (
                                                         <option >

                                            </option>
                                            {/* <option key={e.typeId} value={e.contractType}>
                                                             {e.contractType}
                                                         </option> */}
                                            {/* );
                                                 })} */}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Description :</Form.Label>
                                    <Col sm='8'>
                                        <textarea className="form-control" rows="3" placeholder="Description.."></textarea>

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>File Upload :</Form.Label>
                                    <Col sm='5'>
                                        <input type="file" id="fileElementId" name="files[]" accept="image/*,video/*,.pdf" multiple="multiple" onChange={() => { fileHandler() }} />
                                    </Col>
                                    <Col sm='3'>
                                        <button className="myclass" style={{ paddingLeft: "30px", paddingRight: "30px", fontWeight: "bold" }}
                                            type="button" >Upload</button>

                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Col sm='4'>

                                    </Col>
                                    <Col sm='8'>
                                        <div className="card">
                                            <div className="card-header text-white bg-primary py-2">List of Files</div>
                                            <ul className="list-group list-group-flush border border-secondary">

                                                <ol className="list-group-item">shift.png</ol>
                                                <ol className="list-group-item">shift.png</ol>

                                            </ul>
                                        </div>
                                        <div className="progress" style={{ height: "12px" }}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>75%</div>
                                        </div>
                                    </Col>

                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Urgency:<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                        // value={contractType}

                                        // defaultValue={shiftContractNames.contractType}
                                        // onChange={(e) => getContractType(e)}
                                        >

                                            <option value="">Select Urgency</option>
                                            {/* {shiftContractNames !== null &&
                                                 shiftContractNames.map((e, i) => { */}
                                                     return (
                                                         <option >

                                            </option>
                                            {/* <option key={e.typeId} value={e.contractType}>
                                                             {e.contractType}
                                                         </option> */}
                                            {/* );
                                                 })} */}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Priority:</Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                        // value={contractType}

                                        // defaultValue={shiftContractNames.contractType}
                                        // onChange={(e) => getPriority(e)}
                                        >

                                            <option value="">Select Priority</option>
                                            {/* {shiftContractNames !== null &&
                                                 shiftContractNames.map((e, i) => { */}
                                                     return (
                                                         <option >

                                            </option>
                                            {/* <option key={e.typeId} value={e.contractType}>
                                                             {e.contractType}
                                                         </option> */}
                                            {/* );
                                                 })} */}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>




                        <br />

                        <Row>
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <button className="myclass" style={{ marginTop: "5px", paddingLeft: "30px", paddingRight: "30px", fontWeight: "bold" }}
                                    onClick={() => { submitHandler() }}
                                    type="button" >Submit</button>
                            </Col>
                        </Row>


                    </Form> :
                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                        <div className="loader">
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                        </div>
                    </div>
                }

            </Container>
        </Fragment >
    );
};

export default CreateTicket;