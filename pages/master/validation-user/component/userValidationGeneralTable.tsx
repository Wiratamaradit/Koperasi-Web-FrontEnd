import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const UserValidationGeneralTable = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}`;
  const [data, setData] = useState<any>();
  const [getId, setGetId] = useState<any>();
  const [visibleValidate, setVisibleValidate] = useState<boolean>(false);
  const getUser = async () => {
    await axios
      .get(
        `${API_URL}/api/userList?validationStatus=Valid&registrationStatus=On-Process&status=INACTIVE`
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(`error mengambil data ${error}`);
      });
  };

  const handleValidate = async (status: any, id: any) => {
    await axios
      .post(`${API_URL}/api/userValidationGeneral/${id}`, {
        registrationStatus: status,
      })
      .then((response) => {
        setGetId(null);
        getUser();
      })
      .catch((error) => {
        console.log(`error validate ${error}`);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const actionBodyTemplate = (data: any) => {
    return (
      <Button
        label="Validate"
        type="button"
        text
        onClick={() => {
          setVisibleValidate(true);
          setGetId(data.id);
        }}
      />
    );
  };

  const ValidationOption = (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "end" }}>
        <Button
          label="Rejected"
          icon="pi pi-times"
          severity="danger"
          onClick={() => {
            setVisibleValidate(false);
            handleValidate("Rejected", getId);
          }}
        />
        <Button
          label="Approved"
          icon="pi pi-check"
          severity="success"
          onClick={() => {
            setVisibleValidate(false);
            handleValidate("Approved", getId);
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="nik" header="NIK"></Column>
        <Column field="codeUser" header="Kode User"></Column>
        <Column field="name" header="Nama Anggota"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="position" header="Posisi"></Column>
        <Column field="branchName" header="Nama Cabang"></Column>
        <Column field="managerName" header="Nama BM"></Column>
        <Column field="validationStatus" header="Validasi Cabang"></Column>
        <Column
          field="registrationStatus"
          header="Validasi Kantor Pusat"
        ></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        header="Validasi Pendaftaran : (Kantor Pusat)"
        visible={visibleValidate}
        style={{ width: "50vw" }}
        onHide={() => setVisibleValidate(false)}
        footer={ValidationOption}
      >
        <p className="m-0">Apakah anda menyetujui pendaftaran ?</p>
      </Dialog>
    </>
  );
};

export default UserValidationGeneralTable;
