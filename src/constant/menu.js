import {
    Home,
    File,
    Headphones
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: '/dashboard/default', title: 'Default', type: 'link' },
            { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link' },
            { path: '/dashboard/university', title: 'University', type: 'link' },
            { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
            { path: '/dashboard/project', title: 'Project', type: 'link' }
        ]
    },
    {
        title: 'Support Ticket', icon: Headphones, type: 'link', path: '/support-ticket/supportTicket', active: false
    },
    {
        path: '/sample/samplepage', title: 'Sample Page', icon: File, type: 'link', active: false
    },
]

