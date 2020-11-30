import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { RoleManagementContext } from '../../context/RoleManagementState';
import MultiSelect from 'react-multi-select-component'

const EditRole = (props) => {

    const { viewMenu, MenuList, RoleList, viewRole, EditRole} = useContext(RoleManagementContext);
    const [menuList, setMenuList] = useState([]);
    const [StoreRole, setRoleType] = useState('');
    useEffect(() => {
        viewMenu()
        // viewRole()
      }, [])
      useEffect(() => {
        setRoleType(props.editData[0].role)

        // viewRole()
      }, [props.editData[0].role])
      useEffect(() => {
        setMenuList(props.MenuList)
        // viewRole()
      }, [props.MenuList])
      console.log("props.menuList");

    console.log(menuList);
   
    const onSubmit = e => {
        e.preventDefault();
        console.log(menuList);
        const newPermissions = {
            role: StoreRole,
          
            menuIds: menuList.map((e, i) => menuList[i].value),
          
        }
        EditRole(newPermissions);
        // EmptyMenuList();
        const setModal = props.handleEditClose;
        setModal();
       
        // console.log(newPermissions);
      }

    //   const fromStoreHandler = (e) => {
    //     setRoleType(e);
    // }
      
      const handleMultiChange = (option) => {
        // setClusterButton(false)
        setMenuList(option)
        
      }
      const onRemove=(option)=>{
        
        setMenuList(option)
      }
     
        
      const onCloseModal = () => {
        // EmptyMenuList();
        const setModal = props.handleEditClose;
        setModal();   
        }
    
   
   
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header >
                        <Modal.Title >
                            <h4>Screen Permissions</h4>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" 
                        onClick={onCloseModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <div className="col-sm-12">
                                <Form.Group>
                                        <Form.Label>Role Name :</Form.Label>
                                        <Form.Control as="input" required defaultValue = {StoreRole} readOnly/>                                           
                                </Form.Group>

                                {/* <Form.Group>
                                        <Form.Label>Role Name :</Form.Label>
                                        <Form.Control as="select" required
                                            onChange={(e)=>fromStoreHandler(e.target.value)}
                                            >
                                            <option value="">Select</option>
                                            { RoleList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.roleName}>{e.roleDesc}</option>)
                                                })}
                                        </Form.Control>
                                </Form.Group> */}

                                </div>
                            </Row>
                           
                            {/* <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Role Description :</Form.Label>
                                        <Form.Control as="input" required value = ""/>                                           
                                    </Form.Group>
                                </div>
                            </Row> */}
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Screen Permissions :</Form.Label>
                                       {/* <Multiselect
                                            required
                                            placeholder="Select Permissions"
                                            options={MenuList}
                                            value={menuList}
                                            defaultValue={menuList.menuId}
                                            selectedValues={menuList}
                                            displayValue="menuName"
                                            onSelect={handleMultiChange}
                                            onRemove={onRemove}
                                            showCheckbox={true}
                                            isMulti
                                        /> */}
                                         <MultiSelect
                                            options={MenuList !== null ?
                                                MenuList.map(e => ({ label: e.menuName, value: e.menuId })) : []}
                                            value={menuList}
                                            onChange={handleMultiChange}
                                            defaultValue={menuList.menuName}
                                            labelledBy={"Select"}
                                            hasSelectAll={true}
                                            disableSearch={false}
                                        />
                                                    
                                    </Form.Group>
                                </div>
                            </Row>
                
                            <Button  className="mb-2 mr-2" type="submit" >Submit</Button>
                            <Button className="mb-2 mr-2" onClick={onCloseModal} >close</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>

        </React.Fragment>
    
    );
};

export default EditRole;