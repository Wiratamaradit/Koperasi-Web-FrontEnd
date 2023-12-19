import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import {Card} from "primereact/card";
import React, {useEffect, useRef, useState} from "react";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import {MenuItem} from "primereact/menuitem";
import FullLayout from "../../../src/layouts/full/FullLayout";
import {createPinjaman, listPinjaman, TPinjaman} from "../../../src/service/master/pinjaman";
import FormPinjaman from "../../../src/components-koperasi/master/pinjaman/FormPinjaman";
import {listAnggota} from "../../../src/service/master/anggota";
import {Toast} from "primereact/toast";
import {Panel} from "primereact/panel";
import {useRouter} from "next/router";

const PengajuanPinjaman = () => {
    const breadcrumbItems: MenuItem[] = [
        {label: 'Pengajuan Pinjaman', url: '/master/pengajuan-pinjaman'},
    ];

    const router = useRouter()
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const [list, setLList] = useState<[] | any>([])
    const [anggotaList, setAnggotaList] = useState<[] | any>([]);

    const getAnggota = async () => {
        try {
            const response = await listAnggota();
            setAnggotaList(response.data.data);
        } catch (error: any) {
            toast.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: `${error.response.data.message}`,
                life: 3000
            });
        }
    };

    const getList = async () => {
        try {
            setLoading(true)
            const response = await listPinjaman()
            setLList(response.data.data)
            setLoading(false)
        } catch (error: any) {
            toast.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: `${error.response.data.message}`,
                life: 3000
            });
            setLoading(false)
        }
    }

    const handleCreate = async (data: TPinjaman) => {
        try {
            setLoading(true)
            const response = await createPinjaman({
                anggotaId: data.anggotaId,
                tgl_pinjaman: data.tgl_pinjaman,
                pinjaman: data.pinjaman,
                bunga: data.bunga,
                tenor: data.tenor,
                jatuh_tempo: data.jatuh_tempo,
                deskripsi: data.deskripsi,
                status: data.status
            })
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: `${response.data.message}`,
                life: 3000
            });
            setLoading(false)
            setTimeout(() => {
                router.push('/master/pinjaman')
            }, 2000)
        } catch (error) {
            console.error("Error creating pinjaman:", error);
            toast.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create pinjaman.',
                life: 3000
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        getList()
        getAnggota()
    }, []);

    return (
        <FullLayout>
            <Card
                title="Pengajuan Pinjaman"
                className="mb-2"
                subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                pt={{
                    body: {className: 'border-round border-200 border-2 surface-overlay'},
                    title: {className: 'ml-3 mt-1 text-xl'},
                    subTitle: {className: 'mb-0'},
                }}
            />
            <Toast ref={toast}/>
            <Panel header="Form">
                <FormPinjaman
                    formCondition="Create"
                    saveCreate={(data: TPinjaman) => handleCreate(data)}
                    anggotaList={anggotaList}
                    loadingButton={loading}
                />
            </Panel>
        </FullLayout>
    )
}

export default withSessionCheck(PengajuanPinjaman)