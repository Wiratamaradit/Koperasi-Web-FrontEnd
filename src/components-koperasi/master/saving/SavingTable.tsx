import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import autoTable from "jspdf-autotable";
import { TSaving } from "../../../service/master/Saving";
import { Tag } from "primereact/tag";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

type TSavingTable = {
  data: any;
  loading: boolean;
  setSelectedData?: (data: any) => void;
  setDialogForm: (data: boolean, selectedData?: any) => void;
  setFormCondition: (data: string) => void;
};

const SavingTable = (props: TSavingTable) => {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isHO, setIsHO] = useState(true);
  const dt = useRef<DataTable>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
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
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.user?.role ===
        "Admin"
    );
  }, []);

  useEffect(() => {
    setIsHO(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.user?.role ===
        "HO"
    );
  }, []);

  const centerContent = (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        type="Search"
        placeholder="Search"
        onChange={onGlobalFilterChange}
      />
    </span>
  );

  const endContent = (
    <div className="flex align-items-center justify-content-end gap-2">
      {(isAdmin || isHO) && (
        <>
          <Button
            key="excelButton"
            type="button"
            icon="pi pi-file-excel"
            label="Excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
          <Button
            key="pdfButton"
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

  const paymentButton = (data: any) => {
    const totalPayment = data.savingpayments.reduce(
      (total: number, item: any) => total + item.payment,
      0
    );
    const isCompleted =
      totalPayment ===
      (data.nominalPerMonth * data.interest + data.nominalPerMonth) *
        data.timePeriod;

    if (isAdmin && !isCompleted && data.status === "ACTIVE") {
      return (
        <span className="p-buttonset">
          <Button
            label="Payment"
            icon="pi pi-pencil"
            severity="info"
            size="small"
            onClick={() => {
              props.setFormCondition("Payment");
              props.setDialogForm(true);
              props.setSelectedData!(data);
            }}
            style={{ borderRadius: "10px" }}
          />
        </span>
      );
    } else {
      return null;
    }
  };

  const statusBodyTemplate = (data: any) => {
    return (
      <Tag
        value={data.status}
        severity={getStatus(data)}
        style={{ width: "75%" }}
      ></Tag>
    );
  };

  const getStatus = (data: any) => {
    switch (data.status) {
      case "Paid":
        return "success";
      case "ACTIVE":
        return "success";
      case "On-Process":
        return "warning";
      case "INACTIVE":
        return "danger";
      case "Selesai":
        return "info";
      default:
        return null;
    }
  };

  const validateBodyTemplate = (data: any) => {
    return (
      <Tag
        value={data.validationSavingStatus}
        severity={getValidate(data)}
        style={{ width: "100%" }}
      ></Tag>
    );
  };
  const getValidate = (data: any) => {
    switch (data.validationSavingStatus) {
      case "Approved":
        return "success";
      case "On-Process":
        return "warning";
      case "Rejected":
        return "danger";
      case "Selesai":
        return "info";
      default:
        return null;
    }
  };

  const calculatePayment = (data: any) => {
    let total = 0;
    for (let item of data) {
      total += item.payment;
    }
    return total;
  };

  const footerGroup = (data: any) => (
    <ColumnGroup>
      <Row>
        <Column
          footer="Saldo :"
          colSpan={5}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={formatCurrency(calculatePayment(data.savingpayments))}
        />
      </Row>
    </ColumnGroup>
  );

  const allowExpansion = (rowData: any) => {
    return rowData.savingpayments!.length > 0;
  };
  const rowExpansionTemplate = (data: any) => {
    const totalPayment = data.savingpayments.reduce(
      (total: number, item: any) => total + item.payment,
      0
    );
    const isCompleted =
      totalPayment ===
      (data.nominalPerMonth * data.interest + data.nominalPerMonth) *
        data.timePeriod;

    if (isCompleted) {
      data.validationSavingStatus = "Selesai";
      data.status = "Selesai";
    }
    return (
      <div className="p-3">
        <DataTable
          value={data.savingpayments}
          footerColumnGroup={footerGroup(data)}
        >
          <Column
            header="Bulan ke -"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options.rowIndex + 1}
          />
          <Column
            field="date"
            header="Date"
            body={(rowData) => {
              const date = new Date(rowData.date);
              return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
            }}
          />
          <Column field="paymentMethod" header="Payment Method" />
          <Column
            field="payment"
            header="Nominal"
            body={(rowData) => {
              return formatCurrency(rowData.payment);
            }}
          />
          ;
          <Column field="status" header="Status" body={statusBodyTemplate} />
        </DataTable>
      </div>
    );
  };

  return (
    <div className="card">
      <Toolbar center={centerContent} end={endContent} className="mb-2" />
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
        //expand
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
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
            return date.toLocaleDateString("id-ID", {
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
          body={validateBodyTemplate}
        />
        <Column
          field="status"
          header="Status Simpanan"
          sortable
          body={statusBodyTemplate}
        />
        <Column body={paymentButton} />
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
