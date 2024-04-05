import { MenuItem } from "primereact/menuitem";
import { Card } from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { loanList, TLoan } from "../../../src/service/master/Loan";
import LoanTable from "../../../src/components-koperasi/master/loan/LoanTable";

const Loan = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Pinjaman", url: "/master/loan" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [userList, setUserList] = useState<[] | any>([]);
  const [selectedData, setSelectedData] = useState<any>();


  const getList = async () => {
    try {
      setLoading(true);
      const userDetail = JSON.parse(localStorage.getItem("sessionAuth") || "{}");
      if(userDetail.data.role == "Admin" || userDetail.data.role == "HO") {
        const response = await loanList();
        setList(response.data.data);
        setLoading(false);
      } else {
        const response = await loanList(userDetail.data.id);
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

  useEffect(() => {
    getList();
  }, []);

  console.log(selectedData);

  return (
    <FullLayout>
      <PageContainer title="Pinjaman">
        <Toast ref={toast} />
        <Card
          title="Data Pinjaman"
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
        <LoanTable
          data={list}
          userList={userList}
          loading={loading}
        />
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(Loan);
