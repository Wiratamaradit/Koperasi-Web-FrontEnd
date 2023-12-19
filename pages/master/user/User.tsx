import withSessionCheck from "../../../src/base/utils/WithAuth";
import FullLayout from "../../../src/layouts/full/FullLayout";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import {Card} from "primereact/card";
import React, {useEffect, useRef, useState} from "react";
import {MenuItem} from "primereact/menuitem";
import {Toast} from "primereact/toast";
import PageContainer from "../../../src/components/container/PageContainer";
import {createUser, deleteUSer, listUser, TUser, updateUSer} from "../../../src/service/master/user";
import TableUser from "../../../src/components-koperasi/master/user/TableUser";
import {Dialog} from "primereact/dialog";
import FormUser from "../../../src/components-koperasi/master/user/FormUser";
import {createPinjaman, deletePinjaman, TPinjaman, updatePinjaman} from "../../../src/service/master/pinjaman";

const User = () => {
    const breadcrumbItems: MenuItem[] = [
        {label: 'User', url: '/master/user'},
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
            const response = await listUser()
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

    const handleUpdate = async (data: TUser, id: number) => {
        try {
            setLoading(true)
            const response = await updateUSer({
                name: data.name,
                role: data.role,
                email: data.email,
                password: data.password,
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
            const response = await deleteUSer(id)
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
    const handleCreate = async (data: TUser) => {
        try {
            setLoading(true)
            const response = await createUser({
                name: data.name,
                role: data.role,
                email: data.email,
                password: data.password,
            })
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: `${response.data.message}`,
                life: 3000
            });
            setLoading(false)
            getList()
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
    }, []);

    return (
        <FullLayout>
            <PageContainer title="User">
                <Toast ref={toast}/>
                <Card
                    title="User"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                    pt={{
                        body: {className: 'border-round border-200 border-2 surface-overlay'},
                        title: {className: 'ml-3 mt-1 text-xl'},
                        subTitle: {className: 'mb-0'},
                    }}
                />
                <TableUser
                    data={list}
                    loading={loading}
                    setDialogForm={(data) => setDialogForm(data)}
                    setFormCondition={(data) => setFormCondition(data)}
                    setSelectedData={(data) => setSelectedData(data)}
                />
                <Dialog
                    header={formCondition + ' User ' + (selectedData ? '' : '')}
                    visible={dialogForm}
                    onHide={() => {
                        setFormCondition('')
                        setDialogForm(false)
                        setSelectedData(null)
                    }}
                    style={{width: '30vw'}}
                >

                    <FormUser
                        formCondition={formCondition}
                        selectedData={selectedData}
                        setDialogForm={(data: boolean) => setDialogForm(data)}
                        saveUpdate={(data: TUser, id: number) => handleUpdate(data, id)}
                        saveDelete={(id: number) => handleDelete(id)}
                        saveCreate={(data: TUser) => handleCreate(data)}
                    />

                </Dialog>
            </PageContainer>

        </FullLayout>
    )
}

export default withSessionCheck(User)