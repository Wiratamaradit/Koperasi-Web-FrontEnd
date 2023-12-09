import {
    IconBook2,
    IconCircle,
    IconLayoutDashboard, IconListDetails,
    IconPackage,
    IconReportAnalytics,
    IconUser,
    IconUsers
} from '@tabler/icons-react';

import {uniqueId} from 'lodash';

export type TMenuItem = {
    id?: string;
    title?: string;
    icon?: any;
    href?: string;
    navlabel?: boolean;
    subheader?: string;
    subMenu?: boolean;
    listSubMenu?: any;
    open?: boolean;
};

const MenuRoleNonSubmit: TMenuItem[] = [
    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/',
    },
    {
        id: uniqueId(),
        title: 'Report',
        icon: IconListDetails,
        href: '/report',
    },
];

export default MenuRoleNonSubmit;
