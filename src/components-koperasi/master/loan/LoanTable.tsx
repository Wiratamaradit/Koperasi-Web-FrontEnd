import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TLoan } from "../../../service/master/Loan";
import autoTable from "jspdf-autotable";
import React from "react";

type TLoanTable = {
  data: any;
  loading: boolean;
  userList: any;
};

const LoanTable = (props: TLoanTable) => {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isHO, setIsHO] = useState(false);
  const dt = useRef<DataTable>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: { target: { value: string } }) => {
    setGlobalFilterValue(e.target.value);
  };
  const filterMatchMode = { value: globalFilterValue, matchMode: "contains" };

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
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape");
        autoTable(doc, {
          head: [
            [
              "Kode Pinjaman",
              "Nama Anggota",
              "NIK",
              "Tanggal Pengajuan",
              "Nominal Pinjaman",
              "Bunga",
              "Tenor",
              "Deskripsi",
            ],
          ],
          body: props.data.map(
            (row: {
              code: any;
              users: { name: any; nik: any };
              date: string | number | Date;
              nominal: number;
              interest: any;
              tenor: any;
              description: any;
            }) => [
              row.code,
              row.users.name,
              row.users.nik,
              new Date(row.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }),
              formatCurrency(row.nominal),
              row.interest,
              row.tenor,
              row.description,
            ]
          ),
        });
        doc.save("List-Pinjaman-Koperasi.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        props.data.map(
          (row: {
            code: any;
            users: { name: any; nik: any };
            date: string | number | Date;
            nominal: any;
            interest: any;
            tenor: any;
            description: any;
          }) => ({
            "Kode Pinjaman": row.code,
            "Nama Anggota": row.users.name,
            NIK: row.users.nik,
            "Tanggal Pengajuan": new Date(row.date).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            ),
            "Nominal Pinjaman": row.nominal,
            Interest: row.interest,
            Tenor: row.tenor,
            Deskripsi: row.description,
          })
        )
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "List-Pinjaman-Koperasi");
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
    setCurrentPage(currentPage);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const priceBodyTemplatePinjaman = (product: TLoan) => {
    return formatCurrency(product.nominal);
  };

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
        first={first}
        rows={rows}
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
          header="Kode Pinjaman"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="users.name"
          header="Nama Anggota"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="users.nik"
          header="NIK"
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
          field="nominal"
          header="Nominal Pinjaman"
          body={priceBodyTemplatePinjaman}
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="interest"
          header="Bunga (2%)"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="tenor"
          header="Tenor"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="description"
          header="Deskripsi"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="validationLoanStatus"
          header="Validasi Cabang"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="loanStatus"
          header="Validasi Kantor Pusat"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="status"
          header="Status"
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

export default LoanTable;
