import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import { MenuItem } from "primereact/menuitem";
import FullLayout from "../../../src/layouts/full/FullLayout";
import { loanCreate, TLoan } from "../../../src/service/master/Loan";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { useRouter } from "next/router";
import SubmissionForm from "../../../src/components-koperasi/master/loan/submission/SubmissionLoanForm";

const LoanSubmission = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Pengajuan Pinjaman", url: "/master/loan-submission" },
  ];

  const router = useRouter();
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<[] | any>([]);

  const handleCreate = async (data: TLoan) => {
    try {
      setLoading(true);
      const response = await loanCreate({
        userId: data.userId,
        nominal: data.nominal,
        interest: data.interest,
        tenor: data.tenor,
        date: data.date,
        description: data.description,
        loanStatus: data.loanStatus,
        validationStatus: data.validationStatus,
        status: data.status,
        reason: data.reason
      });
      toast.current!.show({
        severity: "success",
        summary: "Success",
        detail: `${response.data.message}`,
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/master/loan");
      }, 2000);
    } catch (error) {
      toast.current!.show({
        severity: "error",
        summary: "Error",
        detail: "Anda masih memiliki tagihan yang belum lunas.",
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/master/loan");
      }, 2000);
    }
  };
  
  return (
    <FullLayout>
      <Card
        title="Pengajuan Pinjaman"
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
        <SubmissionForm
          formCondition="Create"
          saveCreate={(data: TLoan) => handleCreate(data)}
          userList={userList}
          loadingButton={loading}
        />
      </Panel>
    </FullLayout>
  );
};

export default withSessionCheck(LoanSubmission);
