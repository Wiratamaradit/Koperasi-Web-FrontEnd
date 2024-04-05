import {useMediaQuery, Box, Drawer, IconButton, Button} from '@mui/material';
import SidebarItems from './SidebarItems';
import React from "react";
import DynamicPricing from "../../../components/shared/dynamic-pricing/DynamicPricing";
import Menuitems from './MenuItems';


interface ItemType {
    isMobileSidebarOpen: boolean;
    onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
    isSidebarOpen: boolean;
}

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen}: ItemType) => {

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

    const sidebarWidth = '250px';

    if (lgUp) {
        return (
            <Box sx={{width: sidebarWidth, flexShrink: 0}}>
                <Drawer
                    anchor="left"
                    open={isSidebarOpen}
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: sidebarWidth, 
                            boxSizing: 'border-box', 
                            border: "2px solid white", 
                            background: "#1E1E2D"}}
                        }
                >
                    <Box sx={{height: '0%'}}>
                        <Box>
                            <img src="/images/koperasilogo.png" alt="logo" 
                            style={{
                                width: '50%',
                                marginLeft: '60px',
                                marginTop: '20px',
                                height: 'auto',

                                }}/>
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
                    boxShadow: (theme) => theme.shadows[5],
                    backgroundColor: "#1E1E2D",
                },
            }}
        >
            <Box mb={5}>
                
            </Box>
            <SidebarItems/>
        </Drawer>
    );
};

export default Sidebar;
