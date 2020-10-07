import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { RoleManagementContext } from '../../context/RoleManagementState';


const AddRole = (props) => {

    const { viewMenu, MenuList, RoleList, viewRole,AddRole,viewRoleListData, RoleListData} = useContext(RoleManagementContext);
    const [menuList, setMenuList] = useState([]);
    const [StoreRole, setRoleType] = useState('');
    useEffect(() => {
        viewRoleListData()
        viewMenu()
        viewRole()
      }, [])
    //   console.log("RoleList");
    // console.log(RoleList);
   
    const onSubmit = e => {
        e.preventDefault();
        let flag = 0;
        console.log(menuList);
        const newPermissions = {
            role: StoreRole,
          
            menuIds: menuList.map((e) => e.menuId),
          
        }
        console.log(RoleListData);
        for (let i = 0; i<RoleListData.length; i++){
            if(StoreRole ===RoleListData[i].role ){
                flag = 1;
            }
        }
        if(flag === 0){
            AddRole(newPermissions);
        }else{
            toast.info("Permission Already exist for " + StoreRole);
        }
        
        const setModal = props.handleClose;
        setModal();
       
        console.log(newPermissions);
      }

      const fromStoreHandler = (e) => {
        setRoleType(e);
    }
      
      const handleMultiChange = (option) => {
        // setClusterButton(false)
        setMenuList(option)
        
      }
      const onRemove=(option)=>{
        
        setMenuList(option)
      }
     
        
      const onCloseModal = () => {
        const setModal = props.handleClose;
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
                                {/* <Form.Group>
                                        <Form.Label>Role Name :</Form.Label>
                                        <Form.Control as="input" required value = "Administrator"/>                                           
                                </Form.Group> */}

                                <Form.Group>
                                        <Form.Label>Role Name :</Form.Label>
                                        <Form.Control as="select" required
                                            onChange={(e)=>fromStoreHandler(e.target.value)}
                                            >
                                            <option value="">Select</option>
                                            { RoleList !== null && RoleList !== undefined && 
                                                RoleList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.roleName}>{e.roleDesc}</option>)
                                                })}
                                        </Form.Control>
                                </Form.Group>

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
                                       <Multiselect
                                            required
                                            placeholder="Select Permissions"
                                            options={MenuList}
                                            value={MenuList}
                                            displayValue="menuName"
                                            onSelect={handleMultiChange}
                                            onRemove={onRemove}
                                            isMulti
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

export default AddRole;