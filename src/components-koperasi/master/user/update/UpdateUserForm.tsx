import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TLoan } from "../../../../service/master/Loan";
import { TUser } from "../../../../service/master/User";

type TUserForm = {
  formCondition: string;
  selectedData: any;
  setDialogForm: (data: boolean) => void;
  saveUpdate?: (data: TUser, id: number) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  codeUser: Yup.string(),
  name: Yup.string(),
  email: Yup.string(),
  nik: Yup.number(),
  position: Yup.string(),
  employeeStatus: Yup.string(),
  branchName: Yup.string(),
  managerName: Yup.string(),
  joinDate: Yup.string(),
  address: Yup.string(),
  phoneNumber: Yup.number(),
  bankName: Yup.string(),
  accountNumber: Yup.string(),
  reason: Yup.string(),
});

const initialValues = {
  codeUser: "",
  name: "",
  email: "",
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
  reason: "",
};

const FormUpdateLoan = (props: TUserForm) => {
  const [initData, setInitData] = useState<any>(initialValues);

  useEffect(() => {
    if (props.formCondition === "Update") {
      setInitData({
        codeUser: props.selectedData.codeUser,
        name: props.selectedData.name,
        email: props.selectedData.email,
        nik: props.selectedData.nik,
        position: props.selectedData.position,
        employeeStatus: props.selectedData.employeeStatus,
        branchName: props.selectedData.branchName,
        managerName: props.selectedData.managerName,
        joinDate: props.selectedData.joinDate,
        address: props.selectedData.address,
        phoneNumber: props.selectedData.phoneNumber,
        bankName: props.selectedData.bankName,
        accountNumber: props.selectedData.accountNumber,
        reason: props.selectedData.reason,
      });
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
        props.formCondition === "Update";
        props.saveUpdate!(values, props.selectedData.id);
        props.setDialogForm(false);
      } catch (error) {
        props.formCondition === "Update";

        setSubmitting(false);
      }
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    if (formik.values.date) {
      const parsedDate = new Date(formik.values.date);
      setSelectedDate(parsedDate);
    }
  }, [formik.values.date]);

  return (
    <div>
      {props.formCondition === "Update" && (
        <form className="form w-100" onSubmit={formik.handleSubmit}>
          <div className="grid">
          <div className="col-2">
              <p style={{ color: "red", fontWeight: "bold" }}>Notes</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <InputText
                id="reason"
                name="reason"
                value={formik.values.reason}
                onChange={(e) => {
                  formik.setFieldValue("reason", e.target.value);
                }}
                className="w-full"
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </div>
            <div className="col-2">
              <p style={{ color: "red", fontWeight: "bold" }}>Kode Anggota</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <InputText
                id="codeUser"
                name="codeUser"
                value={formik.values.codeUser}
                onChange={(e) => {
                  formik.setFieldValue("codeUser", e.target.value);
                }}
                className="w-full"
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </div>
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
            <InputText
                id="joinDate"
                name="joinDate"
                value={formik.values.joinDate}
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
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormUpdateLoan;
