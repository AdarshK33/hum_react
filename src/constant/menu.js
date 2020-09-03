import {
    Home,
    File,
    Calendar

} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: '/dashboard/default', title: 'Default', type: 'link' },
            { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link' },
            { path: '/dashboard/project/project', title: 'projrct', type: 'link' },
         
        ]
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

    
    
    

    
]

