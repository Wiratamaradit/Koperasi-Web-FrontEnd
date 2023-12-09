import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export const useSelectorHandler = (selectorPath: string) => {
    return {
        [selectorPath]: useSelector((state: RootState) => state[selectorPath as keyof RootState]),
        [`${selectorPath}Export`]: useSelector((state: RootState) => state[`${selectorPath}Export` as keyof RootState]),
        [`${selectorPath}Import`]: useSelector((state: RootState) => state[`${selectorPath}Import` as keyof RootState]),
        [`${selectorPath}Detail`]: useSelector((state: RootState) => state[`${selectorPath}Detail` as keyof RootState]),
        [`${selectorPath}Post`]: useSelector((state: RootState) => state[`${selectorPath}Post` as keyof RootState]),
        [`${selectorPath}Put`]: useSelector((state: RootState) => state[`${selectorPath}Put` as keyof RootState]),
        [`${selectorPath}Del`]: useSelector((state: RootState) => state[`${selectorPath}Del` as keyof RootState]),
    };
};