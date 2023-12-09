import React, {useEffect, useRef, useState} from 'react';
import {FileUpload, FileUploadHeaderTemplateOptions, ItemTemplateOptions,} from 'primereact/fileupload';
import {ProgressBar} from 'primereact/progressbar';
import {Button} from 'primereact/button';
import {Tooltip} from 'primereact/tooltip';
import {Tag} from 'primereact/tag';
import {Message} from "primereact/message";

type Props = {
    url?: any;
    data?: any;
    saveImport?: (data: boolean) => void;
    handleDialog?: (data: boolean) => void
}

const BaseImport = (props: Props) => {

    const [messages, setMessages] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (e: any) => {
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: any) => {
        let _totalSize = 0;

        e.files.forEach((file: any) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const {className, chooseButton, uploadButton, cancelButton} = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{width: '10rem', height: '12px'}}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="ml-3 px-3 py-2"/>
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto w-3rem"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <span style={{fontSize: '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">
                    Drag and Drop File Here
                </span>
            </div>
        );
    };

    const chooseOptions = {
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    const uploadOptions = {
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
    };
    const cancelOptions = {
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };

    const downloadTemplate = async () => {
        window.location.href = props.url;
    };

    const saveImport = (e: any) => {
        const file = e.files[0];
        if (props.saveImport) {
            props.saveImport(file)
        }
    }

    useEffect(() => {
        if (props.data?.status === 200) {
            if (props.handleDialog) {
                props.handleDialog(false)
            }
        }
        if (props.data?.status === 400) {
            setMessages(props.data?.message?.Validation?.File)
        }
    }, [props.data?.status])

    return (
        <div>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom"/>
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom"/>
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom"/>

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                maxFileSize={1000000}
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}

                uploadHandler={saveImport}
                customUpload
            />
            <Button label="Download Template" className="mt-3" onClick={downloadTemplate}/>
            {
                props.data?.status === 400 ? (
                    <div>
                        {messages.map((message: any, index) => {
                            const matches = message?.match(/Row (\d+):/);
                            const rowNumber = matches ? matches[1] : index + 1;

                            return (
                                <Message
                                    key={index}
                                    className="mt-3"
                                    severity="error"
                                    text={message}
                                    data-row={rowNumber}
                                />
                            );
                        })}
                    </div>
                ) : null
            }
        </div>
    )
}

export default BaseImport