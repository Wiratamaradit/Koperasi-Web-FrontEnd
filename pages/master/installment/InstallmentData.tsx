import { MenuItem } from "primereact/menuitem";
import { Card } from "primereact/card";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { installmentList } from "../../../src/service/master/Installment";
const Loan = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Angsuran", url: "/master/installment" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [serList, setUserList] = useState<[] | any>([]);
  const [selectedData, setSelectedData] = useState<any>();
  const getList = async () => {
    try {
      setLoading(true);
      const userDetail = JSON.parse(localStorage.getItem("sessionAuth") || "{}");
      if (userDetail.data?.user?.role == "Admin" || userDetail.data?.user?.role == "HO") {
        const response = await installmentList();
        setList(response.data.data);
        setLoading(false);
      } else {
        const response = await installmentList(userDetail.data.id);
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
      <PageContainer title="Angsuran">
        <Toast ref={toast} />
        <Card
          title="Data Angsuran"
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
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(Loan);
