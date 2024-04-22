import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

const LoanValidationGeneralTable = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}`;
  const [data, setData] = useState<any>();
  const [getId, setGetId] = useState<any>();
  const [visibleValidate, setVisibleValidate] = useState<boolean>(false);
  const getLoan = async () => {
    await axios
      .get(
        `${API_URL}/api/loanList?validationLoanStatus=Valid&loanStatus=On-Process&status=INACTIVE`
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
      .post(`${API_URL}/api/loanValidationGeneral/${id}`, {
        loanStatus: status,
      })
      .then((response) => {
        setGetId(null);
        getLoan();
      })
      .catch((error) => {
        console.log(`error validate ${error}`);
      });
  };

  useEffect(() => {
    getLoan();
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
    <div>
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
  );

  return (
    <>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="user.nik" header="NIK"></Column>
        <Column field="code" header="Kode Pinjaman"></Column>
        <Column field="user.name" header="Nama Anggota"></Column>
        <Column
          field="date"
          header="Tanggal Pengajuan"
          body={(rowData) => {
            const date = new Date(rowData.date);
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            });
          }}
        />
        <Column field="nominal" header="Nominal Pengajuan"></Column>
        <Column field="interest" header="Bunga"></Column>
        <Column field="tenor" header="Tenor Pinjaman"></Column>
        <Column field="validationLoanStatus" header="Validasi Cabang"></Column>
        <Column field="loanStatus" header="Validasi Kantor Pusat"></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        header="Validasi Pengajuan : (Kantor Pusat)"
        visible={visibleValidate}
        style={{ width: "50vw" }}
        onHide={() => setVisibleValidate(false)}
        footer={ValidationOption}
      >
        <p className="m-0">Apakah data sudah sesuai dengan ketentuan ?</p>
      </Dialog>
    </>
  );
};

export default LoanValidationGeneralTable;
