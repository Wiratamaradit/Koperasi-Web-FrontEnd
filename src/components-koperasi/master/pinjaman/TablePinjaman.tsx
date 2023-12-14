import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import axios from "axios";

type TTablePinjaman = {
    data: any;
    loading: boolean;
    setDialogForm: (data: boolean) => void;
    setFormCondition: (data: string) => void;
    setSelectedData?: (data: any) => void;
};

const TablePinjaman = (props: TTablePinjaman) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [relatedData, setRelatedData] = useState<any[]>([]);

    useEffect(() => {
        fetchRelatedDataForAllPinjamans();
    }, []);

    const fetchRelatedDataForAllPinjamans = async () => {
        try {
            const data = await fetchRelatedData();
            setRelatedData(data);
        } catch (error) {
            console.error("Error fetching related data:", error);
        }
    };

    const fetchRelatedData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/listPinjaman');
            return response.data;
        } catch (error) {
            console.error("Error fetching related data:", error);
            return [];
        }
    };

    const renderIdAnggotaColumn = (rowData: any) => {
        const relatedInfo = relatedData.find((item) => item.id === rowData.id_anggota);
        return relatedInfo ? (
            <div>
                <p>{relatedInfo.id_anggota}</p>
            </div>
        ) : (
            <p>No data found</p>
        );
    };

    const startContent = (
        <Button
            label="Create"
            icon="pi pi-plus"
            severity="success"
            size="small"
            onClick={() => {
                props.setFormCondition("Create");
                props.setDialogForm(true);
            }}
        />
    );

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

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
            <Toolbar start={startContent} />
            <DataTable
                value={props.data?.slice(first, first + rows)}
                loading={props.loading}
                stripedRows
                scrollable
            >
                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1} />
                <Column field="id_anggota" header="Id Anggota" body={renderIdAnggotaColumn} />
                <Column field="tgl_pinjaman" header="Tgl Pinjaman" />
                <Column field="pinjaman" header="Total Pinjaman" />
                <Column field="bunga" header="Bunga" />
                <Column field="tenor" header="Tenor" />
                <Column field="jatuh_tempo" header="Jatuh Tempo" />
                <Column field="deskripsi" header="Deskripsi" />
                <Column field="status" header="Status" />
                <Column body={crudButton} />
            </DataTable>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={props.data?.length}
                onPageChange={onPageChange}
                style={{ marginTop: "10px" }}
            />
        </div>
    );
};

export default TablePinjaman;
