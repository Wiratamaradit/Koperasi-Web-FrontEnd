import { MenuItem } from "primereact/menuitem";
import { Card } from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { loanList, loanUpdate, TLoan } from "../../../src/service/master/Loan";
import LoanTable from "../../../src/components-koperasi/master/loan/LoanTable";
import { Dialog } from "primereact/dialog";
import UpdateLoanForm from "../../../src/components-koperasi/master/loan/update/UpdateLoanForm";

const Loan = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Pinjaman", url: "/master/loan" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [userList, setUserList] = useState<[] | any>([]);
  const [selectedData, setSelectedData] = useState<any>();
  const [formCondition, setFormCondition] = useState<string>("");
  const [dialogForm, setDialogForm] = useState<boolean>(false);

  const handleUpdate = async (data: TLoan, id: number) => {
    try {
      setLoading(true);
      const response = await loanUpdate(
        {
          userId: data.userId,
          nominal: data.nominal,
          interest: data.interest,
          tenor: data.tenor,
          date: data.date,
          description: data.description,
          loanStatus: data.loanStatus,
          validationStatus: data.validationStatus,
          status: data.status,
          reason: data.reason,
        },
        id
      );
      toast.current!.show({
        severity: "success",
        summary: "Success",
        detail: `${response.data.message}`,
        life: 3000,
      });
      getList();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const userDetail = JSON.parse(
        localStorage.getItem("sessionAuth") || "{}")
      if (userDetail.data.user.role === "Admin" || userDetail.data.user.role === "HO") {
        const response = await loanList();
        setList(response.data.data);
        setLoading(false);
      } else {
        const response = await loanList(userDetail.data.user.id);
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
          loading={loading}
          userList={userList}
          setDialogForm={(data) => setDialogForm(data)}
          setFormCondition={(data) => setFormCondition(data)}
          setSelectedData={(data) => setSelectedData(data)}
        />
        <Dialog
          header={"Perbaikan Pengajuan Pinjaman"}
          visible={dialogForm}
          onHide={() => {
            setFormCondition("Update");
            setDialogForm(false);
            setSelectedData(null);
          }}
          style={{ width: "30vw" }}
        >
          <UpdateLoanForm
            formCondition={"Update"}
            selectedData={selectedData}
            setDialogForm={(data: boolean) => setDialogForm(data)}
            saveUpdate={(data: TLoan) => handleUpdate(data, selectedData.id)}
          />
        </Dialog>
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(Loan);
