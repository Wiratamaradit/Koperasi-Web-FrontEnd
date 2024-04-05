import { Card } from "primereact/card";
import { MenuItem } from "primereact/menuitem";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import FullLayout from "../../../src/layouts/full/FullLayout";
import LoanSimulation from "./component/loanSimulationForm";

const SimulationLoan = () => {
  const breadcrumbItems: MenuItem[] = [
    { label: "Simulasi Pinjaman", url: "/master/simulation-loan" },
  ];

  return (
    <div>
      <FullLayout>
        <Card
          title="Perhitungan Pinjaman"
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

        <LoanSimulation />
      </FullLayout>
    </div>
  );
};

export default SimulationLoan;
