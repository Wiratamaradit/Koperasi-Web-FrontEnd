import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { TUser } from "../../../../service/master/User";
import { Password } from "primereact/password";

type TRegistrationForm = {
  formCondition: string;
  selectedData?: any;
  setDialogForm?: (data: boolean) => void;
  saveCreate?: (data: TUser) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nama harus di isi"),
  email: Yup.string().required("Email harus di isi"),
  password: Yup.string().required("Password harus di isi"),
  role: Yup.string().required("Role harus di isi"),
  nik: Yup.string().required("NIK harus di isi"),
  position: Yup.string().required("Posisi harus di isi"),
  employeeStatus: Yup.string().required("Status karyawan harus di isi"),
  branchName: Yup.string().required("Nama cabang harus di isi"),
  managerName: Yup.string().required("Nama kepala cabang harus di isi"),
  joinDate: Yup.string().required("Tanggal bergabung harus di isi"),
  address: Yup.string().required("Alamat harus di isi"),
  phoneNumber: Yup.number().required("No. Telpon harus di isi"),
  bankName: Yup.string().required("Nama Bank harus di isi"),
  accountNumber: Yup.number().required("No. Rekening harus di isi"),
  validationStatus: Yup.string(),
  registrationStatus: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  nik: "",
  position: "",
  employeeStatus: "",
  branchName: "",
  managerName: "",
  joinDate: "",
  address: "",
  phoneNumber: "",
  bankName: "",
  accountNumber: "",
  validationStatus: "",
  registrationStatus: "",
};

const RegistrationForm = (props: TRegistrationForm) => {
  const [initData, setInitData] = useState<any>(initialValues);
  const toast = useRef<Toast | null>(null);

  useEffect(() => {
    formik.setValues(initData);
  }, [initData]);

  const formik = useFormik({
    initialValues: initData,
    validationSchema: schema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        props.formCondition === "Pendaftaran";
        props.saveCreate!(values);
        localStorage.setItem("userData", JSON.stringify(values));
      } catch (error) {
        props.formCondition === "Pendaftaran";
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form className="form w-50" onSubmit={formik.handleSubmit}>
        <div className="grid">
          <div className="col-2">
            <p>Nama Lengkap</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="name"
              name="name"
              placeholder="Isi nama lengkap anda"
              value={formik.values.name || ""}
              onChange={(e) => {
                formik.setFieldValue("name", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Email</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="email"
              name="email"
              placeholder="Isi email perusahaan anda"
              value={formik.values.email}
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Password</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Password
              id="password"
              name="password"
              placeholder="Isi min. 8 karakter"
              value={formik.values.password}
              onChange={(e) => {
                formik.setFieldValue("password", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Role</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Dropdown
              id="role"
              name="role"
              placeholder="Pilih role anda"
              optionLabel="label"
              value={formik.values.role || null}
              options={[{ label: "Anggota", value: "Anggota" }]}
              onChange={(e) => {
                formik.setFieldValue("role", e.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>NIK</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputNumber
              id="nik"
              name="nik"
              placeholder="Isikan NIK anda"
              value={formik.values.nik || ""}
              onChange={(e) => {
                formik.setFieldValue("nik", e.value);
              }}
              className="w-full"
              useGrouping={false}
            />
          </div>
          <div className="col-2">
            <p>Posisi/Jabatan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="position"
              name="position"
              placeholder="Isikan jabatan anda"
              value={formik.values.position}
              onChange={(e) => {
                formik.setFieldValue("position", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Status Karyawan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Dropdown
              id="employeeStatus"
              name="employeeStatus"
              placeholder="Pilih status karyawan anda"
              optionLabel="label"
              value={formik.values.employeeStatus || null}
              options={[{ label: "Pegawai Tetap", value: "Pegawai Tetap" }]}
              onChange={(e) => {
                formik.setFieldValue("employeeStatus", e.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nama Cabang</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="branchName"
              name="branchName"
              placeholder="Isikan kantor cabang anda"
              value={formik.values.branchName}
              onChange={(e) => {
                formik.setFieldValue("branchName", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nama Pemimpin Cabang</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="managerName"
              name="managerName"
              placeholder="Isikan nama pemimpin cabang anda"
              value={formik.values.managerName}
              onChange={(e) => {
                formik.setFieldValue("managerName", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Tanggal Bergabung</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Calendar
              id="joinDate"
              name="joinDate"
              placeholder="Pilih tanggal anda bergabung"
              value={formik.values.joinDate || ""}
              onChange={(e) => {
                formik.setFieldValue("joinDate", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Alamat</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="address"
              name="address"
              placeholder="Isikan alamat tempat tinggal anda"
              value={formik.values.address}
              onChange={(e) => {
                formik.setFieldValue("address", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nomor Handphone</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Isikan nomor handphone anda"
              value={formik.values.phoneNumber || ""}
              onChange={(e) => {
                formik.setFieldValue("phoneNumber", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nama Bank</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="bankName"
              name="bankName"
              placeholder="Isikan nama bank yang anda gunakan"
              value={formik.values.bankName}
              onChange={(e) => {
                formik.setFieldValue("bankName", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nomor Rekening</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="accountNumber"
              name="accountNumber"
              placeholder="Isikan nomor rekening gaji anda"
              value={formik.values.accountNumber || ""}
              onChange={(e) => {
                formik.setFieldValue("accountNumber", e.target.value);
              }}
              className="w-full"
              inputMode="numeric"
            />
          </div>
          <div className="col-12 flex justify-content-center">
            <Button
              type="submit"
              label="Save"
              size="small"
              severity="success"
            />
            <Toast ref={toast} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
