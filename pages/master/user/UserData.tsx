import withSessionCheck from "../../../src/base/utils/WithAuth";
import FullLayout from "../../../src/layouts/full/FullLayout";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import PageContainer from "../../../src/components/container/PageContainer";
import { TUser, userList, userUpdate } from "../../../src/service/master/User";
import UserTable from "../../../src/components-koperasi/master/user/UserTable";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import UpdateUserForm from "../../../src/components-koperasi/master/user/update/UpdateUserForm";

const User = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Anggota", url: "/master/user" },
  ];
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<[] | any>([]);
  const [selectedData, setSelectedData] = useState<any>();
  const [formCondition, setFormCondition] = useState<string>("");
  const [dialogForm, setDialogForm] = useState<boolean>(false);

  const handleUpdate = async (data: TUser, id: number) => {
    try {
      setLoading(true);
      const response = await userUpdate(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          nik: data.nik,
          position: data.position,
          employeeStatus: data.employeeStatus,
          branchName: data.branchName,
          managerName: data.managerName,
          joinDate: data.joinDate,
          address: data.address,
          phoneNumber: data.phoneNumber,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
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
      const response = await userList();
      setList(response.data.data);
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

  console.log(selectedData);

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
          setDialogForm={(data) => setDialogForm(data)}
          setFormCondition={(data) => setFormCondition(data)}
          setSelectedData={(data) => setSelectedData(data)}
        />
        <Dialog
          header={"Perbaikan Pendaftaran"}
          visible={dialogForm}
          onHide={() => {
            setFormCondition("Update");
            setDialogForm(false);
            setSelectedData(null);
          }}
          style={{ width: "50vw" }}
        >
          <UpdateUserForm
            formCondition={"Update"}
            selectedData={selectedData}
            setDialogForm={(data: boolean) => setDialogForm(data)}
            saveUpdate={(data: TUser) => handleUpdate(data, selectedData.id)}
          />
        </Dialog>
      </PageContainer>
    </FullLayout>
  );
};

export default withSessionCheck(User);
