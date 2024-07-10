import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TLoan } from "../../../../service/master/Loan";

type TLoanForm = {
  formCondition: string;
  selectedData: any;
  setDialogForm: (data: boolean) => void;
  saveUpdate?: (data: TLoan, id: number) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  userId: Yup.number(),
  nominal: Yup.number(),
  interest: Yup.number(),
  tenor: Yup.number(),
  date: Yup.string(),
  description: Yup.string(),
  loanStatus: Yup.string(),
  validationStatus: Yup.string(),
  status: Yup.string(),
  reason: Yup.string(),
});

const initialValues = {
  userId: 0,
  nominal: "",
  interest: "",
  tenor: "",
  date: "",
  description: "",
  loanStatus: "",
  validationStatus: "",
  status: "",
  reason: "",
};

const FormUpdateLoan = (props: TLoanForm) => {
  const [initData, setInitData] = useState<any>(initialValues);

  useEffect(() => {
    if (props.formCondition === "Update") {
      setInitData({
        userId: props.selectedData.user.Id,
        code: props.selectedData.code,
        nominal: props.selectedData.nominal,
        interest: props.selectedData.interest,
        tenor: props.selectedData.tenor,
        date: props.selectedData.date,
        description: props.selectedData.description,
        loanStatus: props.selectedData.loanStatus,
        validationStatus: props.selectedData.validationStatus,
        status: props.selectedData.status,
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
              <p style={{ color: "red", fontWeight: "bold" }}>Kode Pinjaman</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <InputText
                id="code"
                name="code"
                value={formik.values.code}
                onChange={(e) => {
                  formik.setFieldValue("code", e.target.value);
                }}
                className="w-full"
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </div>
            <div className="col-2">
              <p>Tanggal Pinjaman</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <InputText
                id="date"
                name="date"
                placeholder="Masukkan Tanggal Pinjaman"
                value={formik.values.date}
                onChange={(e) => {
                  formik.setFieldValue("date", e.target.value);
                }}
                className="w-full"
                disabled
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
                placeholder="Silahkan pilih"
                value={formik.values.description}
                options={[
                  { label: "Renovasi Rumah", value: "Renovasi Rumah" },
                  { label: "Biaya Pendidikan", value: "Biaya Pendidikan" },
                  {
                    label: "Kebutuhan Rumah Tangga",
                    value: "Kebutuhan Rumah Tangga",
                  },
                  {
                    label: "Keperluan Kesehatan",
                    value: "Keperluan Kesehatan",
                  },
                  { label: "Konsumtif", value: "Konsumtif" },
                  { label: "Travelling", value: "Travelling" },
                ]}
                optionLabel="label"
                onChange={(e) => {
                  formik.setFieldValue("description", e.target.value);
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
      )}
    </div>
  );
};

export default FormUpdateLoan;

