import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import '../common/style.css'
import 'react-dropzone-uploader/dist/styles.css';
import { AppContext } from "../../context/AppState";
import { SupportContext } from "../../context/SupportState"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../common/style.css'
import { Users } from 'react-feather';

const CreateTicket = () => {

    const [role, setRole] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgencyId, setUrgencyId] = useState('');
    const [priority, setPriority] = useState('')
    // const [uploadFileButton, setUploadFileButton] = useState(false)
    // const [filesCount, setFilesCount] = useState([])
    // const [fileName, setFileName] = useState([])
    const [fileUpload, setFileUpload] = useState();
    const [loader, setLoader] = useState(false);
    const [inp, setInp] = useState([]);
    let history = useHistory();
    const { user } = useContext(AppContext);
    const { getRolesForSupport, getRoles, getIssueAndCategory,
        getIssueAndCategoryList, selectUrgency, urgencyList, priorityList, selectPriority, addCreateTicket, priorityListId } = useContext(SupportContext);


    useEffect(() => {
        getRolesForSupport()
        getIssueAndCategory()
        selectUrgency()
        setTimeout(() => { callLoader() }, 1500);
    }, [])


    const setClear = () => {
        setRole('')
        setcategoryId('')
        setTitle('')
        setDescription('')
        setUrgencyId('')
        setPriority('')
    }




    const selectValueForDropDownRole = (e) => {
        let data1 = e.target.value
        setRole(data1)
        console.log("data ", data1)
    }
    const selectValueForDropDownUrgency = (e) => {
        let data2 = e.target.value
        setUrgencyId(data2)
        console.log("data ", data2)
        selectPriority(role, data2)
    }


    const callLoader = () => {
        setLoader(true)
    }
    const fileHandler = () => {
        const inp = document.getElementById('fileElementId');


        if (inp.files.length > 3) {
            toast.error("Maximum three files can be selected.")
        }
        else {
            for (var i = 0; i < inp.files.length; ++i) {
                var name = inp.files.item(i).name;
                var size = inp.files.item(i).size / 1024
                alert("File name: " + name + " size " + Math.round(size) + "kb");
            }
            setInp(inp)

        }
    }

    const onSubmit = e => {
        e.preventDefault();

        const createSingleTicket = {
            employeeId: user.employeeId,
            categoryId,
            completionStatus: 0,
            description,
            priorityId: priorityListId,
            resolution: "aaa",
            role,
            storeId: user.costCentre,
            ticketId: 0,
            ticketStatus: 0,
            title,
            urgencyId,
            ticketResolutions: null,
            ticketFiles: null
        }
        addCreateTicket(createSingleTicket)
        console.log(JSON.stringify(createSingleTicket));
        //alert(JSON.stringify(createSingleTicket));
        setClear()
        history.push("./ticketListingPage")
    }

    return (

        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />

            <Container fluid>
                {loader === true ?
                    <Form style={{ backgroundColor: 'white', padding: '3rem' }} onSubmit={onSubmit}>
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
                                            value={role}
                                            defaultValue={getRoles.name}
                                            onChange={(e) => selectValueForDropDownRole(e)}>


                                            <option value="">Select Role</option>
                                            {getRoles !== null &&
                                                getRoles.map((e, i) => {
                                                    return (
                                                        <option key={e.value} value={e.value}>
                                                            {e.name}
                                                        </option>
                                                    );
                                                })}
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
                                            value={categoryId}
                                            onChange={(event) => setcategoryId(event.target.value)}>

                                            <option value="">Select Urgency</option>
                                            {getIssueAndCategoryList !== null &&
                                                getIssueAndCategoryList.map((e, i) => {
                                                    return (
                                                        <option key={e.categoryId} value={e.categoryId}>
                                                            {e.categoryName}
                                                        </option>
                                                    );
                                                })}
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
                                        <input type="text" style={{ fontSize: "0.8rem" }} className="form-control" value={title} placeholder="Title" maxLength="50" required onChange={(event) => setTitle(event.target.value)} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Description :</Form.Label>
                                    <Col sm='8'>

                                        <textarea className="form-control" rows="3" placeholder="Description" maxLength="300" value={description} required onChange={(event) => setDescription(event.target.value)}></textarea>
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
                                            <div className="card-header text-white py-2" style={{ backgroundColor: "#006EBB" }}>List of Files</div>
                                            <ul className="list-group list-group-flush border border-secondary">

                                                <ol className="list-group-item" >image1.png</ol>
                                                <ol className="list-group-item">image2.png</ol>

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
                                            value={urgencyId}
                                            //     defaultValue={urgencyList.categoryName}
                                            onChange={(e) => selectValueForDropDownUrgency(e)}>

                                            <option value="">Select Urgency</option>
                                            {urgencyList !== null &&
                                                urgencyList.map((e, i) => {
                                                    return (
                                                        <option key={e.urgencyId} value={e.urgencyId}>
                                                            {e.urgencyName}
                                                        </option>
                                                    );
                                                })}
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

                                        <input type="text" value={priority} style={{ fontSize: "0.8rem" }} className="form-control"
                                            readOnly placeholder={priorityList} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>



                        <br />

                        <Row>
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <button className="myclass" style={{ marginTop: "5px", paddingLeft: "30px", paddingRight: "30px", fontWeight: "bold" }}
                                    type="submit" value="Submit"
                                >Submit</button>
                            </Col>
                        </Row>
                    </Form>


                    :
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