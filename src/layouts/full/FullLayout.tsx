import React, {useEffect, useState} from "react";
import {styled, Container, Box} from "@mui/material";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100%",
    width: "auto",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "30px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
}));

interface Props {
    children: React.ReactNode;
}

const FullLayout: React.FC<Props> = ({children}) => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
    const [maxWidth, setMaxWidth] = useState("1535px");

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            if (screenWidth === 1366 && screenHeight === 768) {
                setMaxWidth("1075px");
            } else if (screenWidth === 1920 && screenHeight === 1080) {
                setMaxWidth("1535px");
            } else {
                setMaxWidth("1535px");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <MainWrapper className="mainwrapper" style={{background: "#B1B1BF"}}>
            {isMobileSidebarOpen
                ? <Sidebar
                    isSidebarOpen={isMobileSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    onSidebarClose={() => setMobileSidebarOpen(false)}
                />
                : null}

            <PageWrapper className="page-wrapper">
                <Header
                    toggleMobileSidebar={() => setMobileSidebarOpen(isMobileSidebarOpen ? false : true)}
                />
                <Container style={{maxWidth: maxWidth}} className="mt-4">
                    <Box sx={{minHeight: "calc(100vh - 170px)"}}>{children}</Box>
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
};

export default FullLayout;
