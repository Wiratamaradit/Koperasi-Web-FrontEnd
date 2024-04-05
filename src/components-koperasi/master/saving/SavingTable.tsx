import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TLoan } from "../../../service/master/Loan";
import autoTable from "jspdf-autotable";
import { TSaving } from "../../../service/master/Saving";
import React from "react";

type TSavingTable = {
  data: any;
  userList: any;
  loading: boolean;
};

const SavingTable = (props: TSavingTable) => {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isHO, setIsHO] = useState(false);
  const dt = useRef<DataTable>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: { target: { value: string } }) => {
    setGlobalFilterValue(e.target.value);
  };
  const filterMatchMode = { value: globalFilterValue, matchMode: "contains" };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape");
        autoTable(doc, {
          head: [
            [
              "Kode Simpanan",
              "Nama Anggota",
              "NIK",
              "Tanggal Pengajuan",
              "Nominal Simpanan Per Bulan",
              "Bunga",
              "Metode Pembayaran",
              "Jangak Waktu Simpanan",
            ],
          ],
          body: props.data.map(
            (row: {
              code: any;
              user: { name: any; nik: any };
              date: string | number | Date;
              nominalPerMonth: number;
              interest: any;
              paymentMethod: any;
              timePeriod: any;
            }) => [
              row.code,
              row.user.name,
              row.user.nik,
              new Date(row.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }),
              formatCurrency(row.nominalPerMonth),
              row.interest,
              row.paymentMethod,
              row.timePeriod,
            ]
          ),
        });
        doc.save("List-Simpanan-Koperasi.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        props.data.map(
          (row: {
            code: any;
            user: { name: any; nik: any };
            date: string | number | Date;
            nominalPerMonth: number;
            interest: any;
            paymentMethod: any;
            timePeriod: any;
          }) => ({
            "Kode Simpanan": row.code,
            "Nama Anggota": row.user.name,
            NIK: row.user.nik,
            "Tanggal Pengajuan": new Date(row.date).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            ),
            "Nominal Simpanan Per Bulan": row.nominalPerMonth,
            Interest: row.interest,
            "Metode Pembayaran": row.paymentMethod,
            "Jangak Waktu Simpanan": row.timePeriod,
          })
        )
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "List-Simpanan-Koperasi");
    });
  };

  const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });
        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const currentPage = Math.floor(event.first / event.rows) + 1;
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(currentPage); // Tambahkan setCurrentPage disini
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const priceBodyTemplateSimpanan = (product: TSaving) => {
    return formatCurrency(product.nominalPerMonth);
  };

  useEffect(() => {
    setIsAdmin(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role ===
        "Admin"
    );
  }, []);

  useEffect(() => {
    setIsHO(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role ===
        "HO"
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center justify-content-end gap-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={onGlobalFilterChange}
          placeholder="Pencarian"
        />
      </span>
      {(isAdmin || isHO) && (
        <>
          <Button
            type="button"
            icon="pi pi-file-excel"
            label="Excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
          <Button
            type="button"
            icon="pi pi-file-pdf"
            label="PDF"
            severity="warning"
            rounded
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />
        </>
      )}
    </div>
  );

  return (
    <div className="card">
      <Toolbar start={startContent} />
      <DataTable
        ref={dt}
        value={props.data.slice((currentPage - 1) * rows, currentPage * rows)}
        first={first} rows={rows}
        loading={props.loading}
        stripedRows
        scrollable
        removableSort
        globalFilter={globalFilterValue}
      >
        <Column
          header="No"
          headerStyle={{ width: "3rem" }}
          body={(data, options) => options.rowIndex + 1}
        />
        <Column
          field="code"
          header="Kode Simpanan"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="user.name"
          header="Nama Anggota"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="user.nik"
          header="NIK"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="nominalPerMonth"
          header="Nominal Simpanan Per Bulan"
          body={priceBodyTemplateSimpanan}
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="date"
          header="Tanggal Pengajuan"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => {
            const date = new Date(rowData.date);
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            });
          }}
        />
        <Column
          field="interest"
          header="Bunga (0.2%)"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="paymentMethod"
          header="Metode Pembayaran"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="timePeriod"
          header="Jangka Waktu Simpanan"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="validationSavingStatus"
          header="Validasi Cabang"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="status"
          header="Status Simpanan"
          sortable
          style={{ width: "25%" }}
        />
      </DataTable>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={120}
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange}
        currentPageReportTemplate={`Halaman ${currentPage}`}
      />
    </div>
  );
};

export default SavingTable;
