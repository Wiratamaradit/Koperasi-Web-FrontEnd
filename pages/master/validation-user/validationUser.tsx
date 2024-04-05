import { Card } from "primereact/card";
import { MenuItem } from "primereact/menuitem";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useRef, useState } from "react";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import FullLayout from "../../../src/layouts/full/FullLayout";
import UserValidationGeneralTable from "./component/userValidationGeneralTable";
import UserValidationRegionTable from "./component/userValidationRegionTable";

const validationUser = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Validasi", url: "/master/validation-user" },
  ];

  const [dataAdmin, setDataAdmin] = useState<any>();

  useEffect(() => {
    setDataAdmin(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role
    );
  }, []);

  console.log(dataAdmin);

  return (
    <div>
      <FullLayout>
        <Card
          title="Validasi User"
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
        <TabView>
          {dataAdmin === "Admin" ? (
            <TabPanel header="Validasi Cabang">
              <UserValidationRegionTable />
            </TabPanel>
          ) : (
            <TabPanel header="Validasi Head Office">
              <UserValidationGeneralTable />
            </TabPanel>
          )}
        </TabView>
      </FullLayout>
    </div>
  );
};

export default validationUser;
