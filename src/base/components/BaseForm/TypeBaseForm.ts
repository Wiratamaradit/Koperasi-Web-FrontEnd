import {LengthValidator} from "../Validators/LengthValidator";
import {RegexValidator} from "../Validators/RegexValidator";
import {CustomValidation} from "../Validators/CustomValidator";
import {TColumnComponent} from "../BaseTable/TypeBaseTable";

export type  TBaseForm = {
    createFunc?: (dataModel: any) => Promise<void>;
    updateFunc?: (dataModel: any) => Promise<void>;
    message?: string | any;
    loading?: boolean;
    items?: TFormComponent[];
    columns: TColumnComponent[];

    create?: TCreate
    update?: TUpdate
}

export type TCreate = {
    action: (dataModel: any) => Promise<void>;
    message: string | any;
    loading: boolean;
    data?: any;
    status: number;
    items: TFormComponent[];
}

export type TUpdate = {
    action: (dataModel: any) => Promise<void>;
    message: string | any;
    loading: boolean;
    data?: any;
    status: number;
    items: TFormComponent[];
}

export type TFormComponent = {
    field: string;
    // typeField: 'text' | 'text-area' | 'number' | 'upload' | 'radioButton' | 'checkBox' | 'dropdown' | 'date' | 'password' | 'inputSwitch';
    typeForm: 'text' | 'text-area' | 'number' | 'upload' | 'radioButton' | 'checkBox' | 'dropdown' | 'dropdownX' | 'date' | 'password' | 'inputSwitch';
    label?: string;
    values?: any;
    options?: TOption;
    required?: boolean;
    validator?: (LengthValidator | RegexValidator | CustomValidation)[];
    scenario?: 'create' | 'update';
}

export type TOption = {
    data: any;
    param?: (dataModel: any) => void;
}