import React, { Fragment, useState, useContext } from 'react';
import Breadcrumb from '../common/breadcrumb';
// import '../common/style.css'
import 'react-dropzone-uploader/dist/styles.css';
import { AppContext } from "../../context/AppState";
import ImageUploader from 'react-images-upload';
import Dropzone from 'react-dropzone-uploader';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


const CreateTicket = () => {


    const dropzoneStyle = {
        width: "100%",
        height: "auto",
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5,
    }
    const { user } = useContext(AppContext);
    const [dropzone, setDropZone] = useState(false);


    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    const handleSubmit = (files, allFiles) => {

        let imageSize = JSON.stringify(allFiles);
        console.log("FILE PROPERTIES .." + imageSize)


        allFiles.forEach(f => f.remove())

    }

    const getPriority = (e) => {
        setDropZone(true)
    }
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    return (
        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />
            <Container fluid>
                <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Ticket Number :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='1001' readOnly className='disabledValue blueText' />
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
                                    <Form.Control type='text' value='AXP 012' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Emai Id :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='Garima.singh@decathlon.in' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value={user.position} readOnly className='disabledValue blueText' />
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
                                <Col sm={4}></Col>
                                <Col sm={8}>
                                    <div class="input-group">

                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01" />
                                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                            <h6>Selected File Name</h6>
                                        </div>
                                        <br />

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
                                        onChange={(e) => getPriority(e)}
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
                    {/* 
                    <form className="dropzone digits" id="singleFileUpload" action="/upload.php">
                        <div className="dz-message needsclick">
                            <Dropzone
                                getUploadParams={getUploadParams}
                                //  onChangeStatus={handleChangeStatus}
                                maxFiles={1}
                                multiple={false}
                                canCancel={false}
                                inputContent="Drop A File"
                                styles={{
                                    dropzone: { width: 400, height: 200 },
                                    dropzoneActive: { borderColor: 'green' },
                                }}
                            />
                        </div>
                    </form> */}
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*,.pdf,video/*"

                        inputContent={(files, extra) => (extra.reject ? 'Only Image, audio and video files allowed!' : 'Select and Drop Files')}
                        style={dropzoneStyle}
                    />
                    <Row>
                        <Col sm={12}>
                            <Form.Group as={Row} >
                                <ImageUploader
                                    withIcon={false}
                                    withPreview={true}
                                    label=""
                                    maxFiles="2"
                                    buttonText="Upload Images"
                                    // onChange={this.onDrop}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                    maxFileSize={1048576}
                                    fileSizeError=" file size is too big"
                                />

                            </Form.Group>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button type='submit'>Submit</Button>
                        </Col>
                    </Row>


                </Form>
            </Container>
        </Fragment>
    );
};

export default CreateTicket;