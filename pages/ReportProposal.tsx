import {useRef, useState} from "react";
import * as React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {useSelectorHandler} from "../src/base/utils/useSelectorHandler";
import {proposalList} from "../src/base/store/slices/proposal/proposalReviewSlice";
import {useAppDispatch} from "../src/base/store/store";
import {useRouter} from "next/router";

type Props = {
    getShipPartyGroup: (dataModel: any) => void
    shipPartyGroup: any;
    getRegion: (dataModel: any) => void
    region: any;
    getRole: (dataModel: any) => void
    role: any;
    procedure: any;
}

const ReportProposal = (props: Props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {proposal} = useSelectorHandler('proposal');

    const [code, setCode] = useState<any>();
    const [shipPartyGroup, setShipPartyGroup] = useState<any>();
    const [region, setRegion] = useState<any>();
    const [nextApprove, setNextApprove] = useState<any>();
    const [procedure, setProcedure] = useState<any>();
    const csv = useRef<any>(null);

    const fetchData = async (params?: any) => {
        dispatch(proposalList(router, params))
    }

    const filterShGroup = (data: any) => {
        const filter = {
            Code: ["LIKE", `${data}`]
        }
        return btoa(JSON.stringify(filter))
    }

    const handleFilterShGroup = (e: any) => {
        const {filter} = e;
        const dataFilter = {
            filters: filterShGroup(filter)
        }
        props.getShipPartyGroup(dataFilter)
    }

    const filterRegion = (data: any) => {
        const filter = {
            Code: ["LIKE", `${data}`]
        }
        return btoa(JSON.stringify(filter))
    }

    const handleFilterRegion = (e: any) => {
        const {filter} = e;
        const dataFilter = {
            filters: filterRegion(filter)
        }
        props.getRegion(dataFilter)
    }

    const filterRole = (data: any) => {
        const filter = {
            Code: ["LIKE", `${data}`]
        }
        return btoa(JSON.stringify(filter))
    }

    const handleFilterRole = (e: any) => {
        const {filter} = e;
        const dataFilter = {
            filters: filterRole(filter)
        }
        props.getRole(dataFilter)
    }

    const handleFilter = () => {
        const filter: any = {};

        if (code) {
            filter.Code = ["LIKE", code];
        }

        if (shipPartyGroup) {
            filter.ShipPartyGroupId = ["LIKE", shipPartyGroup];
        }

        if (region) {
            filter.RegionId = ["LIKE", region];
        }

        if (nextApprove) {
            filter.NextApproveId = ["LIKE", nextApprove];
        }

        if (procedure) {
            filter.Procedure = ["LIKE", procedure];
        }

        return btoa(JSON.stringify(filter));
    };


    const handleReport = async () => {
        await fetchData({filters: handleFilter()})

        setCode('')
        setShipPartyGroup('')
        setRegion('')
        setNextApprove('')
        setProcedure('')
    }

    return (
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-2">
                <div className="text-left p-3 font-bold">
                    Code
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-10">
                <InputText
                    value={code}
                    className="w-full"
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className="col-12 md:col-6 lg:col-2">
                <div className="text-left p-3 font-bold">
                    SH Group
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-4">
                <Dropdown
                    value={shipPartyGroup}
                    onChange={(e) => {
                        setShipPartyGroup(e.value);
                    }}
                    options={props.shipPartyGroup}
                    optionLabel="name"
                    optionValue="code"
                    className="w-full"
                    placeholder="Choose"
                    filter
                    onFilter={(e) => handleFilterShGroup(e)}
                />
            </div>
            <div className="col-12 md:col-6 lg:col-2">
                <div className="text-left p-3 font-bold">
                    Region
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-4">
                <Dropdown
                    value={region}
                    onChange={(e) => {
                        setRegion(e.value);
                    }}
                    options={props.region}
                    optionLabel="name"
                    optionValue="code"
                    className="w-full"
                    placeholder="Choose"
                    filter
                    onFilter={(e) => handleFilterRegion(e)}
                />
            </div>
            <div className="col-12 md:col-6 lg:col-2">
                <div className="text-left p-3 font-bold">
                    Next Approve
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-4">
                <Dropdown
                    value={nextApprove}
                    onChange={(e) => {
                        setNextApprove(e.value);
                    }}
                    options={props.role}
                    optionLabel="name"
                    optionValue="code"
                    className="w-full"
                    placeholder="Choose"
                    filter
                    onFilter={(e) => handleFilterRole(e)}
                />
            </div>
            <div className="col-12 md:col-6 lg:col-2">
                <div className="text-left p-3 font-bold">
                    Procedure
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-4">
                <Dropdown
                    value={procedure}
                    onChange={(e) => {
                        setProcedure(e.value);
                    }}
                    options={props.procedure}
                    optionLabel="name"
                    optionValue="code"
                    className="w-full"
                    placeholder="Choose"
                />
            </div>
            <div className="col-12">
                <div className="text-center">
                    <Button
                        type="button"
                        label="Report"
                        severity="info"
                        size="small"
                        onClick={handleReport}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportProposal