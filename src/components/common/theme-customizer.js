import React, { Fragment, useState,useContext } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import {GlobalContextTheme} from "../../context/GlobalState";
import ConfigDB from '../../data/customizer/config';

const ThemeCustomizer = () => {
    const { openCustomizer, closeCustomizer, toggle,handleLayout,
        handleSidebarType,handleSidebarSetting,colorChangeTheme,handleCustomizerMix,handleSidebarColor } = useContext(GlobalContextTheme);
    const sidebar_type = localStorage.getItem('wrapper')
    const body_sidebar_type = localStorage.getItem('bodyWrapper');
    const [modal, setModal] = useState();
    const [activeTab, setActiveTab] = useState('1');
    const [activeTab1, setActiveTab1] = useState('1');
   // const configDB = useSelector(content => content.Customizer.customizer);
     const configDB = ConfigDB.data 
    // console.log("****CONFIG DB.."+JSON.stringify(configDB));
    const [layout_type, setLayout_type] = useState(configDB.settings.layout_type);
    configDB.settings.sidebar.wrapper = sidebar_type;
    configDB.settings.sidebar.bodyWrapper = body_sidebar_type;
   
    return (
        <Fragment>
            <div className="customizer-links">
                <div className="nav flex-column nac-pills" id="c-pills-tab" role="tablist" aria-orientation="vertical">
                    <Nav tabs className="tab-list-bottom border-tab-primary">
                        <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                            {/* eslint-disable-next-line */}
                            <NavLink className={activeTab1 == '1' ? 'active' : ''} onClick={() => setActiveTab1('1')}>
                                <div className="settings">
                                    <i className="icofont icofont-ui-settings" onClick={openCustomizer}></i>
                                </div>
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                            {/* eslint-disable-next-line */}
                            <NavLink className={activeTab1 == '2' ? 'active' : ''} onClick={() => setActiveTab1('2')}>
                                <div className="settings color-settings">
                                    <i className="icofont icofont-color-bucket" onClick={openCustomizer}></i>
                                </div>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>
            <div className="customizer-contain">
                <div className="tab-content" id="c-pills-tabContent">
                    <div className="customizer-header">
                        <i className="icon-close" onClick={closeCustomizer}></i>
                        <h5>Customizer</h5>
                        <p className="mb-0">Customize &amp; Preview Real Time</p>
                        <button className="btn btn-primary plus-popup mt-2 " onClick={() => setModal(!modal)}>Configuration</button>
                        <Modal isOpen={modal} toggle={toggle} className="modal-body" centered={true}>
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <div className="container-fluid bd-example-row">
                                    <div className="row">
                                        <p>To replace our design with your desired theme. Please do configuration as mention </p>
                                        <p> <b> Path  data  customizer  config.js </b> </p>
                                    </div>
                                    <pre>
                                        <code>
                                            <div> export class ConfigDB &#123;</div>
                                            <div>  static data = &#123;</div>
                                            <div>   settings&#58; &#123;</div>
                                            <div>       layout_type&#58; : '{configDB.settings.layout_type}',</div>

                                            <div>   sidebar&#58; &#123;</div>
                                            <div>       type&#58; : '{configDB.settings.sidebar.wrapper}'</div>
                                            <div>       body_type&#58; : '{configDB.settings.sidebar.bodyWrapper}' </div>
                                            <div>   &#125;,</div>
                                            <div>       sidebar_setting&#58; : '{configDB.settings.sidebar_setting}' </div>
                                            <div>       sidebar_backround&#58; : '{configDB.settings.sidebar_backround}' </div>
                                            <div>              &#125;,</div>
                                            <div>       color&#58; &#123;</div>
                                            <div>       layout_version&#58; : '{configDB.color.layout_version}' </div>
                                            <div>       color&#58; '{configDB.color.color}' </div>
                                            <div>       primary_color&#58; : '{configDB.color.primary_color}' </div>
                                            <div>       secondary_color&#58; : '{configDB.color.secondary_color}' </div>
                                            <div>       mix_layout&#58; : '{configDB.color.mix_layout}' </div>
                                            <div>           &#125;,</div>
                                            <div>       router_animation&#58; 'fadeIn'</div>
                                            <div>   &#125;</div>
                                            <div>   &#125;</div>
                                        </code>
                                    </pre>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <CopyToClipboard text={JSON.stringify(configDB)}
                                >
                                    <button
                                        className="btn btn-primary notification"
                                        onClick={() => toast.success("Code Copied to clipboard !", {
                                            position: toast.POSITION.BOTTOM_RIGHT
                                        })}
                                    >Copy text</button>
                                </CopyToClipboard>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div className="customizer-body custom-scrollbar">
                        <TabContent activeTab={activeTab1}>
                             <TabPane tabId="1">
                                <h6>Layout Type</h6>
                                <ul className="main-layout layout-grid">
                                    <li data-attr="ltr" className={`${layout_type === 'ltr' ? 'active' : ''}`} onClick={() => handleLayout('ltr')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-light body">
                                                    <span className="badge badge-dark">LTR Layout</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li data-attr="rtl" className={`${layout_type === 'rtl' ? 'active' : ''}`} onClick={() => handleLayout('rtl')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-light body">
                                                    <span className="badge badge-dark">RTL Layout</span>
                                                </li>
                                                <li className="bg-dark sidebar"></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="">Sidebar Type</h6>
                                <ul className="sidebar-type layout-grid">
                                    <li data-attr="normal-sidebar" className="active" onClick={(e) => handleSidebarType(e, 'default', 'default')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-light body"></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li data-attr="compact-sidebar" onClick={(e) => handleSidebarType(e, 'compact-wrapper', 'sidebar-icon')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar compact"></li>
                                                <li className="bg-light body"></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li data-attr="compact-icon-sidebar" onClick={(e) => handleSidebarType(e, 'compact-page', 'sidebar-hover')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar compact-icon"></li>
                                                <li className="bg-light body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li data-attr="horizontal_sidebar" className="horizontal_sidebar" onClick={(e) => handleSidebarType(e, 'horizontal_sidebar', '')}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar horizontal-menu"></li>
                                                <li className="bg-light body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="">Sidebar settings</h6>
                                <ul className="sidebar-setting layout-grid">
                                    <li className="active" data-attr="default-sidebar" onClick={handleSidebarSetting} >
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body bg-light">
                                            <span className="badge badge-dark">Default</span>
                                        </div>
                                    </li>
                                    <li data-attr="border-sidebar" onClick={handleSidebarSetting} >
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body bg-light">
                                            <span className="badge badge-dark">Border</span>
                                        </div>
                                    </li>
                                    <li data-attr="iconcolor-sidebar" onClick={handleSidebarSetting} >
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body bg-light">
                                            <span className="badge badge-dark">icon Color</span>
                                        </div>
                                    </li>
                                </ul>
                            </TabPane> 
                            <TabPane tabId="2">
                                <h6>Light layout</h6>
                                <ul className="layout-grid customizer-color">
                                    <li className="color-layout " data-attr="light-1" data-primary="#4466f2" data-secondary="#1ea6ec" onClick={() => colorChangeTheme('light-1')}> <div></div></li>
                                    <li className="color-layout " data-attr="light-2" data-primary="#0288d1" data-secondary="#26c6da" onClick={() => colorChangeTheme('light-2')}> <div></div></li>
                                    <li className="color-layout" data-attr="light-3" data-primary="#8e24aa" data-secondary="#ff6e40" onClick={() => colorChangeTheme('light-3')}> <div></div></li>
                                    <li className="color-layout" data-attr="light-4" data-primary="#4c2fbf" data-secondary="#2e9de4" onClick={() => colorChangeTheme('light-4')}> <div></div></li>
                                    <li className="color-layout" data-attr="light-5" data-primary="#7c4dff" data-secondary="#7b1fa2" onClick={() => colorChangeTheme('light-5')}> <div></div></li>
                                    <li className="color-layout" data-attr="light-6" data-primary="#3949ab" data-secondary="#4fc3f7" onClick={() => colorChangeTheme('light-6')}> <div></div></li>
                                </ul>
                                <h6 className="">Dark Layout</h6>
                                <ul className="layout-grid customizer-color dark">
                                    <li className="color-layout" data-attr="dark-1" data-primary="#4466f2" data-secondary="#1ea6ec" onClick={() => colorChangeTheme('dark-1')}> <div></div></li>
                                    <li className="color-layout" data-attr="dark-2" data-primary="#0288d1" data-secondary="#26c6da" onClick={() => colorChangeTheme('dark-2')}> <div></div></li>
                                    <li className="color-layout" data-attr="dark-3" data-primary="#8e24aa" data-secondary="#ff6e40" onClick={() => colorChangeTheme('dark-3')}> <div></div></li>
                                    <li className="color-layout" data-attr="dark-4" data-primary="#4c2fbf" data-secondary="#2e9de4" onClick={() => colorChangeTheme('dark-4')}> <div></div></li>
                                    <li className="color-layout" data-attr="dark-5" data-primary="#7c4dff" data-secondary="#7b1fa2" onClick={() => colorChangeTheme('dark-5')}> <div></div></li>
                                    <li className="color-layout" data-attr="dark-6" data-primary="#3949ab" data-secondary="#4fc3f7" onClick={() => colorChangeTheme('dark-6')}> <div></div></li>
                                </ul>
                                <h6 className="">Mix Layout</h6>
                                <ul className="layout-grid customizer-mix">
                                    <li className="color-layout" data-attr="light-only" onClick={handleCustomizerMix}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-light sidebar"></li>
                                                <li className="bg-light body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="color-layout active" data-attr="" onClick={handleCustomizerMix}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-light body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="color-layout" data-attr="dark-body-only" onClick={handleCustomizerMix}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-light sidebar"></li>
                                                <li className="bg-dark body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="color-layout" data-attr="dark-sidebar-body-mix" onClick={handleCustomizerMix}>
                                        <div className="header bg-light">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-dark body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="color-layout" data-attr="dark-header-sidebar-mix" onClick={handleCustomizerMix}>
                                        <div className="header bg-dark">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-light body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="color-layout" data-attr="dark-only" onClick={handleCustomizerMix}>
                                        <div className="header bg-dark">
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="body">
                                            <ul>
                                                <li className="bg-dark sidebar"></li>
                                                <li className="bg-dark body"> </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="">Sidebar background setting</h6>
                                <Nav tabs className="nav-pills nav-primary nac-pills">
                                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                 
                                        <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                            Color
                                                    </NavLink>
                                    </NavItem>
                                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                      
                                        <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                            Pattern
                                                    </NavLink>
                                    </NavItem>
                                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                     
                                        <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                            image
                                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab} className="sidebar-main-bg-setting">
                                    <TabPane tabId="1">
                                        <ul className="sidebar-bg-settings">
                                            <li className="bg-dark active" data-attr="dark-sidebar" onClick={handleSidebarColor} ></li>
                                            <li className="bg-white light-sidebar" data-attr="light-sidebar" onClick={handleSidebarColor} ></li>
                                            <li className="bg-color1" data-attr="color1-sidebar" onClick={handleSidebarColor} > </li>
                                            <li className="bg-color2" data-attr="color2-sidebar" onClick={handleSidebarColor} > </li>
                                            <li className="bg-color3" data-attr="color3-sidebar" onClick={handleSidebarColor} > </li>
                                            <li className="bg-color4" data-attr="color4-sidebar" onClick={handleSidebarColor} > </li>
                                            <li className="bg-color5" data-attr="color5-sidebar" onClick={handleSidebarColor} > </li>
                                        </ul>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ul className="sidebar-bg-settings">
                                            <li className=" bg-pattern1" data-attr="sidebar-pattern1" onClick={handleSidebarColor}> </li>
                                            <li className=" bg-pattern2" data-attr="sidebar-pattern2" onClick={handleSidebarColor}> </li>
                                            <li className=" bg-pattern3" data-attr="sidebar-pattern3" onClick={handleSidebarColor}> </li>
                                            <li className=" bg-pattern4" data-attr="sidebar-pattern4" onClick={handleSidebarColor}> </li>
                                            <li className=" bg-pattern5" data-attr="sidebar-pattern5" onClick={handleSidebarColor}> </li>
                                            <li className=" bg-pattern6" data-attr="sidebar-pattern6" onClick={handleSidebarColor}> </li>
                                        </ul>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ul className="sidebar-bg-settings">
                                            <li className="bg-img1" data-attr="sidebar-img1" onClick={handleSidebarColor}> </li>
                                            <li className="bg-img2" data-attr="sidebar-img2" onClick={handleSidebarColor}> </li>
                                            <li className="bg-img3" data-attr="sidebar-img3" onClick={handleSidebarColor}> </li>
                                            <li className="bg-img4" data-attr="sidebar-img4" onClick={handleSidebarColor}> </li>
                                            <li className="bg-img5" data-attr="sidebar-img5" onClick={handleSidebarColor}> </li>
                                            <li className="bg-img6" data-attr="sidebar-img6" onClick={handleSidebarColor}> </li>
                                        </ul>
                                    </TabPane>
                                </TabContent>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ThemeCustomizer
