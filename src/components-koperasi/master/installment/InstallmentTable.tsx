import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Paginator, PaginatorPageChangeEvent} from "primereact/paginator";
import {useEffect, useRef, useState} from "react";
import {TInstallment} from "../../../service/master/Installment";
import {Toast} from "primereact/toast";
import {FileUpload} from "primereact/fileupload";

type TInstallmentTable = {
    data: any;
};

const InstallmentTable = (props: TInstallmentTable) => {
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const toast = useRef<Toast | null>(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const dt = useRef<DataTable>(null);
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const onGlobalFilterChange = (e: { target: { value: string } }) => {
        setGlobalFilterValue(e.target.value);
    };
    const filterMatchMode = {value: globalFilterValue, matchMode: "contains"};

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

    const priceBodyTemplateAngsuran = (product: TInstallment) => {
        return formatCurrency(product.nominalPayment);
    };

    useEffect(() => {
        setIsAdmin(
            JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role ===
            "Admin"
        );
    }, []);

    const onUpload = () => {
        toast.current!.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };

    const crudButton = (rowData: any) => {
        return (
            <FileUpload
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept="file/*"
                maxFileSize={1000000}
                onUpload={onUpload}
            />
        );
    };

    return (
        <div className="card">
            <DataTable
                ref={dt}
                value={props.data.slice((currentPage - 1) * rows, currentPage * rows)}
                first={first}
                rows={rows}
                stripedRows
                scrollable
                removableSort
            >
                <Column header="No" headerStyle={{width: "3rem"}} body={(data, options) => options.rowIndex + 1}/>
                <Column field="loan.code" header="Kode Pinjaman" sortable style={{width: "25%"}}/>
                <Column field="users.name" header="Nama" sortable style={{width: "25%"}}/>
                <Column field="loan.tenor" header="Tenor" sortable/>
                <Column field="nominalPayment" header="Tagihan Per Bulan" body={priceBodyTemplateAngsuran} sortable
                        style={{width: "25%"}}/>
                <Column field="dueDate" header="Jatuh Tempo" sortable style={{width: "25%"}}
                        body={(rowData) => {
                            const date = new Date(rowData.date);
                            return date.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                            });
                        }}
                />
                <Column field="paymentMethod" header="Metode Pembayaran" sortable style={{width: "25%"}}/>
                <Column field="paymentStatus" header="Status Pembayaran" sortable style={{width: "25%"}}/>
                <Column field="installmentStatus" header="Status Angsuran" sortable style={{width: "25%"}}/>
                <Column body={crudButton}/>
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

export default InstallmentTable;
