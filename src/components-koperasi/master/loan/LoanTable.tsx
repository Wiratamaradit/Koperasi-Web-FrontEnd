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
import { TLoan } from "../../../service/master/Loan";
import autoTable from "jspdf-autotable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Toast } from "primereact/toast";
type TLoanTable = {
  data: any;
  loading: boolean;
  userList: any;
  setDialogForm: (data: boolean) => void;
  setFormCondition: (data: string) => void;
  setSelectedData?: (data: any) => void;
};

const LoanTable = (props: TLoanTable) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL_LARAVEL}`;
  const dt = useRef<DataTable>(null);
  const toast = useRef<Toast>(null);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHO, setIsHO] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [downloadFile, setDownloadFile] = useState<boolean>(false);
  const [dataPayment, setDataPayment] = useState<any>();
  const [uploadFile, setUploadFile] = useState<any>();
  const [fileData, setFileData] = useState<any>();
  const [revisionsRows, setRevisionsRows] = useState<Array<number>>([]);

  console.log(dataPayment);

  const onGlobalFilterChange = (e: { target: { value: string } }) => {
    setGlobalFilterValue(e.target.value);
  };
  const filterMatchMode = { value: globalFilterValue, matchMode: "contains" };

  useEffect(() => {
    setIsAdmin(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.user
        ?.role === "Admin"
    );
  }, []);

  useEffect(() => {
    setIsHO(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.user
        ?.role === "HO"
    );
  }, []);

  const formatDate = (date: any) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString();

    return `${day} ${month} ${year}`;
  };

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
              user: { name: any; nik: any };
              date: string | number | Date;
              nominal: number;
              interest: any;
              tenor: any;
              description: any;
            }) => [
              row.code,
              row.user.name,
              row.user.nik,
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
            user: { name: any; nik: any };
            date: string | number | Date;
            nominal: any;
            interest: any;
            tenor: any;
            description: any;
          }) => ({
            "Kode Pinjaman": row.code,
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
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const priceBodyTemplatePinjaman = (product: TLoan) => {
    return formatCurrency(product.nominal);
  };

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
  const editButtonTemplate = (data: any) => {
    const userRole = JSON.parse(localStorage.getItem("sessionAuth") || "{}")
      ?.data?.user?.role;
    if (userRole === "Anggota" && data.validationLoanStatus === "Revisions") {
      return (
        <span className="p-buttonset">
          <Button
            label="Revisi"
            icon="pi pi-pencil"
            severity="info"
            size="small"
            onClick={() => {
              props.setFormCondition("Update");
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

  const allowExpansion = (rowData: any) => {
    return rowData.installments!.length > 0;
  };

  const paymentTemplate = (data: any) => {
    if (data.paymentStatus === "UnPaid" && isAdmin) {
      return (
        <Button
          label="Payment"
          severity="success"
          size="small"
          onClick={() => {
            setVisibleDialog(true);
            setDataPayment(data);
          }}
        />
      );
    } else if (data.paymentStatus === "PAID") {
      return (
        <Button
          label="Receipt"
          severity="info"
          size="small"
          onClick={() => {
            setDownloadFile(true);
            setDataPayment(data);
          }}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (downloadFile) {
      handleDownloadPdf();
    }
  }, [downloadFile]);

  const handleDownloadPdf = () => {
    const pdfUrl = dataPayment?.installmentPayment[0]?.receipt;
    const fileName = dataPayment?.installmentPayment[0]?.fileName;

    if (!pdfUrl || !fileName) {
      console.error("URL file PDF atau nama file tidak tersedia.");
      return;
    }

    const fullUrl = pdfUrl;
    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadFile(false);
    setDataPayment(null);
  };

  const statusBodyTemplate = (data: any) => {
    return (
      <Tag
        value={data.status}
        severity={getStatus(data)}
        style={{ width: "100%" }}
      ></Tag>
    );
  };

  const getStatus = (data: any) => {
    switch (data.status) {
      case "ACTIVE":
        return "success";
      case "On-Process":
        return "warning";
      case "INACTIVE":
        return "danger";
      case "LUNAS":
        return "info";
      default:
        return null;
    }
  };

  const validateBodyTemplate = (data: any) => {
    return (
      <Tag
        value={data.loanStatus}
        severity={getValidate(data)}
        style={{ width: "100%" }}
      ></Tag>
    );
  };

  const getValidate = (data: any) => {
    switch (data.loanStatus) {
      case "Approved":
        return "success";
      case "On-Process":
        return "warning";
      case "Rejected":
        return "danger";
      case "LUNAS":
        return "info";
      default:
        return null;
    }
  };

  const regionalValidateTemplate = (data: any) => {
    return (
      <Tag
        value={data.validationLoanStatus}
        severity={getValidateRegional(data)}
        style={{ width: "100%" }}
      ></Tag>
    );
  };

  const getValidateRegional = (data: any) => {
    switch (data.validationLoanStatus) {
      case "Valid":
        return "success";
      case "On-Process":
        return "warning";
      case "Revisions":
        return "info";
      case "Invalid":
        return "danger";
      case "LUNAS":
        return "info";
      default:
        return null;
    }
  };

  const paymentBodyTemplate = (data: any) => {
    return (
      <Tag
        value={data.paymentStatus}
        severity={getPayment(data)}
        style={{ width: "100%" }}
      ></Tag>
    );
  };

  const getPayment = (data: any) => {
    switch (data.paymentStatus) {
      case "PAID":
        return "success";

      case "UnPaid":
        return "danger";

      default:
        return null;
    }
  };

  const calculatePayment = (data: any) => {
    let total = 0;
    for (let item of data) {
      total += item.nominalPayment;
    }
    return total;
  };

  const calculateBalance = (data: any, paidAmount: any) => {
    let totalUnpaid = 0;
    for (let item of data.installments) {
      if (item.paymentStatus !== "PAID") {
        totalUnpaid += item.nominalPayment;
      }
    }
    const balance = totalUnpaid - paidAmount;
    if (balance === 0) {
      data.validationLoanStatus = "LUNAS";
      data.loanStatus = "LUNAS";
      data.status = "LUNAS";
    }
    return balance;
  };

  const footerGroup = (data: any) => {
    const paidAmount = data.installments.reduce(
      (total: number, item: any) =>
        item.paymentStatus === "PAID"
          ? total + item.nominalPayment - item.nominalPayment
          : total,
      0
    );
    const balance = calculateBalance(data, paidAmount);

    return (
      <ColumnGroup>
        <Row>
          <Column
            footer="Total Pinjaman :"
            colSpan={5}
            footerStyle={{ textAlign: "right" }}
          />
          <Column
            footer={formatCurrency(calculatePayment(data.installments))}
          />
        </Row>
        <Row>
          <Column
            footer="Belum dibayar :"
            colSpan={5}
            footerStyle={{ textAlign: "right" }}
          />
          <Column footer={formatCurrency(calculateBalance(data, paidAmount))} />
        </Row>
      </ColumnGroup>
    );
  };

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="p-3">
        <DataTable
          value={data.installments}
          footerColumnGroup={footerGroup(data)}
        >
          <Column
            header="No"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options.rowIndex + 1}
          />
          <Column
            field="nominalPayment"
            header="Nominal"
            body={(rowData) => {
              return formatCurrency(rowData.nominalPayment);
            }}
          />
          <Column field="paymentMethod" header="Payment Method" />
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
          <Column
            field="paymentStatus"
            header="Status"
            body={paymentBodyTemplate}
          />
          <Column
            headerStyle={{ width: "4rem" }}
            body={paymentTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const uploadHandler = (e: any) => {
    const file = e.files[0];
    if (file.size > 2000000) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Ukuran file melebihi 2MB",
        life: 3000,
      });
      setVisibleDialog(false);
    } else {
      setFileData(file);
    }
  };

  const saveUploadedData = async () => {
    try {
      setUploadFile(true);
      if (fileData) {
        const formData = new FormData();
        formData.append("installmentId", dataPayment?.id);
        formData.append("pdf", fileData); // Pastikan kunci yang digunakan adalah "pdf"

        const response = await axios.post(
          `${API_URL}/api/loantransAdd`,
          formData
        );

        console.log("File uploaded successfully:", response.data);
        setVisibleDialog(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "File berhasil diunggah",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal mengunggah file",
        life: 3000,
      });
    } finally {
      setUploadFile(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
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
            header="Kode Pinjaman"
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
            header="Validasi Kantor Cabang"
            sortable
            style={{ width: "25%" }}
            body={regionalValidateTemplate}
          />
          <Column
            field="loanStatus"
            header="Validasi Kantor Pusat"
            sortable
            style={{ width: "25%" }}
            body={validateBodyTemplate}
          />
          <Column
            field="status"
            header="Status"
            sortable
            style={{ width: "25%" }}
            body={statusBodyTemplate}
          />
          <Column
            field="reason"
            header="Catatan"
            sortable
            style={{ width: "25%" }}
            body={(rowData: any) => {
              if (rowData.validationLoanStatus === "Revisions") {
                return rowData.reason;
              } else if (rowData.status === "LUNAS") {
                return "Angsuran Telah Selesai";
              } else if (
                rowData.loanStatus === "Rejected" ||
                rowData.validationLoanStatus === "Invalid"
              ) {
                return rowData.reason;
              }
            }}
          />
          <Column
            body={editButtonTemplate}
            style={{ width: "6rem", textAlign: "center" }}
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

        <Dialog
          header={
            dataPayment ? `Payment at ${formatDate(dataPayment?.date)}` : null
          }
          visible={visibleDialog}
          style={{ width: "50rem" }}
          onHide={() => {
            setVisibleDialog(false);
            setDataPayment(null);
          }}
        >
          <form>
            <div className="grid">
              <div className="col-4">
                <div className=" mt-2">Nominal</div>
              </div>
              <div className="col-8">
                <div className="text-center">
                  <InputNumber
                    value={dataPayment?.nominalPayment}
                    mode="currency"
                    currency="IDR"
                    locale="id-ID"
                    minFractionDigits={2}
                    style={{ fontWeight: "bold", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mt-2">Payment Method</div>
              </div>
              <div className="col-8">
                <div className="text-center">
                  <InputText
                    value={dataPayment?.paymentMethod}
                    disabled
                    style={{ fontWeight: "bold", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </form>
          <FileUpload
            mode="basic"
            name="demo[]"
            accept="application/pdf"
            maxFileSize={2000000}
            chooseLabel="invoice"
            onSelect={uploadHandler}
          />
          <div className="p-d-flex p-jc-end">
            <Button
              label="Save"
              icon="pi pi-save"
              className="p-button-success"
              onClick={saveUploadedData}
              disabled={uploadFile}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default LoanTable;
