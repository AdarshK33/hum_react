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
        path: '/leaves/leaveView', title: 'Leave View', icon: Calendar, type: 'link', active: false
    },

    {
        path: '/cluster/viewCluster', title: 'Cluster View', icon: File, type: 'link', active: false
    },
    {
        path: '/holiday/holidayList', title: 'Holiday View', icon: File, type: 'link', active: false
    },
    {
        path: '/salary/salaryView', title: 'Salary Inputs', icon: Package, type: 'link', active: false
    },
    {
        path: '/admin/grantLeaveView', title: 'Grant Leave View', icon: File, type: 'link', active: false
    },
   
    {
        title: 'Admin', icon: Calendar, type: 'link', path: '/adminLeaves/adminLeaveView', active: false,children:[
            { path: '/adminLeaves/adminLeavesList', title: 'Admin Leave', type: 'link' },
            { path: '/adminLeaves/adminMasterLeave', title: 'Leave Master', type: 'link' },
            { path: '/adminLeaves/adminLeaveApproval', title: 'Leave Approval', type: 'link' },
            { path: '/adminLeaves/adminSalaryModule', title: 'Salary Approval', type: 'link' },
        ]
    },
  
    {
        path: '/roster/adminRoster', title: 'AdminRoster', icon: File, type: 'link', active: false
    },
    {
        title: 'Manager Report', icon: File, type: 'link', path: '/report/managerReport', active: false,children:[
            { path: '/report/adminReport', title: 'Admin Report', type: 'link' },
            { path: '/report/productivityAdminReport', title: 'Productivity Admin Report', type: 'link' },
            { path: '/report/productivityManagerReport', title: 'Productivity Manager Report', type: 'link' },
        ]
    },
    
     // product target path    
     {
        title: 'Product Target', icon: File, type: 'link', path: '/productTarget/ProductTargetView', active: false,children:[
            { path: '/productTarget/adminClusterTarget', title: 'Admin Cluster Target', type: 'link' },
            { path: '/productTarget/leaderClusterTarget', title: 'Leader Cluster Target', type: 'link' },
            { path: '/productTarget/adminStoreTarget', title: 'Admin Store Target', type: 'link' },           
            { path: '/productTarget/leaderStoreTarget', title: 'Leader Store Target', type: 'link' },
        ]
    }
    

    
]

