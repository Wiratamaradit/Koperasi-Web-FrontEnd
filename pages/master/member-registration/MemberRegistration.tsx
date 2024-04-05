import PageContainer from "../../../src/components/container/PageContainer";
import { Card } from "primereact/card";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import FormPendaftaran from "../../../src/components-koperasi/master/user/registration/RegistrationForm";
import { Panel } from "primereact/panel";
import { useRouter } from "next/router";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";
import { TUser, userCreate } from "../../../src/service/master/User";
import { Box } from "@mui/system";
import RegistrationForm from "../../../src/components-koperasi/master/user/registration/RegistrationForm";

const Registration = () => {
  const router = useRouter();
  const toast = useRef<Toast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async (data: TUser) => {
    try {
      setLoading(true);
      const response = await userCreate({
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
        validationStatus: data.validationStatus,
        registrationStatus: data.registrationStatus,
        status: data.status,
      });
      toast.current!.show({
        severity: "success",
        summary: "Success",
        detail: `${response.data.message}`,
        life: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Anda sudah terdaftar:", error);
      toast.current!.show({
        severity: "error",
        summary: "Error",
        detail: "Anda sudah terdaftar.",
        life: 3000,
      });

      setLoading(false);
    }
  };

  return (
    <BlankLayout>
      <PageContainer title="Pendaftaran">
        <Box
         sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0, 
            "&:before": {
              content: '""',
              backgroundImage: "url(/images/backgrounds/background.jpg)",
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              zIndex: -1,
            },
          }}
          >
        <Toast ref={toast} />
        <Card style={{ width: "75%", marginTop: "30px", marginBottom: "30px", background: "transparent", border: "2px solid white" }}>
          <Card
            title="Form Pendaftaran Anggota Koperasi"
            className="mb-2"
            pt={{
              body: {
                className: "border-round border-200 border-2 surface-overlay",
              },
              title: { className: "ml-3 mt-1 text-xl" },
              subTitle: { className: "mb-0" },
            }}
          />
          <Panel header="Isi data dengan benar">
            <RegistrationForm
              formCondition="Pendaftaran"
              routeUrl="/"
              saveCreate={(data: TUser) => handleCreate(data)}
              loadingButton={loading}
            />
          </Panel>
        </Card>
        </Box>
      </PageContainer>
    </BlankLayout>
  );
};

export default Registration;
