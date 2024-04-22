import { MenuItem } from "primereact/menuitem";
import { Card } from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { savingList, TSaving } from "../../../src/service/master/Saving";
import SavingTable from "../../../src/components-koperasi/master/saving/SavingTable";
import SavingPaymentForm from "../../../src/components-koperasi/master/saving/submission/SavingPaymentForm";
import router from "next/router";
import { savepayCreate, TSavePay } from "../../../src/service/master/SavingPayment";

const Saving = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Simpanan", url: "/master/saving" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [formCondition, setFormCondition] = useState<string>("");
  const [dialogForm, setDialogForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>()

  const getList = async () => {
    try {
      setLoading(true);
      const userDetail = JSON.parse(
        localStorage.getItem("sessionAuth") || "{}"
      );
      if (userDetail.data.role == "Admin" || userDetail.data.role == "HO") {
        const response = await savingList();
        setList(response.data.data);
        setLoading(false);
      } else {
        const response = await savingList(userDetail.data.id);
        setList(response.data.data);
        setLoading(false);
      }
    } catch (error: any) {
      toast.current!.show({
        severity: "error",
        summary: "Error",
        detail: `${error.response.data.message}`,
        life: 3000,
      });
      setLoading(false);
    }
  };

  const handleCreate = async (data: TSavePay) => {
    try {
      setLoading(true);
      const response = await savepayCreate({
        saveId: data.saveId,
        userId: data.userId,
        nominal: data.nominal,
        paymentMethod: data.paymentMethod,
        date: data.date,
        status: data.status
      });
      toast.current!.show({
        severity: "success",
        summary: "Success",
        detail: `${response.data.message}`,
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/master/saving");
      }, 2000);
    } catch (error) {
      console.error("Gagal melakukan pembayaran", error);
      toast.current!.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal melakukan pembayaran.",
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/master/saving");
      }, 2000);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(list);

  return (
    <FullLayout>
      <PageContainer title="Simpanan">
        <Toast ref={toast} />
        <Card
          title="Data Simpanan"
          className="mb-2"
          subTitle={<BreadcrumbBase items={breadcrumbItems} />}
          pt={{
            body: {
              className: "border-round border-200 border-2 surface-overlay",
            },
            title: { className: "ml-3 mt-1 text-xl" },
            subTitle: { className: "mb-0" },
          }}
        />
        <SavingTable
          data={list}
          loading={loading}
          setDialogForm={(data) => setDialogForm(data)}
          setFormCondition={(data) => setFormCondition(data)}
          setSelectedData={(data) => setSelectedData(data)}
        />
        <Dialog
          header={"Pembayaran Simpanan"}
          visible={dialogForm}
          onHide={() => {
            setFormCondition("Payment");
            setDialogForm(false);
            setSelectedData(null)
          }}
          style={{ width: "30vw" }}
        >
          <SavingPaymentForm
            formCondition={"Payment"}
            selectedData={selectedData}
            setDialogForm={(data: boolean) => setDialogForm(data)}
            saveCreate={(data: TSavePay) => handleCreate(data)}
          />
        </Dialog>
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(Saving);
