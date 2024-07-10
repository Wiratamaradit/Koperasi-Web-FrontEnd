import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const LoanValidationRegionTable = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}`;
  const [data, setData] = useState<any>();
  const [getId, setGetId] = useState<any>();
  const [visibleValidate, setVisibleValidate] = useState<boolean>(false);
  const [reason, setReason] = useState<any>();
  const [showReasonInput, setShowReasonInput] = useState<boolean>(false);
  const getLoan = async () => {
    await axios
      .get(
        `${API_URL}/api/loanList?validationLoanStatus=On-Process&loanStatus=On-Process&status=INACTIVE`
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
      .post(`${API_URL}/api/loanValidationRegion/${id}`, {
        validationLoanStatus: status,
        reason: reason,
      })
      .then((response) => {
        setGetId(null);
        setReason("");
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="field-radiobutton">
          <div className="field-radiobutton-item">
            <input
              type="radio"
              id="yes"
              name="reasonOption"
              value="yes"
              checked={!showReasonInput}
              onChange={() => setShowReasonInput(false)}
            />
            <label htmlFor="yes">Ya</label>
          </div>
          <div className="field-radiobutton-item">
            <input
              type="radio"
              id="no"
              name="reasonOption"
              value="no"
              checked={showReasonInput}
              onChange={() => setShowReasonInput(true)}
            />
            <label htmlFor="no">Tidak</label>
          </div>
        </div>
        {showReasonInput && (
          <InputText
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Masukkan alasan"
            style={{ marginTop: "0.5rem" }}
            className="w-full"
          />
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "end" }}>
        {showReasonInput && (
          <Button
            label="Invalid"
            icon="pi pi-times"
            severity="danger"
            onClick={() => {
              setVisibleValidate(false);
              handleValidate("Invalid", getId);
            }}
          />
        )}
        {!showReasonInput && (
          <Button
            label="Valid"
            icon="pi pi-check"
            severity="success"
            onClick={() => {
              setVisibleValidate(false);
              handleValidate("Valid", getId);
            }}
          />
        )}
        {showReasonInput && (
          <Button
            label="Revisions"
            icon="pi pi-refresh"
            severity="warning"
            onClick={() => {
              setVisibleValidate(false);
              handleValidate("Revisions", getId);
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="code" header="Kode Pinjaman"></Column>
        <Column field="user.nik" header="NIK"></Column>
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
        header="Validasi Pengajuan : (Admin Cabang)"
        visible={visibleValidate}
        style={{ width: "50vw" }}
        onHide={() => setVisibleValidate(false)}
        footer={ValidationOption}
      >
        <p className="m-0">Apakah data sudah sesuai dengan ketentuan ? </p>
      </Dialog>
    </>
  );
};

export default LoanValidationRegionTable;
