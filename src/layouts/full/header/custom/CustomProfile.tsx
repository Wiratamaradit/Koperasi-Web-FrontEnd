import {Box} from "@mui/material";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import {listMenuProfile} from "./listMenuProfile";
import {Menu} from "primereact/menu";
import React, {useEffect, useRef, useState} from "react";

const CustomProfile = () => {
    const modal = useRef<Menu>(null);
    const [sessionAuth, setSessionAuth] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('sessionAuth');
            const detailAuth = data ? JSON.parse(data) : null;
            setSessionAuth(detailAuth)
        }
    }, []);

    return (
        <Box display="flex" alignItems="center">
            <Menu model={listMenuProfile} ref={modal} popup/>
            <div className="text-start p-2 font-bold">
                {sessionAuth?.data?.name}
            </div>
            <Button link rounded size="small" onClick={(event: any) => modal.current?.toggle(event)}>
                <Avatar image="/images/profile/user-1.jpg" shape="circle"/>
            </Button>
        </Box>
    )
}

export default CustomProfile