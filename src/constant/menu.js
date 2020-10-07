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
            { path: '/roster/viewshift', title: 'View Shift', type: 'link' },
        ]
    },
  
    {
        path: '/leaves/leaveview', title: 'Leave View', icon: Calendar, type: 'link', active: false
    },

    {
        path: '/cluster/viewcluster', title: 'Cluster View', icon: File, type: 'link', active: false
    },
    {
        path: '/holiday/holidaylist', title: 'Holiday View', icon: File, type: 'link', active: false
    },
    {
        path: '/salary/salaryview', title: 'Salary Inputs', icon: Package, type: 'link', active: false
    },
    {
        path: '/admin/grantleaveview', title: 'Grant Leave View', icon: File, type: 'link', active: false
    },
   
    {
        title: 'Admin', icon: Calendar, type: 'link', path: '/adminleaves/adminleaveview', active: false,children:[
            { path: '/adminleaves/adminleaveslist', title: 'Admin Leave', type: 'link' },
            { path: '/adminleaves/adminmasterleave', title: 'Leave Master', type: 'link' },
            { path: '/adminleaves/adminleaveapproval', title: 'Leave Approval', type: 'link' },
            { path: '/adminleaves/adminsalarymodule', title: 'Salary Approval', type: 'link' },
        ]
    },
  
    {
        path: '/roster/adminroster', title: 'AdminRoster', icon: File, type: 'link', active: false
    },
    /* {
        title: ' Leave Report', icon: File, path: '/report/leaveReport', title: 'Leave Report', type: 'link', active: false,children:[
            { path: '/report/productivityReport', title: 'Productivity Report', type: 'link' }
        ]
    }, */
    {
        path: '/report/leaveReport', title: 'Leave Report', icon: File, type: 'link', active: false
    },
    {
        path: '/report/productivityReport', title: 'Productivity Report', icon: File, type: 'link', active: false
    },
    
     // product target path    
     {
        title: 'Product Target', icon: File, type: 'link', path: '/product-target/Product-targetview', active: false,children:[
            { path: '/product-target/adminclustertarget', title: 'Admin Cluster Target', type: 'link' },
            { path: '/product-target/leaderclustertarget', title: 'Leader Cluster Target', type: 'link' },
            { path: '/product-target/adminstoretarget', title: 'Admin Store Target', type: 'link' },           
            { path: '/product-target/leaderstoretarget', title: 'Leader Store Target', type: 'link' },
        ]
    },
    
    {
        path: '/rolemanagement', title: 'Role Management', icon: File, type: 'link', active: false
    }
    
]

