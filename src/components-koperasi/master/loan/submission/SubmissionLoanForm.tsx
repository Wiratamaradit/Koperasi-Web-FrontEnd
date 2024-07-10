import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TLoan } from "../../../../service/master/Loan";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { userList } from "../../../../service/master/User";

type TLoanForm = {
  formCondition: string;
  selectedData?: any;
  userList: any;
  setDialogForm?: (data: boolean) => void;
  saveCreate?: (data: TLoan) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  userId: Yup.number(),
  nominal: Yup.number()
    .required("Nominal Pinjaman harus di isi")
    .max(10000000, "Maksimal Pinjaman 10 juta"),
  interest: Yup.number(),
  tenor: Yup.string().required("Tenor harus di isi"),
  date: Yup.string().required("Tanggal pengajuan harus di isi"),
  description: Yup.string().required("Deskripsi harus di isi"),
  loanStatus: Yup.string(),
  validationStatus: Yup.string(),
  status: Yup.string(),
});

const initialValues = {
  userId: "",
  nominal: "",
  interest: 2,
  tenor: "",
  date: "",
  description: "",
  loanStatus: "",
  validationStatus: "",
  status: "",
};

const LoanForm = (props: TLoanForm) => {
  const [initData, setInitData] = useState<any>(initialValues);
  const [role, setRole] = useState<String>();
  const [users, setUsers] = useState<any>([]);
  const [dropdownList, setDropdownList] = useState<any>([]);
  const toast = useRef<Toast | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data.user;
    setInitData({
      ...initialValues,
      name: user?.name,
      nik: user?.nik,
      userId: user?.id,
    });
    setRole(user?.role);

    getUserDatas();
  }, []);

  useEffect(() => {
    formik.setValues(initData);
    console.log(initData);
  }, [initData]);

  const getUserDatas = async () => {
    const _users = await userList();
    setDropdownList(
      _users?.data?.data.map((i: any) => ({
        label: `${i.nik} - ${i.name}`,
        value: i.nik,
      }))
    );
    setUsers(_users.data.data);
  };

  const formik = useFormik({
    initialValues: initData,
    validationSchema: schema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (props.formCondition === "Create")
          props.saveCreate!({
            userId: values.userId,
            nominal: values.nominal,
            interest: 2,
            tenor: values.tenor,
            date: values.date,
            description: values.description,
            loanStatus: values.loanStatus,
            validationStatus: values.validationStatus,
            status: values.status,
            reason: values.reason,
          });
        props.setDialogForm!(false);
      } catch (error) {
        props.formCondition === "Create";
        setSubmitting(false);
      }
    },
  });

  console.log(formik.values.userId?.id);
  console.log(formik.errors);
  console.log(dropdownList);

  return (
    <div>
      <form className="form w-100" onSubmit={formik.handleSubmit}>
        <div className="grid">
          {role === "Admin" ? (
            <>
              <div className="col-2">
                <p>NIK</p>
              </div>
              <div className="col-1">
                <p>:</p>
              </div>
              <div className="col-9">
                <Dropdown
                  id="nik"
                  name="nik"
                  placeholder="Pilih nik yang diinginkan"
                  value={formik.values.nik}
                  options={dropdownList}
                  optionLabel="label"
                  onChange={(e) => {
                    const selected = users?.find(
                      (i: any) => i.nik === e.target.value
                    );
                    formik.setFieldValue("nik", e.target.value);
                    formik.setFieldValue("name", selected?.name);
                    formik.setFieldValue("userId", selected?.id);
                  }}
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <>
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
                  value={formik.values.nik}
                  onChange={(e) => {
                    formik.setFieldValue("nik", e.value);
                  }}
                  readOnly
                  className="w-full"
                  useGrouping={false}
                />
              </div>
            </>
          )}

          <div className="col-2">
            <p>Nama Anggota</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <InputText
              id="name"
              name="name"
              value={formik.values.name}
              onChange={(e) => {
                formik.setFieldValue("name", e.target.value);
              }}
              readOnly
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Tanggal Pinjaman</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <Calendar
              id="date"
              name="date"
              placeholder="Masukkan Tanggal Pinjaman"
              value={formik.values.date || null}
              onChange={(e) => {
                formik.setFieldValue("date", e.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nominal Pinjaman</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <InputNumber
              id="nominal"
              name="nominal"
              placeholder="Masukkan Nominal Pinjaman"
              value={formik.values.nominal}
              onChange={(e) => {
                formik.setFieldValue("nominal", e.value);
              }}
              className="w-full"
              max={10000000}
            />
          </div>
          <div className="col-2">
            <p>Bunga</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <InputText
              id="interest"
              name="interest"
              value={"2%"}
              readOnly
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Tenor</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <Dropdown
              id="tenor"
              name="tenor"
              placeholder="Pilih tenor yang diinginkan"
              value={formik.values.tenor}
              options={[
                { label: "Cicilan 6 Bulan", value: 6 },
                { label: "Cicilan 12 Bulan", value: 12 },
              ]}
              optionLabel="label"
              onChange={(e) => {
                formik.setFieldValue("tenor", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Deskripsi</p>
          </div>
          <div className="col-1">
            <p>:</p> 
          </div>
          <div className="col-9">
            <Dropdown
              id="description"
              name="description"
              placeholder="Silahkan pilih  "
              value={formik.values.description}
              options={[
                { label: "Renovasi Rumah", value: "Renovasi Rumah" },
                { label: "Biaya Pendidikan", value: "Biaya Pendidikan" },
                {
                  label: "Kebutuhan Rumah Tangga",
                  value: "Kebutuhan Rumah Tangga",
                },
                { label: "Keperluan Kesehatan", value: "Keperluan Kesehatan" },
                { label: "Konsumtif", value: "Konsumtif" },
                { label: "Travelling", value: "Travelling" },
              ]}
              optionLabel="label"
              onChange={(e) => {
                formik.setFieldValue("description", e.target.value);
              }}
              className="w-full"
            />
            <div className="col-12 flex justify-content-center">
              <Button
                type="submit"
                label="Save"
                size="small"
                severity="success"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
