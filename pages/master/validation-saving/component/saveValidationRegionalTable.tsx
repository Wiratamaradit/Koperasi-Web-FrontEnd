import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

const SaveValidationRegionTable = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}`;
  const [data, setData] = useState<any>();
  const [getId, setGetId] = useState<any>();
  const [visibleValidate, setVisibleValidate] = useState<boolean>(false);
  const getSaving = async () => {
    await axios
      .get(
        `${API_URL}/api/saveList?validationSavingStatus=On-Process&status=INACTIVE`
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
      .post(`${API_URL}/api/saveValidationRegion/${id}`, {
        validationSavingStatus: status,
      })
      .then((response) => {
        setGetId(null);
        getSaving();
      })
      .catch((error) => {
        console.log(`error validate ${error}`);
      });
  };

  useEffect(() => {
    getSaving();
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
        <Column field="code" header="Kode Simpanan"></Column>
        <Column field="user.name" header="Nama Anggota"></Column>
        <Column field="nominalPerMonth" header="Nominal Per Bulan"></Column>
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
        <Column field="paymentMethod" header="Metode Pembayaran"></Column>
        <Column field="timePeriod" header="Jangka Waktu Simpanan"></Column>
        <Column
          field="validationSavingStatus"
          header="Validasi Cabang"
        ></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
      <Dialog
        header="Validasi Pendaftaran : (Admin Cabang)"
        visible={visibleValidate}
        style={{ width: "50vw" }}
        onHide={() => setVisibleValidate(false)}
        footer={ValidationOption}
      >
        <p className="m-0">Apakah anda menyetujui untuk menyimpan dana ? </p>
      </Dialog>
    </>
  );
};

export default SaveValidationRegionTable;
