import {MenuItem} from "primereact/menuitem";
import {Card} from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, {useEffect, useRef, useState} from "react";
import {createAnggota, deleteAnggota, listAnggota, TAnggota, updateAnggota} from "../../../src/service/master/anggota";
import {Toast} from "primereact/toast";
import TableAnggota from "../../../src/components-koperasi/master/anggota/TableAnggota";
import {Dialog} from "primereact/dialog";
import FormAnggota from "../../../src/components-koperasi/master/anggota/FormAnggota";

const Anggota = () => {
    const breadcrumbItems: MenuItem[] = [
        {label: 'Anggota', url: '/master/anggota'},
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
            const response = await listAnggota()
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

    const handleUpdate = async (data: TAnggota, id: number) => {
        try {
            setLoading(true)
            const response = await updateAnggota({
                nik: data.nik,
                name: data.name,
                ttl: data.ttl,
                alamat: data.alamat,
                departemen: data.departemen,
                jabatan: data.jabatan,
                status_karyawan: data.status_karyawan,
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
            const response = await deleteAnggota(id)
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
            <PageContainer title="Anggota">
                <Toast ref={toast}/>
                <Card
                    title="Anggota"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                    pt={{
                        body: {className: 'border-round border-200 border-2 surface-overlay'},
                        title: {className: 'ml-3 mt-1 text-xl'},
                        subTitle: {className: 'mb-0'},
                    }}
                />
                <TableAnggota
                    data={list}
                    loading={loading}
                    setDialogForm={(data) => setDialogForm(data)}
                    setFormCondition={(data) => setFormCondition(data)}
                    setSelectedData={(data) => setSelectedData(data)}
                />
                <Dialog
                    header={formCondition + ' Data ' + selectedData?.nik}
                    visible={dialogForm}
                    onHide={() => {
                        setFormCondition('')
                        setDialogForm(false)
                        setSelectedData(null)
                    }}
                    style={{width: '30vw'}}
                >
                    <FormAnggota
                        formCondition={formCondition}
                        selectedData={selectedData}
                        setDialogForm={(data) => setDialogForm(data)}
                        saveUpdate={(data, id) => handleUpdate(data, id)}
                        saveDelete={(id) => handleDelete(id)}
                    />
                </Dialog>
            </PageContainer>
        </FullLayout>
    )
}

export default withSessionCheck(Anggota)