import {TValidator} from "../Validators/Validators";
import {LengthValidator} from "../Validators/LengthValidator";
import {RegexValidator} from "../Validators/RegexValidator";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import {Checkbox, CheckboxChangeEvent} from "primereact/checkbox";
import {RadioButton, RadioButtonChangeEvent} from "primereact/radiobutton";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload, FileUploadHandlerEvent} from "primereact/fileupload";
import {Password} from "primereact/password";
import {InputSwitch, InputSwitchChangeEvent} from "primereact/inputswitch";
import * as React from "react";
import {useEffect, useState} from "react";
import {TBaseForm, TFormComponent} from "./TypeBaseForm";
import {Button} from "primereact/button";
import {Message} from "primereact/message";
import {
    AutoCompleteSelectEvent
} from "primereact/autocomplete";
import {Tooltip} from "primereact/tooltip";
import {Image} from 'primereact/image';

type BaseFormProps = {
    formCondition: string | undefined
    formItems: TBaseForm | undefined | any
    handleDialog?: (data: boolean) => void
};

const BaseForm: React.FC<BaseFormProps> =
    ({
         formCondition,
         formItems,
         handleDialog
     }) => {
        let mapEmptyData: { [key: string]: any } = {};
        const [dataModel, setDataModel] = useState<any>(mapEmptyData);
        const [dropdownSelected, setDropdownSelected] = useState<any>();
        const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
        const [itemsCondition, setItemsCondition] = useState<any>([]);
        const [formStatus, setFormStatus] = useState<any>(null);
        const [validatorStatus, setValidatorStatus] = useState<any>(null);
        const [image, setImage] = useState<any>(null);

        useEffect(() => {
            if (formCondition === 'create') {
                setItemsCondition(formItems.create.items)
            } else if (formCondition === 'update') {
                setItemsCondition(formItems.update.items)
            }
        }, [formCondition]);

        formItems.columns?.forEach((col: any) => {
            switch (col.typeData) {
                case 'text':
                    let field = col.field
                    if (col.field.includes(".")) {
                        field = col.field.split(".")[0] + "Id";
                    }
                    if (col.defaultValue) {
                        mapEmptyData[field] = col.defaultValue;
                    } else {
                        mapEmptyData[field] = '';
                    }
                    break;
                case 'number':
                    mapEmptyData[col.field] = 0;
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

        const handleInputChange = (e: any, fieldName: string, required?: boolean) => {
            const {value} = e;
            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: value,
            }));

        };

        const formatDate = (dateString: string | Date | Date[]) => {
            const date = new Date(dateString as string);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(0);

            return `${year}-${month}-${day}`;
        }

        const handleDateChange = (e: any, fieldName: string, required?: boolean) => {
            const value: string | Date | Date[] = e;

            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: formatDate(value),
            }));
        };

        const handleDropdownChange = (e: any, fieldName: string, required?: boolean) => {
            const {value} = e;
            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: value.name,
            }));
        };

        const handleDropdownXChange = (e: AutoCompleteSelectEvent, fieldName: string, required?: boolean) => {
            const {value} = e;
            setDropdownSelected((prevState: any) => {
                const updatedState = {...prevState};
                updatedState[fieldName] = value;
                delete updatedState[fieldName].id;
                return updatedState;
            });

            let fieldNameData = fieldName
            if(formCondition === 'update'){
                if (fieldNameData.endsWith("Id")) {
                    fieldNameData = fieldNameData.substring(0, fieldNameData.length - 2);
                }
            }
            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldNameData]: value,
            }));
        };
        const handleDropdownOnUpdate = (data: any) => {
            const newArray = data.items.reduce((acc: any, item: any) => {
                if (item.typeForm === "dropdownX" && item.options) {
                    const newStr = item.field.replace("Id", "");
                    const fieldData = data.data[newStr];
                    if (fieldData) {
                        let newField = {}
                        if (fieldData.Code && fieldData.Name) {
                            newField = {
                                name: `${fieldData.Code} (${fieldData.Name})`,
                                code: fieldData.Id
                            };
                        } else if (fieldData.Code) {
                            newField = {
                                name: fieldData.Code,
                                code: fieldData.Id
                            };
                        } else if (fieldData.Name) {
                            newField = {
                                name: fieldData.Name,
                                code: fieldData.Id
                            };
                        } else {
                            newField = {
                                name: fieldData.Id,
                                code: fieldData.Id
                            };
                        }
                        // console.log(newField)
                        acc[item.field] = newField;
                    }
                }

                if (item.field === "Status") {
                    const statusField = {
                        name: data.data.Status,
                        code: data.data.Status
                    };
                    acc[item.field] = statusField;
                }
                return acc;
            }, {});
            setDropdownSelected(newArray);

        };
        const handleOnFilterDropdownX = (e: any, fieldName: string, required?: boolean) => {
            const {filter} = e;
            const filteredData = itemsCondition.filter((item: any) => item.field === fieldName);
            const result = filteredData.length > 0 ? filteredData[0] : null;
            const jsonString = JSON.stringify({"Name": ["LIKE", filter]});
            const base64String = btoa(jsonString);
            result.options.param({filters: base64String})
        };

        const handleInputSwitchChange = (e: InputSwitchChangeEvent, fieldName: string, required?: boolean) => {
            const value = e.value;

            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: value,
            }));
        };

        const handleCheckboxChange = (e: CheckboxChangeEvent, fieldName: string, required?: boolean) => {
            const {value, checked} = e.target;
            const prevSelectedValues = dataModel[fieldName] || [];
            let updatedValues: string[];

            if (checked) {
                updatedValues = [...prevSelectedValues, value];
            } else {
                updatedValues = prevSelectedValues.filter((selectedValue: any) => selectedValue !== value);
            }

            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: updatedValues,
            }));
        };

        const handleRadioChange = (e: RadioButtonChangeEvent, fieldName: string, required?: boolean) => {
            const {value, checked} = e.target;
            const updatedValue = checked ? value : null;

            setDataModel((prevDataModel: any) => ({
                ...prevDataModel,
                [fieldName]: updatedValue,
            }));
        };

        const handleBase64Uploader = async (e: any, fieldName: string) => {
            const file = e.files[0];
            const reader = new FileReader();
            let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

            reader.readAsDataURL(blob);

            reader.onloadend = function () {
                const base64data = reader.result;
                setImage(reader.result)
                // setDataModel((prevDataModel: any) => ({
                //     ...prevDataModel,
                //     [fieldName]: base64data,
                // }));
            };
        };

        useEffect(() => {
            if (formCondition === 'update') {
                if (formItems.update.data !== null) {
                    setDataModel(formItems.update.data);
                    handleDropdownOnUpdate(formItems.update)
                }
            }
        }, [formItems.update?.data]);

        useEffect(() => {
            validateForm();
        }, [dataModel]);


        useEffect(() => {
            if (validatorStatus && formItems.create.status === 400) {
                setFormStatus(400)
            } else if (validatorStatus && formItems.create.status === 200) {
                setFormStatus(200)
            }
        }, [formItems.create.status]);

        useEffect(() => {
            if (validatorStatus && formItems.update.status === 400) {
                setFormStatus(400)
            } else if (validatorStatus && formItems.update.status === 200) {
                setFormStatus(200)
            }
        }, [formItems.update.status]);

        useEffect(() => {
            if (validatorStatus && formStatus === 200) {
                if (handleDialog) {
                    setFormStatus(null);
                    setValidatorStatus(null)
                    handleDialog(false);
                }
            }
        }, [formStatus, validatorStatus]);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const isValid = validateForm();
            setValidatorStatus(isValid)
            if (isValid) {
                if (formCondition === 'create') {
                    formItems.create.action(dataModel)
                } else if (formCondition === 'update') {
                    formItems.update.action(dataModel)
                }
            }
        }

        const validateForm = () => {
            const errors: { [key: string]: string | any } = {};

            itemsCondition.forEach((formComponent: TFormComponent[] | undefined | any) => {
                const {field, validator, required, typeForm} = formComponent;
                let value = dataModel[field];
                if (formCondition === "update" && field.endsWith("Id")) {
                    const fieldName = field.replace("Id", "");
                    value = dataModel[fieldName];
                }

                if (required && (typeof value === 'undefined' || value === null || value.length === 0)) {
                    errors[field] = `${field} is required`;
                }

                if (validator) {
                    validator.forEach((validator: TValidator) => {
                        if (validator.type === 'LengthValidator') {
                            const lengthValidator = validator as LengthValidator;
                            const {minLength, maxLength} = lengthValidator.options;
                            const errorMessage = lengthValidator.message || `Invalid length for ${field} `;

                            if (value && (value.length < minLength || value.length > maxLength)) {
                                errors[field] = errorMessage;
                            }
                        } else if (validator.type === 'RegexValidator') {
                            const regexValidator = validator as RegexValidator;
                            const {match, example} = regexValidator.options;
                            const errorMessage = regexValidator.message || example;

                            const regex = new RegExp(match, 'i');
                            if (value && !regex.test(value)) {
                                errors[field] = errorMessage;
                            }
                        }
                    });
                }
            });

            setErrorMessages(errors);
            return Object.keys(errors).length === 0;
        };

        return (
            <div>
                {formItems.create.message && formItems.create.message.Status === 400
                    ? <Message severity="error" text={formItems.create.message.Message}/>
                    : null
                }

                <form onSubmit={handleSubmit}>
                    {itemsCondition.map((formComponent: any) => {

                        const {field, label, required, typeForm} = formComponent;
                        const errorMessage = errorMessages[field];

                        return (
                            <div key={formComponent.field} className="field flex-auto">
                                <div className="flex flex-column gap-1">
                                    <label
                                        className="mb-2 font-bold">
                                        {label ? label : field}
                                        {required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {typeForm === 'upload' && image
                                        ? <Image src={image} width="250" height="150"/>
                                        : null
                                    }
                                    {
                                        renderInput({
                                            form: formComponent,
                                            dataModel,
                                            dataDropdownSelected: dropdownSelected,
                                            handleData: {
                                                'text': handleInputChange,
                                                'text-area': handleInputChange,
                                                'number': handleInputChange,
                                                'password': handleInputChange,
                                                'checkBox': handleCheckboxChange,
                                                'radioButton': handleRadioChange,
                                                'dropdown': handleDropdownChange,
                                                'dropdownX': handleDropdownXChange,
                                                'date': handleDateChange,
                                                'inputSwitch': handleInputSwitchChange,
                                                'upload': handleBase64Uploader,
                                            },
                                            handleOnFilterDropdown: {
                                                'dropdownX': handleOnFilterDropdownX,
                                            }
                                        })
                                    }
                                    {errorMessage && <span className="text-red-500 ml-1">{errorMessage}</span>}
                                    {formItems.create.message && formItems.create.message.Status === 400
                                        ? (<span className="text-red-500 ml-1">
                                                {formItems.create.message.Validation[field]}
                                        </span>)
                                        : null
                                    }
                                </div>
                            </div>
                        )
                    })}
                    {formCondition === 'create'
                        ? <Button type="submit" label="Save" severity="success" className="mt-5" onClick={handleSubmit}
                                  loading={formItems.create.loading}/>
                        : formCondition === 'update'
                            ?
                            <Button type="submit" label="Update" severity="info" className="mt-5" onClick={handleSubmit}
                                    loading={formItems.update.loading}/>
                            : null
                    }
                </form>
            </div>
        )
    }

