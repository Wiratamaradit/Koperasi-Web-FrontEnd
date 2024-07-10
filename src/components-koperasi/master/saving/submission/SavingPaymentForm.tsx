import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { TSavePay } from "../../../../service/master/SavingPayment";

type TSavePayForm = {
  formCondition: string;
  selectedData?: any;
  setDialogForm: (data: boolean) => void;
  saveCreate?: (data: TSavePay) => void;
  routeUrl?: string;
  loadingButton?: boolean;
};

const schema = Yup.object().shape({
  saveId: Yup.number(),
  userId: Yup.number(),
  nominal: Yup.number().required("Nominal harus di isi"),
  paymentMethod: Yup.string().required("Metode pembayaran harus di isi"),
  date: Yup.string().required("Tanggal pengajuan harus di isi"),
  status: Yup.string(),
});

const initialValues = {
  saveId: 0,
  userId: 0,
  nominal: "",
  paymentMethod: "Cash",
  date: "",
  status: "Paid",
};

const SavePayForm = (props: TSavePayForm) => {
  const [initData, setInitData] = useState<any>(initialValues)
  const toast = useRef<Toast | null>(null)

  useEffect(() => {
    if (props.formCondition === "Payment" && props.selectedData) {
      setInitData({
        ...initialValues,
        saveId: props.selectedData.id,
        userId: props.selectedData.user.id,
      });
    }
  }, [props.formCondition, props.selectedData]);


  useEffect(() => {
    formik.setValues(initData);
    console.log(initData);
  }, [initData]);

  const formik = useFormik({
    initialValues: initData,
    validationSchema: schema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (props.formCondition === "Payment")
          props.saveCreate!({
            saveId: values.saveId,
            userId: values.userId,
            nominal: values.nominal,
            paymentMethod: values.paymentMethod,
            date: values.date,
            status: values.status,
          });
        props.setDialogForm!(false);
      } catch (error) {
        props.formCondition === "Payment";
        setSubmitting(false);
      }
    },
  });

  console.log(formik.values.userId?.id);
  console.log(formik.errors);

  return (
    <div>
      {props.formCondition === "Payment" && (
        <form className="form w-100" onSubmit={formik.handleSubmit}>
          <div className="grid">
            <div className="col-2">
              <p>Nominal Simpanan</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <InputNumber
                id="nominal"
                name="nominal"
                placeholder="Masukkan Nominal"
                value={formik.values.nominal}
                onChange={(e) => {
                  formik.setFieldValue("nominal", e.value);
                }}
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
              <InputText
                id="paymentMethod"
                name="paymentMethod"
                value={"Cash"}
                readOnly
                className="w-full"
              />
            </div>
            <div className="col-2">
              <p>Tanggal Pembayaran</p>
            </div>
            <div className="col-1">
              <p>:</p>
            </div>
            <div className="col-9">
              <Calendar
                id="date"
                name="date"
                placeholder="Masukkan Tanggal Pembayaran"
                value={formik.values.date || ""}
                onChange={(e) => {
                  formik.setFieldValue("date", e.value);
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
                value={"Paid"}
                readOnly
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

export default SavePayForm;

