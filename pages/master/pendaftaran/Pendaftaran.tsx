import {MenuItem} from "primereact/menuitem";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import {Card} from "primereact/card";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import {createAnggota, TAnggota} from "../../../src/service/master/anggota";
import {useRef, useState} from "react";
import {Toast} from "primereact/toast";
import FormPendaftaran from "../../../src/components-koperasi/master/pendaftaran/FormPendaftaran";
import {Panel} from "primereact/panel";
import {useRouter} from "next/router";
import {router} from "next/client";

const Pendaftaran = () => {
    const c = useRouter()
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState<boolean>(false)


    const breadcrumbItems: MenuItem[] = [
        {label: 'Pendaftaran', url: '/master/pendaftaran'},
    ];


    const handleCreate = async (data: TAnggota) => {
        try {
            setLoading(true)
            const response = await createAnggota({
                nik: data.nik,
                name: data.name,
                ttl: data.ttl,
                alamat: data.alamat,
                departemen: data.departemen,
                jabatan: data.jabatan,
                golongan: data.golongan,
                divisi: data.divisi,
                status_karyawan: data.status_karyawan,
                deskripsi: data.deskripsi
            })
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: `${response.data.message}`,
                life: 3000
            });
            setLoading(false)
            setTimeout(() => {
                router.push('/master/anggota')
            }, 2000)

        } catch (error) {
            console.error("Error creating anggota:", error);
            toast.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create anggota.',
                life: 3000
            });

            setLoading(false);
        }
    };

    return (
        <FullLayout>
            <PageContainer title="Pendaftaran">
                <Toast ref={toast}/>
                <Card
                    title="Pendaftaran"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                    pt={{
                        body: {className: 'border-round border-200 border-2 surface-overlay'},
                        title: {className: 'ml-3 mt-1 text-xl'},
                        subTitle: {className: 'mb-0'},
                    }}
                />
                <Panel header="Form">
                    <FormPendaftaran
                        formCondition='Pendaftaran'
                        routeUrl='/master/anggota'
                        saveCreate={(data: TAnggota) => handleCreate(data)}
                        loadingButton={loading}
                    />
                </Panel>

            </PageContainer>
        </FullLayout>
    )
}

export default withSessionCheck(Pendaftaran)
