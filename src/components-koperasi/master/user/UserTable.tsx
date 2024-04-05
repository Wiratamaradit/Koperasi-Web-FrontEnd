import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import autoTable from "jspdf-autotable";

type TUserTable = {
  data: any;
  loading: boolean;
};

const UserTable = (props: TUserTable) => {
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
              "Kode Anggota",
              "Nama",
              "Role",
              "NIK",
              "Status Karyawan",
              "Posisi/Jabatan",
              "Nama Cabang",
              "Nama Pimpinan",
              "Tanggal Bergabung",
              "Alamat",
              "No. Telp",
              "Nama Bank",
              "No. Rekening",
              "Iuran",
            ],
          ],
          body: props.data.map(
            (row: {
              codeUser: any;
              name: any;
              role: any;
              nik: any;
              employeeStatus: any;
              position: any;
              branchName: any;
              managerName: any;
              joinDate: string | number | Date;
              address: any;
              phoneNumber: any;
              bankName: any;
              accountNumber: any;
              memberFee: any;
            }) => [
              row.codeUser,
              row.name,
              row.role,
              row.nik,
              row.employeeStatus,
              row.position,
              row.branchName,
              row.managerName,
              new Date(row.joinDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }),
              row.address,
              row.phoneNumber,
              row.bankName,
              row.accountNumber,
              row.memberFee,
            ]
          ),
        });
        doc.save("List-Anggota-Koperasi.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        props.data.map(
          (row: {
            codeUser: any;
            name: any;
            role: any;
            nik: any;
            employeeStatus: any;
            position: any;
            branchName: any;
            managerName: any;
            joinDate: string | number | Date;
            address: any;
            phoneNumber: any;
            bankName: any;
            accountNumber: any;
            memberFee: any;
          }) => ({
            "Kode Anggota": row.codeUser,
            "Nama": row.name,
            "Role": row.role,
            "NIK": row.nik,
            "Status Karyawan": row.employeeStatus,
            "Posisi/Jabatan": row.position,
            "Nama Cabang": row.branchName,
            "Nama Pimpinan": row.managerName,
            "Tanggal Bergabung": new Date(row.joinDate).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            ),

            "Alamat": row.address,
            "No. Telp": row.phoneNumber,
            "Nama Bank": row.bankName,
            "No. Rekening": row.accountNumber,
            "Iuran": row.memberFee,
          })
        )
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "List-Anggota-Koperasi");
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

  const startContent = (
    <div className="flex align-items-center justify-content-right gap-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={onGlobalFilterChange}
          placeholder="Pencarian"
        />
      </span>
      {(isAdmin || isHO) && (
        <div className="flex align-items-center gap-2">
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
        </div>
      )}
    </div>
  );

  return (
    <div className="card">
      <Toolbar start={startContent} />
      <DataTable
        ref={dt}
        value={props.data}
        loading={props.loading}
        stripedRows
        scrollable
        removableSort
        globalFilter={globalFilterValue}
      >
        <Column header="No" headerStyle={{ width: "3rem" }} body={(data, options) => options.rowIndex + 1} />
        <Column field="codeUser" header="Kode Anggota" sortable style={{ width: '25%' }} />
        <Column field="name" header="Nama" sortable style={{ width: '25%' }} />
        <Column field="email" header="Email"sortable style={{ width: '25%' }}  />
        <Column field="role" header="Role" sortable style={{ width: '25%' }} />
        <Column field="nik" header="NIK" sortable style={{ width: '25%' }} />
        <Column field="employeeStatus" header="Status Karyawan" sortable style={{ width: '25%' }}  />
        <Column field="branchName" header="Nama Cabang" sortable style={{ width: '25%' }}  />
        <Column field="managerName" header="Nama Pimpinan" sortable style={{ width: '25%' }}  />
        <Column field="position" header="Posisi/Jabatan" sortable style={{ width: '25%' }} />
        <Column field="joinDate" header="Tanggal Bergabung" sortable style={{ width: '25%' }} body={(rowData) => {
            const date = new Date(rowData.joinDate);
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' });
        }} />
        <Column field="address" header="Alamat Rumah" sortable style={{ width: '25%' }}/>
        <Column field="phoneNumber" header="No. Telp" sortable style={{ width: '25%' }}/>
        <Column field="bankName" header="Nama Bank" sortable style={{ width: '25%' }}/>
        <Column field="accountNumber" header="No. Rekening" sortable style={{ width: '25%' }}/>
        <Column field="validationStatus" header="Validasi Cabang" sortable style={{ width: '25%' }} />
        <Column field="registrationStatus" header="Validasi Kantor Cabang" sortable style={{ width: '25%' }} />
        <Column field="status" header="Status Akun" sortable style={{ width: '25%' }}/>
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

export default UserTable;
