import * as Yup from "yup";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import clsx from "clsx";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {TAnggota} from "../../../service/master/anggota";

type TFormAnggota = {
    formCondition: string,
    selectedData: any,
    setDialogForm: (data: boolean) => void,
    saveCreate?: (data: TAnggota) => void,
    saveUpdate?: (data: TAnggota, id: number) => void,
    saveDelete?: (id: number) => void,
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
    status_karyawan: Yup.string(),
    deskripsi: Yup.string(),
    status: Yup.string()
})

const initialValues = {
    nik: 0,
    name: '',
    ttl: '',
    alamat: '',
    departemen: '',
    jabatan: '',
    status_karyawan: '',
    deskripsi: '',
    status: '',
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
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            try {
                if (props.formCondition === 'Create') {
                } else if (props.formCondition === 'Update') {
                    props.saveUpdate!(values, props.selectedData.id)
                    props.setDialogForm(false)
                }
            } catch (error) {
                if (props.formCondition === 'Create') {
                } else if (props.formCondition === 'Update') {
                }

                setSubmitting(false)
            }
        }
    })

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
                                    props.saveDelete!(props.selectedData.id)
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
                                    {'is-invalid': formik.touched.nik && formik.errors.nik},
                                    {
                                        'is-valid': formik.touched.nik && !formik.errors.nik,
                                    }
                                )}
                            >
                                <InputNumber
                                    id="nik"
                                    name="nik"
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
                                    {'is-invalid': formik.touched.name && formik.errors.name},
                                    {
                                        'is-valid': formik.touched.name && !formik.errors.name,
                                    }
                                )}
                            >
                                <InputText
                                    id="name"
                                    name="name"
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
                            <InputText
                                id="departemen"
                                name="departemen"
                                value={formik.values.departemen || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('departemen', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Jabatan</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="jabatan"
                                name="jabatan"
                                value={formik.values.jabatan || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('jabatan', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Status Karyawan</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="status_karyawan"
                                name="status_karyawan"
                                value={formik.values.status_karyawan || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('status_karyawan', e.target.value);
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
                                value={formik.values.deskripsi || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('deskripsi', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-3">
                            <p>Status</p>
                        </div>
                        <div className="col-9">
                            <InputText
                                id="status"
                                name="status"
                                value={formik.values.status || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('status', e.target.value);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12 flex justify-content-center">
                            <Button type="submit" label="Save" size="small" severity="success"/>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}

export default FormAnggota