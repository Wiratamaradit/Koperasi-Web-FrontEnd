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

import { uniqueId } from 'lodash';

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
        subheader: 'Data Master',
    },
    {
        id: uniqueId(),
        title: 'Data User',
        icon: IconLayoutDashboard,
        href: '/',
    },
    {
        id: uniqueId(),
        title: 'Data Anggota',
        icon: IconUser,
        href: '/master/anggota',
    },
    {
        id: uniqueId(),
        title: 'Data Pinjaman',
        icon: IconReportMoney,
        href: '/master/pinjaman',
    },

    {
        navlabel: true,
        subheader: 'Utilities',
    },

    {
        id: uniqueId(),
        title: 'Pendaftaran Anggota',
        icon: IconUserPlus,
        href: '/master/pendaftaran',
    },
    {
        id: uniqueId(),
        title: 'Pengajuan Pinjaman',
        icon: IconUserPlus,
        href: '/master/pendaftaran',
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
];

export default Menuitems;

