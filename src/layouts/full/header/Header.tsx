import React from 'react';
import {Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button} from '@mui/material';
import PropTypes from 'prop-types';

// components
import {IconBellRinging, IconMenu} from '@tabler/icons-react';
import CustomProfile from "./custom/CustomProfile";

interface ItemType {
    toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {

    const AppBarStyled = styled(AppBar)(({theme}) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        // background: "#1E1E2D",
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({theme}) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMobileSidebar}
                    sx={{
                        display: {
                            // lg: "none",
                            xs: "inline",
                        },
                    }}
                >
                    <IconMenu width="20" height="20"/>
                </IconButton>
                <Box flexGrow={1}/>
                <Stack spacing={1} direction="row" alignItems="center">
                    <CustomProfile/>
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
};

export default Header;
