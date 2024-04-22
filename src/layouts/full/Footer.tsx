import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        padding: "1rem",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
        © {new Date().getFullYear()} Copyright - All Rights Reserved  | Rentokil Inital Global | Rentokil Initial Indonesia - Cabang Malang
        <Link href="https://www.calmic.co.id" target="_blank" rel="noopener noreferrer" ml={2} mr={2}>
          Calmic.co.id
        </Link>
        <Link href="https://www.rentokil.co.id" target="_blank" rel="noopener noreferrer" ml={2} mr={2}>
          Rentokil.co.id
        </Link>
        <Link href="https://www.rentokil-initial.com" target="_blank" rel="noopener noreferrer">
          Rentokil-Initial.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
