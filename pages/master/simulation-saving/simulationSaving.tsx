import { Card } from "primereact/card";
import { MenuItem } from "primereact/menuitem";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import FullLayout from "../../../src/layouts/full/FullLayout";
import SavingSimulation from "./component/savingSimulationForm";

const SimulationSaving = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Simulasi Simpanan", url: "/master/simulation-saving" },
  ];

  return (
    <div>
      <FullLayout>
        <Card
          title="Perhitungan Simpanan"
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

        <SavingSimulation />
      </FullLayout>
    </div>
  );
};

export default SimulationSaving;
