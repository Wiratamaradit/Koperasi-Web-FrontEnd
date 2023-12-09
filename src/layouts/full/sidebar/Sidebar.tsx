import {useMediaQuery, Box, Drawer, IconButton, Button} from '@mui/material';
import SidebarItems from './SidebarItems';
import React from "react";
import DynamicPricing from "../../../components/shared/dynamic-pricing/DynamicPricing";

interface ItemType {
    isMobileSidebarOpen: boolean;
    onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
    isSidebarOpen: boolean;
}

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen}: ItemType) => {

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

    const sidebarWidth = '270px';

    if (lgUp) {
        return (
            <Box sx={{width: sidebarWidth, flexShrink: 0,}}>
                <Drawer
                    anchor="left"
                    open={isSidebarOpen}
                    variant="persistent"
                    PaperProps={{sx: {width: sidebarWidth, boxSizing: 'border-box', background: "#1E1E2D"},}}
                >
                    <Box sx={{height: '100%',}}>
                        <Box>
                            <DynamicPricing/>
                        </Box>
                        <Box mt={5}>
                            <SidebarItems/>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        );
    }
    return (
        <Drawer
            anchor="left"
            open={isMobileSidebarOpen}
            onClose={onSidebarClose}
            variant="temporary"
            PaperProps={{
                sx: {
                    width: sidebarWidth,
                    boxShadow: (theme) => theme.shadows[8],
                    backgroundColor: "#1E1E2D",
                },
            }}
        >
            <Box mb={5}>
                <DynamicPricing/>
            </Box>
            <SidebarItems/>
        </Drawer>
    );
};

export default Sidebar;