const formatDateToParseable = (dateString: any) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};
const formatToFullDateString = (dateString: any) => {
    const parseableDate = formatDateToParseable(dateString);
    const dateValue = Date.parse(parseableDate);
    if (isNaN(dateValue)) {
        return null;
    }
    return new Date(dateValue);
};

function renderInput<TForm extends TFormComponent>(
    {
        form,
        dataModel,
        handleData,
        handleOnFilterDropdown,
        dataDropdownSelected
    }: { form: TForm, dataModel: any, dataDropdownSelected?: any, handleData?: any, handleOnFilterDropdown?: any }
): JSX.Element | null {
    switch (form.typeForm) {
        case 'text':
            return <InputText
                id={form.field}
                value={dataModel[form.field]}
                onChange={(e) => handleData[form.typeForm](e.target, form.field, form.required)}
            />
        case 'text-area':
            return <InputTextarea
                autoResize
                value={dataModel[form.field]}
                onChange={(e) => handleData[form.typeForm](e.target, form.field)}
                rows={5}
                cols={30}
            />
        case 'number':
            return <InputNumber
                value={dataModel[form.field]}
                onChange={(e) => handleData[form.typeForm](e, form.field)}
                minFractionDigits={2}
            />
        case 'checkBox':
            return <div className="grid">
                {form.options?.data.map((v: any, index: number) => {
                    return (
                        <div key={index} className="col-6">
                            <Checkbox
                                name={form.field}
                                value={v}
                                onChange={(e) => handleData[form.typeForm](e, form.field)}
                                checked={dataModel[form.field]?.includes(v)}
                            />
                            <label className="ml-2">{v}</label>
                        </div>
                    )
                })}
            </div>
        case 'radioButton':
            return <div className="formgrid grid">
                {form.options?.data.map((v: any, index: number) => {
                    return (
                        <div key={index} className="field-radiobutton col-6">
                            <RadioButton
                                inputId="ingredient1"
                                name={form.field}
                                value={v}
                                onChange={(e) => handleData[form.typeForm](e, form.field)}
                                checked={dataModel[form.field] === v}
                            />
                            <label className="ml-2">{v}</label>
                        </div>
                    )
                })}
            </div>
        case 'dropdown':
            return <Dropdown
                value={{name: dataModel[form.field], code: dataModel[form.field]}}
                onChange={(e) => handleData[form.typeForm](e.target, form.field)}
                options={form.options?.data}
                optionLabel="name"
                placeholder={'Select a ' + form.field}
                className="w-full"
            />
        case 'dropdownX':
            if (form.field === 'Status') {
                const statusArray = ['Active', 'Inactive'];
                const statusData = statusArray.map((item) => {
                    return {name: item, code: item};
                });

                return <Dropdown
                    value={dataDropdownSelected ? dataDropdownSelected[form.field] : null}
                    onChange={(e) => handleData[form.typeForm](e.target, form.field)}
                    options={statusData}
                    optionLabel="name"
                    // optionValue="code"
                    placeholder={'choose...'}
                    className="w-full"
                />
            } else {
                return <Dropdown
                    value={dataDropdownSelected ? dataDropdownSelected[form.field] : null}
                    onChange={(e) => handleData[form.typeForm](e.target, form.field)}
                    options={form.options?.data}
                    optionLabel="name"
                    // optionValue="code"
                    placeholder={'choose...'}
                    className="w-full"
                    filter
                    onFilter={(e) => handleOnFilterDropdown[form.typeForm](e, form.field)}
                />
            }
        case 'date':
            return <Calendar
                value={formatToFullDateString(dataModel[form.field])}
                onChange={(e) => handleData[form.typeForm](e.value, form.field)}
                dateFormat="dd-mm-yy"
            />
        case 'upload':
            return <FileUpload
                // url="https://primefaces.org/primereact/showcase/upload.php"
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                customUpload
                uploadHandler={(e) => handleData[form.typeForm](e, form.field)}
                auto={true}
            />
        case 'password':
            return <Password
                value={dataModel[form.field]}
                onChange={(e) => handleData[form.typeForm](e.target, form.field)}
                toggleMask
            />
        case 'inputSwitch':
            return <InputSwitch
                checked={dataModel[form.field]}
                onChange={(e) => handleData[form.typeForm](e, form.field)}
            />
        default:
            return null
    }
}

export default BaseForm