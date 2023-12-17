import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import clsx from "clsx";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TPinjaman } from "../../../service/master/pinjaman";
import { Toast } from "primereact/toast";

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
    id: Yup.string().required('id is required'),
    tgl_pinjaman: Yup.string(),
    pinjaman: Yup.string(),
    bunga: Yup.string(),
    tenor: Yup.string(),
    jatuh_tempo: Yup.string(),
    deskripsi: Yup.string(),
    status: Yup.string()
})

const initialValues = {
    id: '',
    tgl_pinjaman: '',
    pinjaman: '',
    bunga: '',
    tenor: '',
    jatuh_tempo: '',
    deskripsi: '',
    status: ''
}

const FormPinjaman = (props: TFormPinjaman) => {
    const toast = useRef<Toast | null>(null);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [anggotaList, setAnggotaList] = useState([])

    useEffect(() => {
        console.log("anggotaList:", props.anggotaList);
    }, [props.anggotaList]);

    const dropdownOptions = (props.anggotaList || []).map((item: any) => {
        const anggotaId = item.name || '';
        return { label: anggotaId, value: anggotaId };
    });

    const [initData, setInitData] = useState<any>(initialValues);

    useEffect(() => {
        if (props.formCondition === 'Update') {
            setInitData({
                anggota: props.selectedData.anggotas?.id || '',
                tgl_pinjaman: props.selectedData.tgl_pinjaman,
                golongan: props.selectedData.anggotas?.golongan || '',
                pinjaman: props.selectedData.pinjaman,
                bunga: props.selectedData.bunga,
                tenor: props.selectedData.tenor,
                jatuh_tempo: props.selectedData.jatuh_tempo,
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
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                if (props.formCondition === "Pengajuan") {
                    props.saveCreate!(values);
                } else if (props.formCondition === "Update") {
                    props.saveUpdate!(values, props.selectedData.id);
                }
            } catch (error) {
                setSubmitting(false);
            }
        },
    });

    const handleSubmitCreate = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        props.setDialogForm(false);
    }

    const handleYes = () => {
        if (props.saveCreate) {
            props.saveCreate(formik.values);
        }

        setInitData(initialValues);
        setShowConfirmation(false);

        if (toast.current) {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Data saved successfully',
                life: 3000,
            });
        }
    };

    const handleNo = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            {
                props.formCondition === 'Delete' && (
                    <div className="grid flex justify-content-center align-items-center">
                        <div className="col-12 text-center">
                            Do you want to delete <strong>{props.selectedData?.id_pinjaman}</strong> ?
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
                                            props.saveDelete(props.selectedData.id_pinjaman);
                                            props.setDialogForm(false)
                                        }
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                )}
            {
                props.formCondition === 'Update' && (
                    <form className='form w-100' onSubmit={formik.handleSubmit}>
                        <div className="grid">
                            <div className="col-3">
                                <p>Anggota</p>
                            </div>
                            <div className="col-9">
                                <Dropdown
                                    id="anggota"
                                    name="anggota"
                                    placeholder="Pilih Nama Anggota"
                                    value={formik.values.anggota || ''}
                                    options={dropdownOptions}
                                    onChange={(e) => {
                                        formik.setFieldValue('anggota', e.target.value);
                                    }}
                                    className={clsx(
                                        'w-full form-control bg-transparent',
                                        { 'is-invalid': formik.touched.anggota && formik.errors.anggota },
                                        { 'is-valid': formik.touched.anggota && !formik.errors.anggota }
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <p>Tanggal Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="tgl_pinjaman"
                                    name="tgl_pinjaman"
                                    placeholder="Masukkan Tanggal Pinjaman"
                                    value={formik.values.tgl_pinjaman || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('tgl_pinjaman', e.target.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Total Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputNumber
                                    id="pinjaman"
                                    name="pinjaman"
                                    placeholder="Masukkan Nominal Pinjaman"
                                    value={formik.values.pinjaman || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('pinjaman', e.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Bunga</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="bunga"
                                    name="bunga"
                                    value={'1,5'}
                                    readOnly // membuatnya menjadi readonly
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
                                    optionLabel="label"
                                    value={formik.values.tenor || null}
                                    options={[
                                        { label: 'Cicilan 6 Bulan', value: (6) },
                                        { label: 'Cicilan 12 Bulan', value: (12) }
                                    ]}
                                    onChange={(e) => {
                                        formik.setFieldValue('tenor', e.target.value);
                                    }}
                                    className="w-full"
                                />
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
                                    value={formik.values.deskripsi || null}
                                    options={[
                                        { label: 'Pengajuan Baru', value: 'Pengajuan Baru' },
                                        { label: 'Pengajuan Ulang', value: 'Pengajuan Ulang' }
                                    ]}
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
                                <Dropdown
                                    id="status"
                                    name="status"
                                    placeholder="Silahkan pilih "
                                    value={formik.values.status || null}
                                    options={[
                                        { label: 'Diterima', value: 'Diterima' },
                                        { label: 'Ditolak', value: 'Ditolak' }
                                    ]}
                                    onChange={(e) => {
                                        formik.setFieldValue('status', e.target.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 flex justify-content-center">
                                <Button type="submit" label="Save" size="small" severity="success" />
                            </div>
                        </div>
                    </form>
                )}
            {

                props.formCondition === 'Pengajuan' && (
                    <form className='form w-100' onSubmit={handleSubmitCreate}>
                        <div className="grid">
                            <div className="col-3">
                                <p>Anggota</p>
                            </div>
                            <div className="col-9">
                                <Dropdown
                                    id="anggota"
                                    name="anggota"
                                    placeholder="Pilih Nama Anggota"
                                    value={formik.values.anggota || ''}
                                    options={dropdownOptions}
                                    onChange={(e) => {
                                        formik.setFieldValue('anggota', e.target.value);
                                    }}
                                    className={clsx(
                                        'w-full form-control bg-transparent',
                                        { 'is-invalid': formik.touched.anggota && formik.errors.anggota },
                                        { 'is-valid': formik.touched.anggota && !formik.errors.anggota }
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <p>Tanggal Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="tgl_pinjaman"
                                    name="tgl_pinjaman"
                                    placeholder="Masukkan Tanggal Pinjaman"
                                    value={formik.values.tgl_pinjaman || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('tgl_pinjaman', e.target.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Total Pinjaman</p>
                            </div>
                            <div className="col-9">
                                <InputNumber
                                    id="pinjaman"
                                    name="pinjaman"
                                    placeholder="Masukkan Nominal Pinjaman"
                                    value={formik.values.pinjaman || ''}
                                    onChange={(e) => {
                                        formik.setFieldValue('pinjaman', e.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-3">
                                <p>Bunga</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="bunga"
                                    name="bunga"
                                    value={'1,5'}
                                    readOnly // membuatnya menjadi readonly
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
                                    optionLabel="label"
                                    value={formik.values.tenor || null}
                                    options={[
                                        { label: 'Cicilan 6 Bulan', value: (6) },
                                        { label: 'Cicilan 12 Bulan', value: (12) }
                                    ]}
                                    onChange={(e) => {
                                        formik.setFieldValue('tenor', e.target.value);
                                    }}
                                    className="w-full"
                                />
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
                                    placeholder="Masukkan "
                                    value={formik.values.deskripsi || ''}
                                    options={[
                                        { label: 'Pengajuan Baru', value: 'Pengajuan Baru' },
                                        { label: 'Pengajuan Ulang', value: 'Pengajuan Ulang' }
                                    ]}
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
                                <Dropdown
                                    id="status"
                                    name="status"
                                    placeholder="Masukkan "
                                    value={formik.values.status || ''}
                                    options={[
                                        { label: 'Diterima', value: 'Diterima' },
                                        { label: 'Ditolak', value: 'Ditolak' }
                                    ]}
                                    onChange={(e) => {
                                        formik.setFieldValue('status', e.target.value);
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-12 flex justify-content-center">
                                <Button type="submit" label="Save" size="small" severity="success" />
                            </div>
                        </div>
                        showConfirmation (
                        <div className="grid flex justify-content-center align-items-center">
                            <div className="col-12 text-center">
                                Apakah data sudah benar ? <strong>{props.selectedData?.name}</strong> ?
                            </div>
                            <div className="col-12 text-center">
                                <span className="p-buttonset">
                                    <Button
                                        label="No"
                                        severity='secondary'
                                        icon="pi pi-times"
                                        size="small"
                                        onClick={handleNo}
                                    />
                                    <Button
                                        label="Yes"
                                        severity='danger'
                                        icon="pi pi-trash"
                                        size="small"
                                        onClick={handleYes}
                                    />
                                </span>
                            </div>
                        </div>
                        )
                    </form>
                )}
        </div>
    )
}

export default FormPinjaman