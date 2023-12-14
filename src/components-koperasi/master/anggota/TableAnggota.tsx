import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { useState } from "react";

type TTableAnggota = {
    data: any;
    loading: boolean;
    setDialogForm: (data: boolean) => void;
    setFormCondition: (data: string) => void;
    setSelectedData?: (data: any) => void;
};

const TableAnggota = (props: TTableAnggota) => {
    const [first, setFirst] = useState(0); // Menyimpan indeks pertama untuk paginasi
    const [rows, setRows] = useState(5); // Jumlah baris per halaman, sesuaikan sesuai kebutuhan

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);

        const currentPage = Math.floor(event.first / event.rows) + 1;
        setCurrentPage(currentPage)
    };

    const [currentPage, setCurrentPage] = useState(1);

    const crudButton = (rowData: any) => {
        return (
            <span className="p-buttonset">
                <Button
                    icon="pi pi-pencil"
                    severity="info"
                    size="small"
                    onClick={() => {
                        props.setFormCondition("Update");
                        props.setDialogForm(true);
                        props.setSelectedData!(rowData);
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    size="small"
                    onClick={() => {
                        props.setFormCondition("Delete");
                        props.setDialogForm(true);
                        props.setSelectedData!(rowData);
                    }}
                />
            </span>
        );
    };

    return (
        <div className="card">
            <Toolbar  />
            <DataTable
                value={props.data.slice(first, first + rows)} // Menyajikan hanya data untuk halaman saat ini
                loading={props.loading}
                stripedRows
                scrollable
            >
                <Column header="No" headerStyle={{ width: '5rem' }} body={(data, options) => first + options.rowIndex + 1} />
                <Column field="nik" header="NIK" />
                <Column field="name" header="Name" />
                <Column field="ttl" header="TTL" />
                <Column field="alamat" header="Alamat" />
                <Column field="departemen" header="Departemen" />
                <Column field="jabatan" header="Jabatan" />
                <Column field="golongan" header="Golongan" />
                <Column field="divisi" header="Divisi" />
                <Column field="status_karyawan" header="Status Karyawan" />
                <Column field="deskripsi" header="Deskripsi" />
                <Column body={crudButton} />

            </DataTable>
            
            <Paginator
                first={first}
                rows={rows}
                totalRecords={props.data.length}
                onPageChange={onPageChange}
                style={{ marginTop: "10px" }}
                currentPageReportTemplate={`Halaman ${Math.ceil((first + 1) / rows)} dari ${Math.ceil(props.data.length / rows)}`}
            />
        </div>
    );
};

export default TableAnggota;
