import {useState} from "react";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Paginator} from "primereact/paginator";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";

type TUser = {
    data: any;
    loading: boolean;
    setDialogForm: (data: boolean) => void;
    setFormCondition: (data: string) => void;
    setSelectedData?: (data: any) => void;
}

const TableUser = (props: TUser) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const startContent = (
        <>
            <Button
                type="button"
                size="small"
                severity="success"
                label="Create"
                icon="pi pi-plus"
                onClick={() => {
                    props.setFormCondition!("Create")
                    props.setDialogForm(true);
                }}
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
                <Column field="name" header="name"/>
                <Column field="email" header="email"/>
                <Column field="role" header="role"/>
                <Column field="email_verified_at" header="email_verified_at"/>
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
}

export default TableUser