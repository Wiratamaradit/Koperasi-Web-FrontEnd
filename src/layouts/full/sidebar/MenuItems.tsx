import {
    IconAperture,
    IconCopy, IconFileReport,
    IconLayoutDashboard, IconLayoutList, IconList, IconListDetails,
    IconLogin, IconMoneybag,
    IconMoodHappy, IconPigMoney, IconReport,
    IconReportMoney,
    IconTypography, IconUser, IconUserCircle,
    IconUserPlus,
    IconZoomMoney
} from '@tabler/icons-react';

import {uniqueId} from 'lodash';

const Menuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },
    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/',
    },
    {
        navlabel: true,
        subheader: 'Report',
    },
    {
        id: uniqueId(),
        title: 'Laporan',
        icon: IconList,
        href: '/laporan',
    },
    {
        navlabel: true,
        subheader: 'Utilities',
    },
    {
        id: uniqueId(),
        title: 'Pinjaman',
        icon: IconReportMoney,
        href: '/utilities/pinjaman',
    },
    {
        id: uniqueId(),
        title: 'Angsuran',
        icon: IconReport,
        href: '/utilities/angsuran',
    },
    {
        navlabel: true,
        subheader: 'Auth',
    },
    {
        id: uniqueId(),
        title: 'Angggota',
        icon: IconUser,
        href: '/master/anggota',
    },
    {
        id: uniqueId(),
        title: 'Pendaftaran',
        icon: IconUserPlus,
        href: '/master/pendaftaran',
    },
];

export default Menuitems;
