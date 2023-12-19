import {TUser} from "../../../service/master/user";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Password} from "primereact/password";

type TFormUSer = {
    formCondition: string,
    selectedData?: any,
    setDialogForm?: (data: boolean) => void,
    saveCreate?: (data: TUser) => void,
    saveUpdate?: (data: TUser, id: number) => void,
    saveDelete?: (id: number) => void,
    routeUrl?: string,
    loadingButton?: boolean
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
})

const initialValues = {
    name: '',
    email: '',
    password: '',
    role: ''
}

const FormUser = (props: TFormUSer) => {
    const [initData, setInitData] = useState<any>(initialValues);

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
                        name: values.name,
                        role: values.role,
                        email: values.email,
                        password: values.password,
                    });
                    props.setDialogForm!(false)
                } else if (props.formCondition === "Update") {
                    props.setDialogForm!(false)
                }
            } catch (error) {
                (props.formCondition === 'Update')
                setSubmitting(false);
            }
        },
    });

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
                                        props.setDialogForm!(false)
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
                                            props.setDialogForm!(false)
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
                                <p>Nama</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.name && (
                                    <span style={{color: 'red'}}>{formik.errors.name}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Role</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="role"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={(e) => {
                                        formik.setFieldValue('role', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.role && (
                                    <span style={{color: 'red'}}>{formik.errors.role}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Email</p>
                            </div>
                            <div className="col-9">
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                    className='w-full'
                                />
                                {formik.errors.email && (<span style={{color: 'red'}}>{formik.errors.email}</span>)}
                            </div>
                            <div className="col-3">
                                <p>Password</p>
                            </div>
                            <div className="col-9">
                                <Password
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.setFieldValue('password', e.target.value);
                                    }}
                                    className='w-full'
                                    feedback={false}
                                    tabIndex={1}
                                />
                                {formik.errors.password && (<span style={{color: 'red'}}>{formik.errors.password}</span>)}
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

export default FormUser

