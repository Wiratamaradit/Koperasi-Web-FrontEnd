import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import { MenuItem } from "primereact/menuitem";
import FullLayout from "../../../src/layouts/full/FullLayout";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { useRouter } from "next/router";
import { savingCreate, TSaving } from "../../../src/service/master/Saving";
import SubmissionSaveForm from "../../../src/components-koperasi/master/saving/submission/SubmissionSavingForm";

const SavingSubmission = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Pengajuan Simpanan", url: "/master/savings-submission" },
  ];

  const router = useRouter();
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<[] | any>([]);

  const handleCreate = async (data: TSaving) => {
    try {
      setLoading(true);
      const response = await savingCreate({
        userId: data.userId,
        nominalPerMonth: data.nominalPerMonth,
        interest: data.interest,
        date: data.date,
        paymentMethod: data.paymentMethod,
        timePeriod: data.timePeriod,
        validationSavingStatus: data.validationSavingStatus,
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
      console.error("Anda sudah melakukan pengajuan simpanan:", error);
      toast.current!.show({
        severity: "error",
        summary: "Error",
        detail: "Anda sedang memiliki simpanan berjalanan.",
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/master/saving");
      }, 2000);
    }
  };

  return (
    <FullLayout>
      <Card
        title="Pengajuan Simpanan"
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
      <Toast ref={toast} />
      <Panel header="Form">
        <SubmissionSaveForm
          formCondition="Create"
          saveCreate={(data: TSaving) => handleCreate(data)}
          userList={userList}
          loadingButton={loading}
        />
      </Panel>
    </FullLayout>
  );
};

export default withSessionCheck(SavingSubmission);
