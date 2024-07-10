import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { TSaving } from "../../../../service/master/Saving";
import { userList } from "../../../../service/master/User";

type TSavingForm = {
  formCondition: string;
  selectedData?: any;
  userList: any;
  setDialogForm?: (data: boolean) => void;
  saveCreate?: (data: TSaving) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  userId: Yup.number(),
  nominalPerMonth: Yup.number().required("Nominal harus di isi"),
  interest: Yup.number(),
  date: Yup.string().required("Tanggal pengajuan harus di isi"),
  paymentMethod: Yup.string().required("Metode pembayaran harus di isi"),
  timePeriod: Yup.number().required("Jangka waktu harus di isi"),
  status: Yup.string(),
});

const initialValues = {
  userId: "",
  nominalPerMonth: "",
  interest: 0.002,
  date: "",
  paymentMethod: "",
  timePeriod: "",
  validationSavingStatus: "",
  status: "",
};

const SavingForm = (props: TSavingForm) => {
  const [initData, setInitData] = useState<any>(initialValues);
  const toast = useRef<Toast | null>(null);
  const [role, setRole] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [dropdownList, setDropdownList] = useState<any>([]);

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
            nominalPerMonth: values.nominalPerMonth,
            interest: 0.002,
            date: values.date,
            paymentMethod: values.paymentMethod,
            timePeriod: values.timePeriod,
            validationSavingStatus: values.validationSavingStatus,
            status: values.status,
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
            <p>Tanggal Pengajuan Simpanan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Calendar
              id="date"
              name="date"
              placeholder="Masukkan Tanggal Pengajuan"
              value={formik.values.date || ""}
              onChange={(e) => {
                formik.setFieldValue("date", e.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Nominal Simpanan per Bulan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputNumber
              id="nominalPerMonth"
              name="nominalPerMonth"
              placeholder="Masukkan Nominal Simpanan per Bulan"
              value={formik.values.nominalPerMonth}
              onChange={(e) => {
                formik.setFieldValue("nominalPerMonth", e.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Bunga Pengembangan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <InputText
              id="interest"
              name="interest"
              value={"0.2%"}
              readOnly
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Metode Pembayaran</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Dropdown
              id="paymentMethod"
              name="paymentMethod"
              placeholder="Pilih metode pembayaran"
              value={formik.values.paymentMethod}
              options={[
                { label: "Transfer", value: "Transfer" },
                { label: "Tunai", value: "Tunai" },
              ]}
              optionLabel="label"
              onChange={(e) => {
                formik.setFieldValue("paymentMethod", e.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <p>Jangka Waktu Simpanan</p>
          </div>
          <div className="col-1">
            <p>:</p>
          </div>
          <div className="col-9">
            <Dropdown
              id="timePeriod"
              name="timePeriod"
              placeholder="Pilih jangka waktu simpanan"
              value={formik.values.timePeriod}
              options={[
                { label: "12 Bulan", value: 12 },
                { label: "18 Bulan", value: 18 },
                { label: "24 Bulan", value: 24 },
              ]}
              optionLabel="label"
              onChange={(e) => {
                formik.setFieldValue("timePeriod", e.target.value);
              }}
              className="w-full"
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
    </div>
  );
};

export default SavingForm;
