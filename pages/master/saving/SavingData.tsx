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

const Saving = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Simpanan", url: "/master/saving" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [userList, setUserList] = useState<[] | any>([]);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const getList = async () => {
    try {
      setLoading(true);
      const userDetail = JSON.parse(localStorage.getItem("sessionAuth") || "{}");
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
        <SavingTable data={list} userList={userList} loading={loading} />
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(Saving);
