import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';

import App from "./components/app";

// Import custom Components 

import Default from './components/dashboard/defaultCompo/default';
import CryptoComponent from './components/dashboard/crypto/cryptoComponent';
import Project from './components/dashboard/project/project';
// sample page
import Samplepage from './components/sample/samplepage';
import Roster from './components/roster/roster';
// import EditShift from "./components/roster/editShift";
import ViewShift from  "./components/roster/viewShift"
//Leave Page
import LeaveView from './components/Leaves/LeaveView';

//Cluster
import ViewCluster from "./components/cluster/viewCluster"
// Added by Ranjith 31 july 2020
import { GlobalCustomThemeProvider } from './context/GlobalState';
import {RosterProvider} from './context/RosterState';
import {LeaveProvider} from './context/LeaveState'
import {ClusterProvider} from './context/ClusterState';
import HolidayList from './components/Holiday/HolidayList';

//firebase Auth
function Root() {
    useEffect(() => {
        const layout = localStorage.getItem('layout_version')
        document.body.classList.add(layout);
    }, []);
    return (
        <div className="App">
         {/* <Provider store={store}>  */}
         {/* <GlobalCustomThemeProvider> */}
             <RosterProvider>   
                 <LeaveProvider>
                 <ClusterProvider>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <Fragment>
                                <App>
                                    {/* dashboard menu */}
                                    <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} />
                                    {/* <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} /> */}
                              

                                    {/* Sample page */}
                                    <Route path={`${process.env.PUBLIC_URL}/sample/samplepage`} component={Samplepage} />

                                    {/* Leaves Page */}
                                    <Route path={`${process.env.PUBLIC_URL}/Leaves/LeaveView`} component={LeaveView} />
                                    
                                    {/* Roaster */}
                                    <Route path={`${process.env.PUBLIC_URL}/roster/roster`} component={Roster} />
                                   
                                      {/* <Route path={`${process.env.PUBLIC_URL}/roster/editShift`} component={EditShift} />  */}
                                     <Route path={`${process.env.PUBLIC_URL}/roster/viewShift`} component={ViewShift} /> 
                                    {/* Cluster */}
                                  
                                    <Route path={`${process.env.PUBLIC_URL}/cluster/viewCluster`} component={ViewCluster} />
                                    <Route path={`${process.env.PUBLIC_URL}/Holiday/HolidayList`} component={HolidayList} /> 
                                </App>
                            </Fragment>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
             {/* </Provider>  */}
             </ClusterProvider>
             </LeaveProvider>
             </RosterProvider>
             {/* </GlobalCustomThemeProvider> */}
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();