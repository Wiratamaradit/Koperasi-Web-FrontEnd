import {MenuItem} from "primereact/menuitem";
import {Card} from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import TablePinjaman from "../../../src/components-koperasi/master/pinjaman/TablePinjaman";
import { deletePinjaman, listPinjaman, TPinjaman, updatePinjaman } from "../../../src/service/master/pinjaman";

const Anggota = () => {
    const breadcrumbItems: MenuItem[] = [
        {label: 'Pinjaman', url: '/master/pinjaman'},
    ];
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [dialogForm, setDialogForm] = useState<boolean>(false)

    const [list, setLList] = useState<[] | any>([])
    const [formCondition, setFormCondition] = useState<string>('')
    const [selectedData, setSelectedData] = useState<any>()

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
                id_anggota: data.id_anggota,
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

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, []);

    return (
        <FullLayout>
            <PageContainer title="Pinjaman">
                <Toast ref={toast}/>
                <Card
                    title="Pinjaman"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                    pt={{
                        body: {className: 'border-round border-200 border-2 surface-overlay'},
                        title: {className: 'ml-3 mt-1 text-xl'},
                        subTitle: {className: 'mb-0'},
                    }}
                />
                <TablePinjaman
                    data={list}
                    loading={loading}
                    setDialogForm={(data) => setDialogForm(data)}
                    setFormCondition={(data) => setFormCondition(data)}
                    setSelectedData={(data) => setSelectedData(data)}
                />
                <Dialog
                    header={formCondition + ' Data ' + selectedData?.id_anggota}
                    visible={dialogForm}
                    onHide={() => {
                        setFormCondition('')
                        setDialogForm(false)
                        setSelectedData(null)
                    }}
                    style={{width: '30vw'}}
                >
                    
                </Dialog>
            </PageContainer>
        </FullLayout>
    )
}

export default withSessionCheck(Anggota)