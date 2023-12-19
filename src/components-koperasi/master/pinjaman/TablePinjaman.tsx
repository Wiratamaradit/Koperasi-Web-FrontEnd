import {DataTable, DataTableFilterMeta} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import {useEffect, useState} from "react";
import axios from "axios";
import {Dropdown} from "primereact/dropdown";

type TTablePinjaman = {
    data: any;
    pinjamanList: any;
    loading: boolean;
    setDialogForm: (data: boolean) => void;
    setFormCondition: (data: string) => void;
    setSelectedData?: (data: any) => void;
};

const TablePinjaman = (props: TTablePinjaman) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [selectedPinjaman, setSelectedPinjaman] = useState<any>(5);

    const transformed = props.pinjamanList.map((item: any) => {
        if (item && item.anggotas && typeof item.anggotas.name === 'string') {
            const nameParts = item.anggotas.name.split(" ").slice(0, 2);
            const transformedItem = {
                name: nameParts.join(" "),
                code: item.id,
            };
            return transformedItem;
        } else {
            console.error("Invalid 'name' property:", item);
            return null;
        }
    });

    const startContent = (
        <>
            <Button
                label="Pengajuan"
                icon="pi pi-plus"
                severity="success"
                size="small"
                onClick={() => {
                    props.setFormCondition("Create");
                    props.setDialogForm(true);
                }}
            />
            <Dropdown
                value={selectedPinjaman}
                onChange={(e) => setSelectedPinjaman(e.value)}
                options={transformed}
                optionLabel="name"
                placeholder="Cari Nama Anggota"
                className="w-full md:w-14rem ml-2"
            />
        </>
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
            <Toolbar start={startContent}/>
            <DataTable
                value={props.data}
                loading={props.loading}
                stripedRows
                scrollable
            >
                <Column header="#" headerStyle={{width: '3rem'}} body={(data, options) => options.rowIndex + 1}/>
<<<<<<< Updated upstream
                <Column field="kode" header="Code"/>
=======
                <Column field="kode" header="Kode Pinjaman"/>
>>>>>>> Stashed changes
                <Column field="anggotas.name" header="Anggota"/>
                <Column field="tgl_pinjaman" header="Tgl Pinjaman"/>
                <Column field="anggotas.golongan" header="Golongan"/>
                <Column field="pinjaman" header="Total Pinjaman"/>
                <Column field="bunga" header="Bunga (1,5%)"/>
                <Column field="tenor" header="Tenor"/>
                <Column field="jatuh_tempo" header="Jatuh Tempo"/>
                <Column field="deskripsi" header="Deskripsi"/>
                <Column field="angsuran" header="Angsuran/bulan"/>
                <Column body={crudButton}/>
            </DataTable>

            <Paginator
                first={first}
                rows={rows}
                totalRecords={props.data?.length}
                onPageChange={onPageChange}
                style={{marginTop: "10px"}}
            />
        </div>
    );
};

export default TablePinjaman;
