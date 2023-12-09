import {DataTable, DataTableFilterMeta} from 'primereact/datatable';
import {Column, ColumnFilterElementTemplateOptions} from 'primereact/column';
import {Button} from "primereact/button";
import {useEffect, useRef, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import * as React from "react";
import {Dialog} from "primereact/dialog";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {useRouter} from "next/router";
import {MenuItem} from "primereact/menuitem";
import {Menu} from "primereact/menu";
import BaseForm from "../BaseForm/BaseForm";
import {TBaseForm} from '../BaseForm/TypeBaseForm';
import {TColumnComponent} from "./TypeBaseTable";
import {Paginator} from "primereact/paginator";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {Tag} from "primereact/tag";
import BaseImport from "../BaseImport/BaseImport";
import {getAxiosInstance} from "../../service/api";

type Props = {
    value?: {}[];
    columnData: TColumnComponent[];
    paramsFunc?: (dataModel: any) => void;
    loading: boolean;
    meta?: any
    rows?: number;
    rowsPerPageOptions?: {}[] | undefined;
    formLabel: string;
    gridLine?: boolean;
    actionButton?:
        'create' | 'view' | 'edit' | 'delete' | 'export' |
        'create-view' | 'create-edit' | 'create-delete' | 'create-export' |
        'view-edit' | 'view-delete' | 'view-export' | 'edit-delete' | 'edit-export' | 'delete-export' |
        'create-view-edit' | 'create-view-delete' | 'create-view-export' | 'create-delete-export' |
        'create-edit-delete' | 'create-edit-export' | 'view-edit-delete' | 'view-edit-export' |
        'view-delete-export' | 'view-edit-delete-export' | 'all' | undefined;
    //form
    deleteFunc?: (dataModel: any) => void;
    dataUpdate?: (dataModel: any) => void;
    formData?: TBaseForm;
    //layout
    customToolbar?: any;
    customActionButton?: any;
    multipleDelete?: boolean;
    multipleDeleteFunc?: (dataModel: any) => void;
    deleteResponse?: any

    deleteCondition?: any
    editCondition?: any
    viewCondition?: any
    exportCondition?: any
    urlSingleExport?: any

    import?: boolean
    importData?: boolean
    importFunc?: (dataModel: any) => void;
    importUrl?: any
};

interface LazyTableState {
    first: number;
    rows: number;
    page: number;
    sortField?: string | undefined;
    sortOrder?: number | undefined;
    filters: DataTableFilterMeta;
}

function BaseTable(props: Props) {
    const router = useRouter()
    const importMenu = useRef<Menu>(null);
    const columns: TColumnComponent[] | undefined = props.columnData;
    const toast = useRef<Toast>(null);
    const csv = useRef<any>(null);
    let mapEmptyData: { [key: string]: any } = {};
    let filterMap: { [key: string]: any } = {};

    const [maxWidth, setMaxWidth] = useState("1500px");
    const [selectedRows, setSelectedRows] = useState<any>();
    const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
    const [visibleImport, setVisibleImport] = useState<boolean>(false);
    const [visibleDeleteDialog, setVisibleDeleteDialog] = useState<boolean>(false);
    const [visibleDeleteMultipleDialog, setVisibleDeleteMultipleDialog] = useState<boolean>(false);
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false);
    const [dataModel, setDataModel] = useState<any>();
    const [dataDelete, setDataDelete] = useState<any>();
    const [buttonAction, setButtonAction] = useState<string>('');
    const [paramsState, setParamsState] = useState<LazyTableState>({
        first: 0,
        rows: props.rows ? props.rows : 10,
        page: 1,
        sortField: '',
        sortOrder: 0,
        filters: filterMap
    });

    useEffect(() => {
        const filteredFilters = Object.fromEntries(
            Object.entries(paramsState.filters).filter(([key, value]) => {
                // @ts-ignore
                return value && typeof value === "object" && value.value !== "";
            })
        );

        const transformedData = Object.entries(filteredFilters).reduce((result, [key, value]) => {
            let keyData = key;
            let valueData = value;
            if (key.includes(".")) {
                keyData = key.split(".")[0] + "Id";
            }
            // @ts-ignore
            if (typeof valueData.value === "object" && valueData.value.hasOwnProperty("code")) {
                if ("value" in valueData) {
                    valueData = valueData.value.code;
                }
            } else {
                if ("value" in valueData) {
                    valueData = valueData.value;
                }
            }
            if (valueData !== null && valueData !== undefined) {
                // @ts-ignore
                result[keyData] = ['LIKE', valueData];
            }
            return result;
        }, {});

        if (props.paramsFunc) {
            const jsonString = JSON.stringify(transformedData);
            const base64String = btoa(jsonString);

            if (Object.keys(transformedData).length !== 0 && paramsState.sortField !== '' || null) {
                props.paramsFunc({
                    filters: base64String,
                    sort: paramsState.sortField,
                    page: paramsState.page,
                    "per-page": paramsState.rows,
                });
            } else if (paramsState.sortField !== '' || null) {
                props.paramsFunc({
                    sort: paramsState.sortOrder == 1 ? paramsState.sortField : `-${paramsState.sortField}`,
                    page: paramsState.page,
                    "per-page": paramsState.rows,
                });
            } else if (Object.keys(transformedData).length !== 0) {
                props.paramsFunc({
                    filters: base64String,
                    page: paramsState.page,
                    "per-page": paramsState.rows,
                });
            } else {
                props.paramsFunc({
                    page: paramsState.page,
                    "per-page": paramsState.rows,
                });
            }
        }

    }, [paramsState])

    const handleFilter = (e: any) => {
        const {filters} = e;
        setParamsState((prevState) => ({
            ...prevState,
            filters: filters,
        }));
    };
    const handleSort = (e: any) => {
        const {sortField, sortOrder} = e;
        setParamsState((prevState) => ({
            ...prevState,
            sortField: sortField,
            sortOrder: sortOrder === 1 ? 1 : -1,
        }));
    }
    const onPageChange = (e: any) => {
        const {rows, page, first} = e;
        setParamsState((prevState) => ({
            ...prevState,
            rows: rows,
            page: page + 1,
            first: first,
        }));
    }

    const exportColumns = columns.map((col) => ({title: col.field, dataKey: col.field}));
    const columnData = columns?.map((col) => {
        if (col.filter?.type) {
            const handleOnChangeDropdown = (e: any) => {
                const {value} = e;
                setParamsState((prevState) => ({
                    ...prevState,
                    filters: {
                        ...prevState.filters,
                        [col.field]: {
                            value: value,
                            matchMode: 'contains',
                        },
                    },
                }));
            };

            let filterTemplate;
            if (col.filter.type === 'dropdown') {
                let optionsFilter: any[] | undefined;
                if (col.field === 'Status') {
                    const statusArray = ['Active', 'Inactive'];
                    optionsFilter = statusArray.map((item) => ({name: item, code: item}));
                } else {
                    optionsFilter = col.filter.option?.data;
                }

                filterTemplate = (options: any) => {
                    // @ts-ignore
                    const optionValue = paramsState.filters?.[col.field]?.value || null;
                    return (
                        <Dropdown
                            value={optionValue}
                            options={optionsFilter}
                            onChange={(e) => handleOnChangeDropdown(e)}
                            optionLabel="name"
                            optionValue="code"
                            placeholder="Choose"
                            className="p-column-filter"
                            showClear
                        />
                    );
                };
            } else if (col.filter.type === 'switch-input') {
                const statusArray = [true, false];
                const optionsFilter = statusArray.map((item) => ({
                    name: item ? 'yes' : 'no',
                    code: item,
                }));

                filterTemplate = (options: any) => {
                    // @ts-ignore
                    const optionValue = paramsState.filters?.[col.field]?.value || null;
                    return (
                        <Dropdown
                            value={optionValue}
                            options={optionsFilter}
                            // onChange={(e) => options.filterApplyCallback(e.value)}
                            onChange={(e) => handleOnChangeDropdown(e)}
                            optionLabel="name"
                            optionValue="code"
                            placeholder="Choose"
                            className="p-column-filter"
                            showClear
                        />
                    )
                };
            } else if (col.filter.type === 'date') {
                filterTemplate = (options: any) => (
                    <Calendar
                        value={options.value}
                        onChange={(e) => options.filterCallback(e.value, options.index)}
                        dateFormat="mm/dd/yy"
                        placeholder="mm/dd/yyyy"
                        mask="99/99/9999"
                    />
                );
            }

            if (col.typeData === 'boolean') {
                const customBodyBoolean = (data: any) => {
                    return <Tag value={data[col.field] ? 'Yes' : 'No'}
                                severity={data[col.field] ? 'success' : 'danger'}/>
                }
                return (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.label || col.field}
                        style={col.style || {width: 'auto'}}
                        bodyClassName={col.bodyClassName}
                        body={customBodyBoolean}
                        sortable
                        filter={visibleFilter}
                        filterPlaceholder="Search"
                        filterElement={filterTemplate}
                        showFilterMenu={false}
                    />
                );
            } else {
                return (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.label || col.field}
                        style={col.style || {width: 'auto'}}
                        bodyClassName={col.bodyClassName}
                        body={col.body}
                        sortable
                        filter={visibleFilter}
                        filterPlaceholder="Search"
                        filterElement={filterTemplate}
                        showFilterMenu={false}
                    />
                );
            }


        } else {
            return (
                <Column
                    key={col.field}
                    field={col.field}
                    header={col.label ? col.label : col.field}
                    style={visibleFilter ? {minWidth: "15rem"} : {minWidth: "4rem"}}
                    bodyClassName={col.bodyClassName}
                    body={col.body}
                    sortable
                    filter={visibleFilter}
                    filterPlaceholder="Search"
                    showFilterMenu={false}
                />
            )
        }
    });

    columns?.forEach((col) => {
        filterMap[col.field] = {value: '', matchMode: 'contains'}
        switch (col.typeData) {
            case 'text':
                mapEmptyData[col.field] = '';
                break;
            case 'date':
                mapEmptyData[col.field] = null;
                break;
            case 'image':
                mapEmptyData[col.field] = '';
                break;
            case 'boolean':
                mapEmptyData[col.field] = false;
                break;
            case 'array':
                mapEmptyData[col.field] = [];
                break;
            default:
                break;
        }
    });

    //toolbar
    const saveAsExcelFile = (buffer: any, fileName: any) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, 'export_xls_' + fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const importItems: MenuItem[] = [
        {
            label: 'CSV',
            icon: 'pi pi-file',
            command: () => {
                csv.current.exportCSV();
            }
        },
        {
            label: 'XLS',
            icon: 'pi pi-file-excel',
            command: () => {
                import('xlsx').then((xlsx) => {
                    const worksheet = xlsx.utils.json_to_sheet(props.value ?? []);
                    const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
                    const excelBuffer = xlsx.write(workbook, {
                        bookType: 'xlsx',
                        type: 'array'
                    });
                    saveAsExcelFile(excelBuffer, props.formLabel);
                });
            }
        },
        {
            label: 'PDF',
            icon: 'pi pi-file-pdf',
            command: () => {
                import('jspdf').then(({jsPDF}) => {
                    import('jspdf-autotable').then(() => {
                        const doc = new jsPDF();

                        const today = new Date();
                        const date = today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();

                        // @ts-ignore
                        doc.autoTable(exportColumns, props.value);
                        doc.save(`export_pdf_${props.formLabel}_${new Date().getTime()}.pdf`);
                    });
                });
            }
        }
    ];
    const leftToolbarTemplate = () => {
        return (
            <span className="p-buttonset">
               {
                   props.actionButton === 'create' ||
                   props.actionButton === 'create-view' ||
                   props.actionButton === 'create-edit' ||
                   props.actionButton === 'create-delete' ||
                   props.actionButton === 'create-view-edit' ||
                   props.actionButton === 'create-view-delete' ||
                   props.actionButton === 'create-edit-delete' ||
                   props.actionButton === 'all' ? (
                           <Button
                               label="Create"
                               icon="pi pi-plus"
                               size="small"
                               severity="success"
                               onClick={() => handleCreate()}
                           />
                       )
                       : null
               }
                <Button
                    type="button"
                    icon="pi pi-filter"
                    onClick={() => {
                        visibleFilter ? setVisibleFilter(false) : setVisibleFilter(true)
                    }}
                    severity="secondary"
                    tooltip="Filter"
                    size="small"
                    tooltipOptions={{position: "bottom"}}
                />
                <Menu model={importItems} popup ref={importMenu} style={{width: "150px"}}/>
                <Button
                    icon="pi pi-file"
                    // className="mr-2"
                    onClick={(e) => importMenu.current?.toggle(e)}
                    severity="info"
                    tooltip="Export"
                    size="small"
                    tooltipOptions={{position: "bottom"}}
                />
                {
                    props.import
                        ?
                        <Button
                            icon="pi pi-file-import"
                            size="small"
                            severity="warning"
                            tooltip="Import"
                            onClick={() => handleImport()}
                            tooltipOptions={{position: "bottom"}}
                        />
                        : null
                }
            </span>
        );
    };
    const disableMultipleDelete = (selectedRows === null || selectedRows === undefined || selectedRows.length === 0)
    const rightToolbarTemplate = () => {
        return (
            <div>
                {props.multipleDelete
                    ?
                    <Button
                        type="button"
                        label="Delete"
                        severity="danger"
                        size="small"
                        onClick={() => setVisibleDeleteMultipleDialog(true)}
                        disabled={disableMultipleDelete}
                    />
                    : null
                }

            </div>
        )
    };

    //action button
    const handleView = (data: any) => {
        const urlRedirect = props.formLabel.toLowerCase()
        router.push(`${urlRedirect}/${data.Id}`)
    };
    const handleCreate = () => {
        setButtonAction('create')
        setVisibleDialog(true);
        setDataModel(mapEmptyData)
    };
    const handleImport = () => {
        setVisibleImport(true);
    };

    function simplifyPercentage(decimalNumber: any) {
        let value = decimalNumber
        if (decimalNumber.toString().length >= 20) {
            value = decimalNumber * 10000000
        }
        const percentage = value?.toFixed(2);
        return `${percentage}%`;
    }

    const handleSingleExport = async (detail: any) => {
        try {
            const axiosInstance = getAxiosInstance();
            const response = await axiosInstance.get(props.urlSingleExport + detail.Id);
            const data = response.data?.Data;

            const modalPrice = data.ProposalProducts.reduce((acc: any, curr: { Cost: any, Volume: any }) => acc + (curr.Cost * curr.Volume), 0);
            const pocketProfit = (data.TotalProfit / modalPrice) * 100;
            const normalPrice = data.ProposalProducts.reduce((acc: any, curr: { Price: any, Volume: any }) => acc + (curr.Price * curr.Volume), 0)
            const totalDiscount = normalPrice - data.TotalRevenue;
            const pocketDiscount = (totalDiscount / data.TotalRevenue) * 100;

            const rows = [
                ["Kimap", data.Code, "", "Region", data.Region.Name],
                ["SH Grup", data.ShipPartyGroup.Name, "", "Durasi Bulan", data.DurationMonth],
                ["Total HT Khusus Distributor", data.TotalSpecialPrice, "", "Durasi Tahun", data.DurationYear],
                ["Total COGS", data.TotalCost, "", "Total Volume", data.TotalVolume],
                ["Total Revenue", data.TotalRevenue, "", "Pocket Profit", `${data.NominalPocketProfit} (${simplifyPercentage(data.PocketProfit)})`],
                ["Pocket Margin", `${data?.NominalPocketDiscount} (${simplifyPercentage(data?.PocketDiscount)})`, "", "Persetujuan Selanjutnya Oleh", data.NextApprover],
                ["Tanggal Dibuat", data.CreatedAt],
            ];

            const headerProduct = [
                "Kimap", "Deskripsi", "Harga Jual Distributor", "HT Umum Distributor", "Volume", "Margin Distributor", "HT Khusus Distributor", "Total Revenue", "Total Profit",
            ].join(",");

            const productsInfo = data.ProposalProducts.map((product: any) => {
                return `${product.Product.Code},${product.Product.Name},${product.DistributorPrice},${product.Price},${product.Volume},${product.Discount},${product.SellingPrice},${product.Revenue},${product.Profit}`;
            }).join("\n");

            const headerParties = [
                "Region", "SH Grup", "SH", "SP", "Segmen Konsumen"
            ].join(",");

            const partiesInfo = data.ProposalShipParties.map((parties: any) => {
                return `${parties.ShipParty.Region.Name},${parties.ShipParty.ShipPartyGroup.Name},${parties.ShipParty.Name},${parties.ShipParty.SoldParty.Name},${parties.ShipParty.Customers[0].CustomerSegment.Name}`
            }).join("\n")

            const rowsContent = rows.map((row) => row.join(",")).join("\n");
            const csvContent = `${rowsContent}\n\n${headerProduct}\n${productsInfo}\n\n${headerParties}\n${partiesInfo}`;

            const blob = new Blob([csvContent], {type: "text/csv"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `exported_${props.formLabel}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleUpdate = (data: any) => {
        if (props.dataUpdate) {
            props.dataUpdate(data)
        }
        setButtonAction('update')
        setVisibleDialog(true);
        setDataModel({...data})
    };
    const handleDelete = (data: any) => {
        setDataDelete(data)
        setVisibleDeleteDialog(true);
    };

    const actionView = (data: any) => {
        return (
            <Button
                icon="pi pi-eye"
                severity="secondary"
                tooltip="View"
                aria-label="view"
                size="small"
                onClick={() => handleView(data)}
                pt={{
                    root: {className: 'h-2rem w-2rem'}
                }}
                tooltipOptions={{position: "bottom"}}
            />
        )
    };
    const actionEdit = (data: any) => {
        return (
            <Button
                icon="pi pi-pencil"
                severity="info"
                tooltip="Edit"
                aria-label="edit"
                size="small"
                onClick={() => handleUpdate(data)}
                pt={{
                    root: {className: 'h-2rem w-2rem'}
                }}
                tooltipOptions={{position: "bottom"}}
            />
        )
    };
    const actionDelete = (data: any, disabled?: boolean) => {
        return (
            <Button
                icon="pi pi-trash"
                severity="danger"
                tooltip="Delete"
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(data)}
                pt={{
                    root: {className: 'h-2rem w-2rem'}
                }}
                disabled={disabled}
                tooltipOptions={{position: "bottom"}}
            />
        )
    };

    const actionExport = (data: any, disabled?: boolean) => {
        return (
            <Button
                icon="pi pi-download"
                severity="warning"
                tooltip="Export"
                onClick={() => handleSingleExport(data)}
                tooltipOptions={{position: "bottom"}}
                size="small"
                pt={{
                    root: {className: 'h-2rem w-2rem'}
                }}
                disabled={disabled}
            />
        )
    }

    const crudButton = (data: any) => {
        let deleteDisable = true
        let exportDisable = true
        const deleteKeys = props.deleteCondition ? Object.keys(props.deleteCondition) : null;
        const deleteValues = props.deleteCondition ? Object.values(props.deleteCondition) : null;

        const exportKeys = props.exportCondition ? Object.keys(props.exportCondition) : null;
        const exportValues = props.exportCondition ? Object.values(props.exportCondition) : null;

        if (deleteKeys && deleteValues && deleteKeys.length > 0 && deleteValues.length > 0) {
            if (data[deleteKeys[0]] === deleteValues[0]) {
                deleteDisable = false;
            }
        } else {
            deleteDisable = false;
        }

        if (exportKeys && exportValues && exportKeys.length > 0 && exportValues.length > 0) {
            if (data[exportKeys[0]] === exportValues[0]) {
                exportDisable = false;
            }
        } else {
            exportDisable = false;
        }

        return (
            <span className="p-buttonset">
                {(() => {
                    switch (props.actionButton) {
                        case 'view':
                        case 'create-view':
                            return <>{actionView(data)}</>
                        case 'edit':
                        case 'create-edit':
                            return <>{actionEdit(data)}</>
                        case 'delete':
                        case 'create-delete':
                            return <>{actionDelete(data, deleteDisable)}</>
                        case 'export':
                        case 'create-export':
                            return <>{actionExport(data, exportDisable)}</>
                        case 'view-edit':
                        case 'create-view-edit':
                            return <>{actionView(data)}{actionEdit(data)}</>
                        case 'view-delete':
                        case 'create-view-delete':
                            return <>{actionView(data)}{actionDelete(data, deleteDisable)}</>
                        case 'view-export':
                        case 'create-view-export':
                            return <>{actionView(data)}{actionExport(data, exportDisable)}</>
                        case 'edit-delete':
                        case 'create-edit-delete':
                            return <>{actionEdit(data)}{actionDelete(data, deleteDisable)}</>
                        case 'edit-export':
                        case 'create-edit-export':
                            return <>{actionDelete(data, deleteDisable)}{actionExport(data, exportDisable)}</>
                        case 'delete-export':
                        case 'create-delete-export':
                            return <>{actionDelete(data, deleteDisable)}{actionExport(data, exportDisable)}</>
                        case 'view-edit-delete':
                            return <>{actionView(data)}{actionEdit(data)}{actionDelete(data, deleteDisable)}</>
                        case 'view-edit-export':
                            return <>{actionView(data)}{actionEdit(data)}{actionExport(data, exportDisable)}</>
                        case 'view-delete-export':
                            return <>{actionView(data)}{actionDelete(data, deleteDisable)}{actionExport(data, exportDisable)}</>
                        case 'all':
                        case 'view-edit-delete-export':
                            return <>{actionView(data)}{actionEdit(data)}{actionDelete(data, deleteDisable)}{actionExport(data, exportDisable)}</>
                        default:
                            return null
                    }
                })()}
            </span>
        );
    };

    //modal CRUD
    const deleteMultiple = () => {
        if (props.multipleDeleteFunc) {
            props.multipleDeleteFunc(selectedRows)
        }
    }

    const deleteMultipleDialogFooter = (
        <div>
            <Button
                label="No"
                icon="pi pi-times"
                onClick={() => setVisibleDeleteMultipleDialog(false)}
                className="p-button-text"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                onClick={deleteMultiple}
                autoFocus
            />
        </div>
    )


    const modalCrud = () => {
        return (
            <Dialog
                visible={visibleDialog}
                style={{width: "600px"}}
                header={props.formLabel}
                modal
                className="p-fluid"
                onHide={() => setVisibleDialog(false)}
            >
                <BaseForm
                    formCondition={buttonAction}
                    formItems={props.formData}
                    handleDialog={(data) => setVisibleDialog(data)}
                />
            </Dialog>
        );
    };

    const modalImport = () => {
        return (
            <Dialog
                visible={visibleImport}
                style={{width: "900px"}}
                header={"Import " + props.formLabel}
                modal
                className="p-fluid"
                onHide={() => setVisibleImport(false)}
            >
                <BaseImport
                    url={props.importUrl}
                    handleDialog={(dataModel: any) => setVisibleImport(dataModel)}
                    saveImport={(dataModel: any) => {
                        if (props.importFunc) {
                            props.importFunc(dataModel)
                        }
                    }}
                    data={props.importData}
                />
            </Dialog>
        )
    }

    const accept = () => {
        if (props.deleteFunc) {
            props.deleteFunc(dataDelete)
        }
    }
    const reject = () => {
    }

    useEffect(() => {
        const handleDelete = async () => {
            if (props.deleteResponse && props.deleteResponse?.message?.Status === 200) {
                setVisibleDeleteDialog(false);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success Delete',
                    detail: `${dataDelete?.Name}`,
                    life: 5000
                });
                await new Promise((resolve) => setTimeout(resolve, 2500));
                window.location.reload();
            }
            if (props.deleteResponse && props.deleteResponse?.message?.Status === 400) {
                setVisibleDeleteDialog(true);
                toast.current?.show({
                    severity: 'error',
                    summary: `Delete Failed ${dataDelete?.Name}`,
                    detail: `${props.deleteResponse?.message?.Message}`,
                    life: 5000
                });
            }
        };

        handleDelete();

    }, [props.deleteResponse]);

    const modalDelete = () => {
        return (
            <ConfirmDialog
                visible={visibleDeleteDialog}
                onHide={() => setVisibleDeleteDialog(false)}
                message={dataDelete && (
                    <span>Are you sure you want to delete <b>{dataDelete.Name ? dataDelete.Name : dataDelete.Code}</b> ?</span>)}
                header="Delete"
                icon={<i className="pi pi-exclamation-triangle" style={{color: 'red', fontSize: '2rem'}}/>}
                accept={accept}
                reject={reject}
            />
        )
    }
    const modalDeleteMultiple = () => {
        return (
            <Dialog
                visible={visibleDeleteMultipleDialog}
                style={{width: "400px"}}
                header="Multiple Delete"
                modal
                className="p-fluid"
                footer={deleteMultipleDialogFooter}
                onHide={() => setVisibleDeleteMultipleDialog(false)}
            >
                {selectedRows?.map((row: any) => {
                    const keys = Object.keys(row);
                    return (
                        <div key={row.Id}>
                            <p>{row.Name ? row.Name : row.Code}</p>
                            <hr/>
                        </div>
                    )
                })}
            </Dialog>
        )
    }

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            if (screenWidth === 1366 && screenHeight === 768) {
                setMaxWidth("1025px");
            } else if (screenWidth === 1920 && screenHeight === 1080) {
                setMaxWidth("1500px");
            } else {
                setMaxWidth("1500px");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div style={{maxWidth: maxWidth}}>
            <Toast ref={toast}/>
            <Toolbar start={leftToolbarTemplate} end={rightToolbarTemplate}/>
            <DataTable
                value={props.value}
                showGridlines={props.gridLine}
                removableSort
                scrollable
                loading={props.loading}
                size="small"
                filterDisplay={visibleFilter ? 'row' : 'menu'}
                selection={selectedRows!}
                onSelectionChange={(e) => {
                    const value = e.value;
                    setSelectedRows(value);
                }}
                ref={csv}
                stripedRows
                filters={paramsState.filters}
                sortField={paramsState.sortField}
                sortOrder={paramsState.sortOrder as 0 | 1 | -1 | null | undefined}
                onFilter={handleFilter}
                onSort={handleSort}
                lazy
            >
                {props.multipleDelete
                    ?
                    <Column selectionMode="multiple" headerStyle={{width: '3rem', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                    />
                    : null
                }

                <Column key="1" header="#" headerStyle={{width: 'auto'}}
                        body={(data, options) => options.rowIndex + 1}
                />

                {columnData}

                {
                    props.actionButton === 'view' ||
                    props.actionButton === 'edit' ||
                    props.actionButton === 'delete' ||
                    props.actionButton === 'export' ||
                    props.actionButton === 'create-view' ||
                    props.actionButton === 'create-edit' ||
                    props.actionButton === 'create-delete' ||
                    props.actionButton === 'create-export'
                        ? (
                            <Column
                                key="2"
                                header=""
                                body={crudButton}
                                headerStyle={{width: '3rem', textAlign: 'center'}}
                                bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                style={{minWidth: "10rem"}}
                            />
                        ) :
                        props.actionButton === 'view-edit' ||
                        props.actionButton === 'view-delete' ||
                        props.actionButton === 'view-export' ||
                        props.actionButton === 'edit-delete' ||
                        props.actionButton === 'edit-export' ||
                        props.actionButton === 'delete-export' ||
                        props.actionButton === 'create-view-edit' ||
                        props.actionButton === 'create-view-delete' ||
                        props.actionButton === 'create-edit-delete' ||
                        props.actionButton === 'create-edit-export' ||
                        props.actionButton === 'create-delete-export'
                            ? (
                                <Column
                                    key="2"
                                    header=""
                                    body={crudButton}
                                    headerStyle={{width: '6rem', textAlign: 'center'}}
                                    bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                    style={{minWidth: "10rem"}}
                                />
                            ) :
                            props.actionButton === 'view-edit-delete' ||
                            props.actionButton === 'view-delete-export'
                                ? (
                                    <Column
                                        key="2"
                                        header=""
                                        body={crudButton}
                                        headerStyle={{width: '8rem', textAlign: 'center'}}
                                        bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                        style={{minWidth: "10rem"}}
                                    />
                                ) :
                                props.actionButton === 'all' ||
                                props.actionButton === 'view-edit-delete-export'
                                    ? (
                                        <Column
                                            key="2"
                                            header=""
                                            body={crudButton}
                                            headerStyle={{width: '10rem', textAlign: 'center'}}
                                            bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                            style={{minWidth: "10rem"}}
                                        />
                                    ) : null
                }
            </DataTable>
            <Paginator
                first={paramsState.first}
                rows={paramsState.rows}
                totalRecords={props.meta ? props.meta?.Record?.Total : null}
                rowsPerPageOptions={[10, 25, 50, 100]}
                template={
                    {
                        layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
                        CurrentPageReport: (options) => {
                            return (
                                <span style={{
                                    color: 'var(--text-color)',
                                    userSelect: 'none',
                                    width: '120px',
                                    textAlign: 'center'
                                }}>{options.first ? options.first : 0} - {((paramsState.first ? paramsState.first : 0) + (props.meta?.Record ? props.meta?.Record?.Current : 0))} of {options.totalRecords ? options.totalRecords : 0}</span>
                            );
                        }
                    }}
                onPageChange={onPageChange}
            />
            {modalCrud()}
            {modalImport()}
            {modalDelete()}
            {modalDeleteMultiple()}
        </div>
    );
}

export default BaseTable;

