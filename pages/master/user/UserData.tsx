import withSessionCheck from "../../../src/base/utils/WithAuth";
import FullLayout from "../../../src/layouts/full/FullLayout";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import PageContainer from "../../../src/components/container/PageContainer";
import {
  userList,
} from "../../../src/service/master/User";
import UserTable from "../../../src/components-koperasi/master/user/UserTable";
import { MenuItem } from "primereact/menuitem";

const User = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Anggota", url: "/master/user" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setLList] = useState<[] | any>([]);

  const getList = async () => {
    try {
      setLoading(true);
      const response = await userList();
      setLList(response.data.data);
      setLoading(false);
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
      <PageContainer title="User">
        <Toast ref={toast} />
        <Card
          title="Data Anggota"
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
        <UserTable
          data={list}
          loading={loading}
        />
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(User);
