import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

type TTableAnggota = {
    data: any,
    loading: boolean,
    setDialogForm: (data: boolean) => void,
    setFormCondition: (data: string) => void,
    setSelectedData?: (data: any) => void
}

const TableAnggota = (props: TTableAnggota) => {

    const startContent = (
        <Button
            label="Create"
            icon="pi pi-plus"
            severity="success"
            size="small"
            onClick={() => {
                props.setFormCondition('Create')
                props.setDialogForm(true)
            }}
        />
    )
    const crudButton = (rowData: any) => {
        return (
            <span className="p-buttonset">
                    <Button
                        icon="pi pi-pencil"
                        severity="info"
                        size="small"
                        onClick={() => {
                            props.setFormCondition('Update')
                            props.setDialogForm(true)
                            props.setSelectedData!(rowData)
                        }}
                    />
                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        size="small"
                        onClick={() => {
                            props.setFormCondition('Delete')
                            props.setDialogForm(true)
                            props.setSelectedData!(rowData)
                        }}
                    />
                </span>
        )
    }

    return (
        <div className="card">
            {/*<Toolbar start={startContent}/>*/}
            <DataTable value={props.data} loading={props.loading} stripedRows scrollable>
                <Column header="#" headerStyle={{width: '3rem'}} body={(data, options) => options.rowIndex + 1}/>
                <Column field="nik" header="NIK"/>
                <Column field="name" header="Name"/>
                <Column field="ttl" header="TTL"/>
                <Column field="alamat" header="Alamat"/>
                <Column field="departemen" header="Departemen"/>
                <Column field="jabatan" header="Jabatan"/>
                <Column field="status_karyawan" header="Status Karyawan"/>
                <Column field="deskripsi" header="Deskripsi"/>
                <Column field="status" header="Status"/>
                <Column body={crudButton}/>
            </DataTable>
        </div>
    )
}

export default TableAnggota