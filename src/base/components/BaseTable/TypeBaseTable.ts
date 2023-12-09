import {CSSProperties} from "react";
import * as React from "react";

export type TColumnComponent = {
    field: string;
    typeData: 'text' | 'number' | 'image' | 'array' | 'boolean' | 'email' | 'url' | 'currency' | 'date';
    label?: string;
    style?: CSSProperties | undefined;
    bodyClassName?: any;
    body?: React.ReactNode | undefined;
    filter?: TFilter;
    defaultValue?: any
}

export type TFilter = {
    type?: 'string' | 'dropdown' | 'date' | 'date-range' | 'switch-input'
    option?: TOption
}

export type TOption = {
    data?: [] | any;
    value?: any
}