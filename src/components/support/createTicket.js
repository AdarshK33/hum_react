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
import { Users, PlusCircle, MinusCircle } from 'react-feather';
import { client } from '../../utils/axios';
// import { Edit2, Search } from 'react-feather'

import { access_token } from '../../auth/signin';;


const CreateTicket = () => {

    const [role, setRole] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgencyId, setUrgencyId] = useState('');
    const [priority, setPriority] = useState('')
    const [number, setNumber] = useState()
    // const [filesCount, setFilesCount] = useState([])
    const [fileSubmitButton, setFileSubmitButton] = useState();
    const [fileNames, setFileNames] = useState([])
    const [filenames, setFilenames] = useState([])
    const [fileUpload, setFileUpload] = useState();
    const [loader, setLoader] = useState(false);
    const [showFirst, setshowFirst] = useState(false);
    const [showSecond, setshowSecond] = useState(false);
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

    const handleAddUpload = () => {
        if (showFirst !== true) {
            setshowFirst(true);
        } else if (showFirst === true && showSecond !== true) {
            setshowSecond(true);
        } else {
            toast.info("Cannot upload more than 3 files.");
        }
    }

    const handleRemoveUpload = (text) => {
        if (text === "second") {
            setshowFirst(false);
        } else if (text === "third") {
            setshowSecond(false);
        }
    }



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
        console.log("BASE URL CHECK " + process.env.REACT_APP_BASEURL)
        return {
            //url: 'https://httpbin.org/post',
            url: `${process.env.REACT_APP_BASEURL}/ticket/upload`,
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
            console.log("META^^^^^^^^^^^^^^^^^^ " + JSON.stringify(meta))
        } else if (meta.status !== 'done') {
            //  alert(`${meta.name}, upload failed...`)
            // console.log("META^^^^^^^^^^^^^^^^^^ " + JSON.stringify(meta))
        }

    }



    // ===================================================================================
    const changeHandler = (event) => {
        let fName = [];
        let i = 0
        for (i = 0; i < event.target.files.length; i++) {
            let fileObj = event.target.files[i];

            console.log("clicked", fileObj)
            let fileSize = fileObj.size / 1000;
            fName.push({ name: fileObj.name });

            // console.log(filenames)
            if (fileObj.type === "image/png" || fileObj.type === "image/jpeg") {
                if (fileSize <= 200) {
                    setFileSubmitButton(false)
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    setFileSubmitButton(true)
                    toast.info("Cannot upload file with size more than 200 KB")
                }
            }
            else if (fileObj.type === "application/pdf" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                if (fileSize <= 400) {
                    setFileSubmitButton(false)
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    setFileSubmitButton(true)
                    toast.info("Cannot upload file with size more than 400 KB")
                }
            }
            else if (fileObj.type === "video/mp4") {
                if (fileSize <= 3500) {
                    setFileSubmitButton(false)
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    setFileSubmitButton(true)
                    toast.info("Cannot upload file with size more than 3 mb")

                }
            } else {
                toast.info("Please select only .png, .jpeg, .pdf, .xlsx and .mp4")
            }
        }

        setFilenames(fName);
    }


    const handleUpload = () => {
        console.log(fileUpload);
        if (fileUpload !== undefined && fileUpload !== null) {
            uploadDailyQty(fileUpload)
        } else {
            toast.info("Please select a file to upload")
        }
    }
    const uploadDailyQty = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('/ticket/upload', formData)
            .then((response) => {
                console.log(response, "responce")
                fileNames.push({ fileId: 0, fileName: response.data.fileName })
                toast.info(response.data.fileName + " " + response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //========================================================================================


    const onSubmit = e => {

        if (number === 1) {

            e.preventDefault();

            const createSingleTicket = {
                employeeId: user.employeeId,
                categoryId,
                completionStatus: 0,
                description,
                priorityId: priorityListId,
                resolution: null,
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
            history.push("./ticketlistingpage")
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
                resolution: null,
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
            history.push("./ticketlistingpage")
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
                                    <Form.Label column sm='4' className='labels'>Select Issue :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
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
                                    <Col sm='4'>

                                        {/* <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            // onSubmit={handleSubmit}
                                            maxSizeBytes="5e+6"
                                            accept="image/*,.pdf,video/*"
                                            maxFiles={3}
                                            inputContent="Browse file"

                                            styles={{
                                                dropzone: { width: 360, height: 300 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        /> */}
                                        <input
                                            className="btn"
                                            type="file"
                                            accept="image/*,video/*,.pdf"
                                            // multiple="multiple"
                                            onChange={(e) => changeHandler(e)}
                                            style={{ padding: "5px" }}
                                        />
                                        <br />

                                        {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                            return (
                                                <div>{e.name}</div>
                                            );
                                        })}
                                    </Col>
                                    {/* <Form.Group as={Row} >
                                    <Col sm='4'></Col> */}
                                    <Col sm='4'>
                                        <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                            type="button" onClick={handleUpload} disabled={fileSubmitButton}
                                        >Upload</button>
                                        {/* <button className="btn btn-primary mx-2" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                            type="button" onClick={handleAddUpload} disabled={fileSubmitButton}
                                        >+</button> */}
                                        <div style={{ paddingTop: '5px', float: 'right' }}>
                                            <PlusCircle style={{ color: '#376ebb' }}
                                                onClick={handleAddUpload}

                                            />
                                            <MinusCircle disabled style={{ color: 'lightgrey' }}


                                            />
                                        </div>


                                    </Col>

                                    {/* </Form.Group> */}

                                </Form.Group>

                            </Col>
                        </Row>

                        {showFirst === true ?
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm='4' className='labels'></Form.Label>
                                        <Col sm='4'>

                                            {/* <Dropzone
                                        getUploadParams={getUploadParams}
                                        onChangeStatus={handleChangeStatus}
                                        // onSubmit={handleSubmit}
                                        maxSizeBytes="5e+6"
                                        accept="image/*,.pdf,video/*"
                                        maxFiles={3}
                                        inputContent="Browse file"

                                        styles={{
                                            dropzone: { width: 360, height: 300 },
                                            dropzoneActive: { borderColor: 'green' },
                                        }}
                                    /> */}
                                            <input
                                                className="btn"
                                                type="file"
                                                accept="image/*,video/*,.pdf"
                                                // multiple="multiple"
                                                onChange={(e) => changeHandler(e)}
                                                style={{ padding: "5px" }}
                                            />
                                            <br />

                                            {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                                return (
                                                    <div>{e.name}</div>
                                                );
                                            })}
                                        </Col>
                                        {/* <Form.Group as={Row} >
                                <Col sm='4'></Col> */}
                                        <Col sm='4'>
                                            <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                                type="button" onClick={handleUpload} disabled={fileSubmitButton}
                                            >Upload</button>
                                            {/* <button className="btn btn-primary mx-2" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                        type="button" onClick={handleAddUpload} disabled={fileSubmitButton}
                                    >+</button> */}
                                            <div style={{ paddingTop: '5px', float: 'right' }}>
                                                <PlusCircle style={{ color: '#376ebb' }}
                                                    onClick={handleAddUpload}

                                                />
                                                <MinusCircle style={{ color: '#376ebb' }}
                                                    onClick={() => handleRemoveUpload("second")}

                                                />
                                            </div>
                                        </Col>

                                        {/* </Form.Group> */}

                                    </Form.Group>

                                </Col>
                            </Row>
                            : ""}

                        {showSecond === true ?
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm='4' className='labels'></Form.Label>
                                        <Col sm='4'>

                                            {/* <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            // onSubmit={handleSubmit}
                                            maxSizeBytes="5e+6"
                                            accept="image/*,.pdf,video/*"
                                            maxFiles={3}
                                            inputContent="Browse file"

                                            styles={{
                                                dropzone: { width: 360, height: 300 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        /> */}
                                            <input
                                                className="btn"
                                                type="file"
                                                accept="image/*,video/*,.pdf"
                                                // multiple="multiple"
                                                onChange={(e) => changeHandler(e)}
                                                style={{ padding: "5px" }}
                                            />
                                            <br />

                                            {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                                return (
                                                    <div>{e.name}</div>
                                                );
                                            })}
                                        </Col>
                                        {/* <Form.Group as={Row} >
                                    <Col sm='4'></Col> */}
                                        <Col sm='4'>
                                            <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                                type="button" onClick={handleUpload} disabled={fileSubmitButton}
                                            >Upload</button>
                                            {/* <button className="btn btn-primary mx-2" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                            type="button" onClick={handleUpload} disabled={fileSubmitButton}
                                        >+</button> */}
                                            <div style={{ paddingTop: '5px', float: 'right' }}>
                                                <PlusCircle disabled style={{ color: 'lightgrey' }}
                                                    onClick={handleAddUpload}

                                                />
                                                <MinusCircle style={{ color: '#376ebb' }}
                                                    onClick={() => handleRemoveUpload("third")}

                                                />
                                            </div>
                                        </Col>

                                        {/* </Form.Group> */}

                                    </Form.Group>

                                </Col>
                            </Row>
                            : ""}

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

                        <Row>
                            <Col sm={8}>
                                {/* <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>File Upload :</Form.Label>
                                    <Col sm='8'>
                                        <input
                                            className="btn"
                                            type="file"
                                            accept="image/*,video/*,.pdf"
                                            multiple="multiple"
                                            onChange={(e) => changeHandler(e)}
                                            style={{ padding: "5px" }}
                                        />
                                        <br/>
                                        
                                        {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                            return (
                                                <div>{e.name}</div>
                                            );
                                        })}
                                        
                                    </Col>

                                </Form.Group> */}
                                {/* <Form.Group as={Row} >
                                    <Col sm='4'></Col>
                                    <Col sm='3'>
                                        <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                            type="button" onClick={handleUpload} disabled={fileSubmitButton}
                                        >Upload</button>
                                    </Col>

                                </Form.Group> */}

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