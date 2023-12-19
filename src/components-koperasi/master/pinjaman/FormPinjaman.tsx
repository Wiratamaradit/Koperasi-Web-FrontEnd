import * as Yup from "yup";
import {useFormik} from "formik";
import {useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import clsx from "clsx";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {TPinjaman} from "../../../service/master/pinjaman";
import {Toast} from "primereact/toast";

type TFormPinjaman = {
    formCondition: string,
    selectedData: any,
    pinjamanList: any,
    anggotaList: any,
    setDialogForm: (data: boolean) => void,
    saveCreate?: (data: TPinjaman) => void,
    saveUpdate?: (data: TPinjaman, id: number) => void,
    saveDelete?: (id: number) => void,
    routeUrl?: string,
    loadingButton?: boolean
}

const schema = Yup.object().shape({
    anggotaId: Yup.object().shape({name: Yup.string(), code: Yup.string()}).required('anggota is required'),
    tgl_pinjaman: Yup.string().required('tgl pinjaman is required'),
    pinjaman: Yup.number().required('pinjaman is required'),
    bunga: Yup.number(),
    tenor: Yup.object().shape({name: Yup.string(), code: Yup.string()}).required('tenor is required'),
    jatuh_tempo: Yup.string(),
    deskripsi: Yup.object().shape({name: Yup.string(), code: Yup.string()}).required('deskripsi is required'),
    status: Yup.string()
})

const initialValues = {
    anggotaId: null,
    tgl_pinjaman: null,
    pinjaman: null,
    bunga: null,
    tenor: null,
    jatuh_tempo: null,
    deskripsi: null,
    status: null
}

const FormPinjaman = (props: TFormPinjaman) => {
    const [initData, setInitData] = useState<any>(initialValues);
    const dropdownOptions = (props.anggotaList || []).map((item: any) => {
        return {name: item.name, code: item.id};
    });

    useEffect(() => {
        if (props.formCondition === 'Update') {
            setInitData({
                anggotaId: props.selectedData.anggotas?.code || '',
                tgl_pinjaman: props.selectedData.tgl_pinjaman,
                golongan: props.selectedData.anggotas?.golongan || '',
                pinjaman: props.selectedData.pinjaman,
                bunga: '1,5',
                tenor: props.selectedData.tenor,
                jatuh_tempo: 'Setiap tanggal 25',
                deskripsi: props.selectedData.deskripsi,
                status: props.selectedData.status
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
                if (props.formCondition === "Create") {
                    props.saveCreate!({
                        anggotaId: values.anggotaId?.code,
                        tgl_pinjaman: values.tgl_pinjaman,
                        pinjaman: values.pinjaman,
                        bunga: 1.5,
                        tenor: values.tenor?.code,
                        jatuh_tempo: 'Setiap tanggal 25',
                        deskripsi: values.deskripsi?.code,
                        status: values.status
                    });
                    props.setDialogForm(false)
                } else if (props.formCondition === "Update") {
                    props.saveUpdate!(values, props.selectedData.id);
                    props.setDialogForm(false)
                }
            } catch (error) {
                (props.formCondition === 'Update')
                setSubmitting(false);
            }
        },
    });

    console.log(formik.values.anggotaId.code)
    console.log(formik.errors)

    return (
        <div>
            {
                props.formCondition === 'Delete' && (
                    <div className="grid flex justify-content-center align-items-center">
                        <div className="col-12 text-center">
                            Do you want to delete <strong>{props.selectedData?.id}</strong> ?
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
                )}
            {
                (props.formCondition === "Create" || props.formCondition === "Update") && (
                    <form className='form w-100' onSubmit={formik.handleSubmit}>
                        <div className="grid">
                            <div className="col-3">
                                <p>Anggota</p>
                            </div>
                            <div className="col-9">
                                <Dropdown
                                    id="anggotaId"
                                    name="anggotaId"
                                    placeholder="Pilih Nama Anggota"
                                    value={formik.values.anggotaId}
                                    options={dropdownOptions}
                                    optionLabel="name"
                                    onChange={(e) => {
                                        formik.setFieldValue('anggotaId', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.anggotaId && (<span style={{color: 'red'}}>{formik.errors.anggotaId}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Tanggal Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="tgl_pinjaman"
                                    name="tgl_pinjaman"
                                    placeholder="Masukkan Tanggal Pinjaman"
                                    value={formik.values.tgl_pinjaman}
                                    onChange={(e) => {
                                        formik.setFieldValue('tgl_pinjaman', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.tgl_pinjaman && (
                                    <span style={{color: 'red'}}>{formik.errors.tgl_pinjaman}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Total Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputNumber
                                    id="pinjaman"
                                    name="pinjaman"
                                    placeholder="Masukkan Nominal Pinjaman"
                                    value={formik.values.pinjaman}
                                    onChange={(e) => {
                                        formik.setFieldValue('pinjaman', e.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.pinjaman && (<span style={{color: 'red'}}>{formik.errors.pinjaman}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Bunga</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="bunga"
                                    name="bunga"
                                    value={'1,5'}
                                    readOnly
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Tenor</p>
                            </div>
                            <div className="col-9">
                                <Dropdown
                                    id="tenor"
                                    name="tenor"
                                    placeholder="Pilih tenor yang diinginkan"
                                    value={formik.values.tenor}
                                    options={[
                                        {name: 'Cicilan 6 Bulan', code: (6)},
                                        {name: 'Cicilan 12 Bulan', code: (12)}
                                    ]}
                                    optionLabel='name'
                                    onChange={(e) => {
                                        formik.setFieldValue('tenor', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.tenor && (<span style={{color: 'red'}}>{formik.errors.tenor}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Jatuh Tempo</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="jatuh_tempo"
                                    name="jatuh_tempo"
                                    value={'Setiap tanggal 25'}
                                    readOnly
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Deskripsi</p>
                            </div>
                            <div className="col-9">
                                <Dropdown
                                    id="deskripsi"
                                    name="deskripsi"
                                    placeholder="Silahkan pilih  "
                                    value={formik.values.deskripsi}
                                    options={[
                                        {name: 'Pengajuan Baru', code: 'Pengajuan Baru'},
                                        {name: 'Pengajuan Ulang', code: 'Pengajuan Ulang'}
                                    ]}
                                    optionLabel='name'
                                    onChange={(e) => {
                                        formik.setFieldValue('deskripsi', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.deskripsi && (<span style={{color: 'red'}}>{formik.errors.deskripsi}</span>)}
                            </div>
                            <div className="col-12 flex justify-content-center">
                                <Button type="submit" label="Save" size="small" severity="success"/>
                            </div>
                        </div>
                    </form>
                )}
        </div>
    )
}

export default FormPinjaman