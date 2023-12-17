import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import clsx from "clsx";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { TAnggota } from "../../../service/master/anggota";
import { Dropdown } from "primereact/dropdown";

type TFormAnggota = {
    formCondition: string,
    selectedData: any,
    setDialogForm: (data: boolean) => void,
    saveCreate?: (data: TAnggota) => void,
    saveUpdate?: (data: TAnggota, id: number) => void,
    saveDelete?: (id: number) => void,
    routeUrl?: string,
    loadingButton?: boolean
}

const schema = Yup.object().shape({
    nik: Yup.number()
        .required('NIK is required'),
    name: Yup.string()
        .required('Name is required'),
    ttl: Yup.string(),
    alamat: Yup.string(),
    departemen: Yup.string(),
    jabatan: Yup.string(),
    golongan: Yup.string(),
    divisi: Yup.string(),
    status_karyawan: Yup.string(),
    deskripsi: Yup.string(),
})

const initialValues = {
    nik: 0,
    name: '',
    ttl: '',
    alamat: '',
    departemen: '',
    jabatan: '',
    golongan: '',
    divisi: '',
    status_karyawan: '',
    deskripsi: '',
}

const FormAnggota = (props: TFormAnggota) => {

    const [initData, setInitData] = useState<any>(initialValues);

    useEffect(() => {
        if (props.formCondition === 'Update') {
            setInitData({
                nik: props.selectedData.nik,
                name: props.selectedData.name,
                ttl: props.selectedData.ttl,
                alamat: props.selectedData.alamat,
                departemen: props.selectedData.departemen,
                jabatan: props.selectedData.jabatan,
                golongan: props.selectedData.golongan,
                divisi: props.selectedData.divisi,
                status_karyawan: props.selectedData.status_karyawan,
                deskripsi: props.selectedData.deskripsi,
                status: props.selectedData.status,
            })
        }
    }, [props.formCondition]);

    useEffect(() => {
        formik.setValues(initData);
    }, [initData]);

    const formik = useFormik({
        initialValues: initData,
        validationSchema: schema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                (props.formCondition === 'Update')
                props.saveUpdate!(values, props.selectedData.id)
                props.setDialogForm(false)

            } catch (error) {
                (props.formCondition === 'Update')

                setSubmitting(false)
            }
        }
    })

    useEffect(() => {
        const jabatan = formik.values.jabatan;

        const golonganMap: Record<string, string> = {
            'Service Technician': 'Gol 1',
            'Service Coordinator': 'Gol 1',
            'Admin': 'Gol 1',
            'Store Keeper': 'Gol 1',
            'Service Supervisor': 'Gol 2',
            'Service Planner': 'Gol 2',
            'Credit Control': 'Gol 2',
            'Customer Development Executive': 'Gol 2',
            'Service Manager': 'Gol 3',
            'Branch Manager': 'Gol 3',
            'Customer Development Manager': 'Gol 3',
        };

        const selectedGolongan = golonganMap[jabatan] || '';

        formik.setFieldValue('golongan', selectedGolongan);
    }, [formik.values.jabatan]);

    return (
        <div>
            {
                props.formCondition === 'Delete' &&
                <div className="grid flex justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        Do you want to delete <strong>{props.selectedData?.name}</strong> ?
                    </div>
                    <div className="col-12 text-center">
                        <span className="p-buttonset">
                            <Button
                                label="No"
                                severity='secondary'
                                icon="pi pi-times"
                                size="small"
                                onClick={() => {
                                    props.setDialogForm(false)
                                }}
                            />
                            <Button
                                label="Yes"
                                severity='danger'
                                icon="pi pi-trash"
                                size="small"
                                onClick={() => {
                                    if (props.saveDelete) {
                                        props.saveDelete(props.selectedData.id);
                                        props.setDialogForm(false)
                                    }
                                }}
                            />
                        </span>
                    </div>
                </div>
            }
            {
                props.formCondition === 'Update' &&
                <form className='form w-100' onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-3">
                            <p>NIK</p>
                        </div>
                        <div className="col-9">
                            <div

                                className={clsx(
                                    ' w-ful form-control bg-transparent',
                                    { 'is-invalid': formik.touched.nik && formik.errors.nik },
                                    {
                                        'is-valid': formik.touched.nik && !formik.errors.nik,
                                    }
                                )}
                            >
                                <InputNumber
                                    id="nik"
                                    name="nik"
                                    placeholder="Masukkan NIK"
                                    value={formik.values.nik || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('nik', e.value);
                                    }}
                                    className="w-full"
                                    useGrouping={false}
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <p>Name</p>
                        </div>
                        <div className="col-9">
                            <div
                                className={clsx(
                                    ' w-ful form-control bg-transparent',
                                    { 'is-invalid': formik.touched.name && formik.errors.name },
                                    {
                                        'is-valid': formik.touched.name && !formik.errors.name,
                                    }
                                )}
                            >
                                <InputText
                                    id="name"
                                    name="name"
                                    placeholder="Masukkan Nama"
                                    value={formik.values.name || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <p>TTL</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="ttl"
                                name="ttl"
                                placeholder="Masukkan Tempat Tanggal Lahir"
                                value={formik.values.ttl || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('ttl', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Alamat</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="alamat"
                                name="alamat"
                                placeholder="Masukkan Alamat sesuai KTP"
                                value={formik.values.alamat || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('alamat', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Departemen</p>
                        </div>
                        <div className="col-9">
                            <Dropdown
                                id="departemen"
                                name="departemen"
                                placeholder="Pilih Jenis Departemen "
                                optionLabel="label"
                                value={formik.values.departemen || null}
                                options={[
                                    { label: 'Service', value: 'Service' },
                                    { label: 'Admin', value: 'Admin' },
                                    { label: 'Warehouse', value: 'Warehouse' },
                                    { label: 'Sales', value: 'Sales' },
                                    { label: 'SHE', value: 'SHE' }
                                ]}
                                onChange={(e) => {
                                    formik.setFieldValue('departemen', e.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Jabatan</p>
                        </div>
                        <div className="col-9">
                            <Dropdown
                                id="jabatan"
                                name="jabatan"
                                placeholder="Pilih Jabatan Sekarang"
                                optionLabel="label"
                                value={formik.values.jabatan || ''}
                                options={[
                                    { label: 'Service Technician', value: 'Service Technician' },
                                    { label: 'Service Coordinator', value: 'Service Coordinator' },
                                    { label: 'Service Supervisor', value: 'Service Supervisor' },
                                    { label: 'Service Manager', value: 'Service Manager' },
                                    { label: 'Branch Manager', value: 'Branch Manager' },
                                    { label: 'Service Planner', value: 'Service Planner' },
                                    { label: 'Credit Control', value: 'Credit Control' },
                                    { label: 'Admin', value: 'Admin' },
                                    { label: 'Store Keeper', value: 'Store Keeper' },
                                    { label: 'Customer Development Executive', value: 'Customer Development Executive' },
                                    { label: 'Customer Development Manager', value: 'Customer Development Manager' }
                                ]}
                                onChange={(e) => {
                                    formik.setFieldValue('jabatan', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Golongan</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="golongan"
                                name="golongan"
                                value={formik.values.golongan || ''}
                                readOnly // membuatnya menjadi readonly
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Divisi</p>
                        </div>
                        <div className="col-9">
                            <Dropdown
                                id="divisi"
                                name="divisi"
                                placeholder="Pilih Divisi yang sesuai"
                                optionLabel="label"
                                value={formik.values.divisi || null}
                                options={[
                                    { label: 'Pest Control (PT. Rentokil Indonesia)', value: 'Pest Control (PT. Rentokil Indonesia)' },
                                    { label: 'Hygiene (PT. Calmic Indonesia)', value: '(PT. Calmic Indonesia)' },
                                ]}
                                onChange={(e) => {
                                    formik.setFieldValue('divisi', e.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Status Karyawan</p>
                        </div>
                        <div className="col-9">
                            <Dropdown
                                id="status_karyawan"
                                name="status_karyawan"
                                placeholder="Pilih Status Pekerjaan"
                                optionLabel="label"
                                value={formik.values.status_karyawan || null}
                                options={[
                                    { label: 'PKWTT', value: 'PKWTT' },
                                ]}
                                onChange={(e) => {
                                    formik.setFieldValue('status_karyawan', e.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Deskripsi</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="deskripsi"
                                name="deskripsi"
                                placeholder="Masukkan alasan mendaftar"
                                value={formik.values.deskripsi || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('deskripsi', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12 flex justify-content-center">
                            <Button type="submit" label="Save" size="small" severity="success" />
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}

export default FormAnggota