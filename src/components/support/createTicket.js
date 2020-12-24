import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import '../common/style.css'
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader'
import { AppContext } from "../../context/AppState";
import { SupportContext } from "../../context/SupportState"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../common/style.css'
import { Users } from 'react-feather';
import { access_token } from '../../auth/signin';;


const CreateTicket = () => {

    const [role, setRole] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgencyId, setUrgencyId] = useState('');
    const [priority, setPriority] = useState('')
    const [number, setNumber] = useState()
    // const [uploadFileButton, setUploadFileButton] = useState(false)
    // const [filesCount, setFilesCount] = useState([])
    const [fileNames, setFileNames] = useState([])
    //const [fileUpload, setFileUpload] = useState();
    const [loader, setLoader] = useState(false);
    let count = 0;

    let history = useHistory();
    const { user } = useContext(AppContext);
    const { getRolesForSupport, getRoles, getIssueAndCategory,
        getIssueAndCategoryList, selectUrgency, urgencyList, priorityList, selectPriority, addCreateTicket, priorityListId, } = useContext(SupportContext);


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








    const getUploadParams = ({ meta }) => {

        return {
            // url: 'https://httpbin.org/post',
            url: `${process.env.REACT_APP_BASEURL}ticket/upload`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`

            }



        }

    }



    const handleSubmit = (files) => {
        console.log(files.map(f => f.meta))
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        setNumber(1)
        if (meta.status === 'done') {
            // alert(`${meta.name} uploaded!`)
            fileNames.push({ fileId: 0, fileName: meta.name })
            console.log("sucess ", fileNames)
            //remove()
        } else if (meta.status !== 'done') {
            //  alert(`${meta.name}, upload failed...`)
            // console.log("META^^^^^^^^^^^^^^^^^^ " + JSON.stringify(meta))
        }

    }



    const onSubmit = e => {

        if (number === 1) {

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
                ticketFiles: fileNames
            }
            addCreateTicket(createSingleTicket)
            console.log(JSON.stringify(createSingleTicket));
            //alert(JSON.stringify(createSingleTicket));
            setClear()
            history.push("./ticketListingPage")
        }
        else {
            console.log("outside")
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
                                    <Col sm='7'>
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
                                    <Form.Label column sm='4' className='labels'>Select Issue :</Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"

                                            value={categoryId}
                                            onChange={(event) => setcategoryId(event.target.value)}>

                                            <option value="">Select Issue</option>
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
                                        <textarea className="form-control" rows="3" placeholder="Description" maxLength="300" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* <Row>
                            <Col sm={8}>
                              

                                <Form.Group as={Row} >
                                    <Col sm='4'>

                                    </Col>

                                </Form.Group>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>File Upload :</Form.Label>
                                    <Col sm='8'>

                                        <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            // onSubmit={handleSubmit}

                                            accept="image/*,.pdf,video/*"
                                            maxFiles={3}
                                            inputContent="Browse file"

                                            styles={{
                                                dropzone: { width: 360, height: 300 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        />
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
                                <button className="btn btn-primary" style={{ marginTop: "5px", paddingLeft: "30px", paddingRight: "30px", fontWeight: "bold" }}
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