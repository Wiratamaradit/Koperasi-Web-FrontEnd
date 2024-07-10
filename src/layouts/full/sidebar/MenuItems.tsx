import {
    IconBellPlus, IconBellRinging, IconBellRinging2, IconCalculator,
    IconLayoutDashboard, IconLicense, IconList, IconMoneybag,
    IconReportMoney, IconUser, IconZoomMoney
} from '@tabler/icons-react';

import {uniqueId} from 'lodash';

const Menuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },
    {
        id: uniqueId(),
        title: 'Beranda',
        icon: IconLayoutDashboard,
        href: '/',
    },

    {
        navlabel: true,
        subheader: 'Data Master',
    },

    {
        id: uniqueId(),
        title: 'Data Anggota',
        icon: IconUser,
        href: '/master/user',
    },
    
    {
        id: uniqueId(),
        title: 'Data Pinjaman',
        icon: IconReportMoney,
        href: '/master/loan',
    },

    {
        id: uniqueId(),
        title: 'Data Simpanan',
        icon: IconMoneybag,
        href: '/master/saving',
    },

    {
        navlabel: true,
        subheader: 'Services',
    },

    {
        id: uniqueId(),
        title: 'Pengajuan Pinjaman',
        icon: IconList,
        href: '/master/loan-submission',
    },

    {
        id: uniqueId(),
        title: 'Pengajuan Simpanan',
        icon: IconLicense,
        href: '/master/savings-submission',
    },

    {
        navlabel: true,
        subheader: 'Supports',
    },

    {
        id: uniqueId(),
        title: 'Simulasi Pinjaman',
        icon: IconCalculator,
        href: '/master/simulation-loan',
    },

    {
        id: uniqueId(),
        title: 'Simulasi Simpanan',
        icon: IconCalculator,
        href: '/master/simulation-saving',
    },

    {
        navlabel: true,
        subheader: 'Validation',
    },

    {
        id: uniqueId(),
        title: 'Validasi Anggota',
        icon: IconBellRinging,
        href: '/master/validation-user',
    },

    {
        id: uniqueId(),
        title: 'Validasi Pinjaman',
        icon: IconBellPlus,
        href: '/master/validation-loan',
    },

    {
        id: uniqueId(),
        title: 'Validasi Simpanan',
        icon: IconBellRinging2,
        href: '/master/validation-saving',
    },
];

export default Menuitems;

