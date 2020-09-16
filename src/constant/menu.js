import {
    Home,
    File,
    Calendar,
    Package,
    
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard/default', title: 'Dashboard', icon: Home, type: 'link', active: false
        // title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
        //     { path: '/dashboard/default', title: 'Default', type: 'link' },
         
         
        // ]
    },
    {
        title: 'Roster', icon: Calendar, type: 'link', path: '/roster/roster', active: false,children:[
           // { path: '/roster/createShift', title: 'Create Shift', type: 'link' },
           //  { path: '/roster/editShift', title: 'Edit Shift', type: 'link' },
            { path: '/roster/viewShift', title: 'View Shift', type: 'link' },
        ]
    },
  
    {
        path: '/Leaves/LeaveView', title: 'Leave View', icon: Calendar, type: 'link', active: false
    },

    {
        path: '/cluster/viewCluster', title: 'Cluster View', icon: File, type: 'link', active: false
    },
    {
        path: '/Holiday/HolidayList', title: 'Holiday View', icon: File, type: 'link', active: false
    },
    {
        path: '/salary/salaryView', title: 'Salary Inputs', icon: Package, type: 'link', active: false
    },
    {
        path: '/admin/GrantLeaveView', title: 'Grant Leave View', icon: File, type: 'link', active: false
    },
   
    {
        title: 'Admin', icon: Calendar, type: 'link', path: '/AdminLeaves/AdminLeaveView', active: false,children:[
            { path: '/AdminLeaves/AdminLeavesList', title: 'Admin Leave', type: 'link' },
            { path: '/AdminLeaves/AdminMasterLeave', title: 'Leave Master', type: 'link' },
            { path: '/AdminLeaves/AdminLeaveApproval', title: 'Leave Approval', type: 'link' },
            { path: '/AdminLeaves/AdminSalaryModule', title: 'Salary Approval', type: 'link' },
        ]
    },
  
    {
        path: '/roster/adminRoster', title: 'AdminRoster', icon: File, type: 'link', active: false
    },
    
    
    

    
]

