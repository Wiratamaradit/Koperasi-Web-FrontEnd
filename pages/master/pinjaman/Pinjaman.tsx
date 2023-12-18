import { MenuItem } from "primereact/menuitem";
import { Card } from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import TablePinjaman from "../../../src/components-koperasi/master/pinjaman/TablePinjaman";
import { createPinjaman, deletePinjaman, listPinjaman, TPinjaman, updatePinjaman } from "../../../src/service/master/pinjaman";
import { listAnggota, TAnggota } from "../../../src/service/master/anggota";
import FormPinjaman from "../../../src/components-koperasi/master/pinjaman/FormPinjaman";
import router from "next/router";

const Pinjaman = () => {
    const breadcrumbItems: MenuItem[] = [
        { label: 'Pinjaman', url: '/master/pinjaman' },
    ];
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [dialogForm, setDialogForm] = useState<boolean>(false)

    const [list, setLList] = useState<[] | any>([])
    const [pinjamanList, setPinjamanList] = useState<[] | any>([])
    const [formCondition, setFormCondition] = useState<string>('')
    const [selectedData, setSelectedData] = useState<any>()

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

    const handleUpdate = async (data: TPinjaman, id: number) => {
        try {
            setLoading(true)
            const response = await updatePinjaman({
                anggotaId: data.anggotaId,
                tgl_pinjaman: data.tgl_pinjaman,
                pinjaman: data.pinjaman,
                bunga: data.bunga,
                tenor: data.tenor,
                jatuh_tempo: data.jatuh_tempo,
                deskripsi: data.deskripsi,
                status: data.status
            }, id)
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: `${response.data.message}`,
                life: 3000
            });
            getList()
            getAnggota()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            setLoading(true)
            const response = await deletePinjaman(id)
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: `${response.data.message}`,
                life: 3000
            });
            getList()
            getAnggota()
            setLoading(false)
        } catch (error) {
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
            <PageContainer title="Pinjaman">
                <Toast ref={toast} />
                <Card
                    title="Pinjaman"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems} />}
                    pt={{
                        body: { className: 'border-round border-200 border-2 surface-overlay' },
                        title: { className: 'ml-3 mt-1 text-xl' },
                        subTitle: { className: 'mb-0' },
                    }}
                />
                <TablePinjaman
                    data={list}
                    pinjamanList={pinjamanList}
                    loading={loading}
                    setDialogForm={(data) => setDialogForm(data)}
                    setFormCondition={(data) => setFormCondition(data)}
                    setSelectedData={(data) => setSelectedData(data)}
                />
                <Dialog
                    header={formCondition + ' Pinjaman ' + (selectedData ? selectedData?.anggotas.name : '')}
                    visible={dialogForm}
                    onHide={() => {
                        setFormCondition('')
                        setDialogForm(false)
                        setSelectedData(null)
                    }}
                    style={{ width: '30vw' }}
                >
                    <FormPinjaman
                        formCondition={formCondition}
                        selectedData={selectedData}
                        setDialogForm={(data: boolean) => setDialogForm(data)}
                        saveUpdate={(data: TPinjaman, id: number) => handleUpdate(data, id)}
                        saveDelete={(id: number) => handleDelete(id)}
                        saveCreate={(data: TPinjaman) => handleCreate(data)}
                        pinjamanList={pinjamanList}
                        anggotaList={anggotaList}
                    />

                </Dialog>
            </PageContainer>
        </FullLayout>
    )
}

export default withSessionCheck(Pinjaman)