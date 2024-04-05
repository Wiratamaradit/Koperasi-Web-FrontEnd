import React, { useEffect, useState } from "react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { pathname } = useRouter();
  const pathDirect = pathname;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHO, setIsHO] = useState(false);

  useEffect(() => {
    setIsAdmin(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role ===
        "Admin"
    );
  }, []);

  useEffect(() => {
    setIsHO(
      JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.role ===
        "HO"
    );
  }, []);

  return (
    <Box sx={{ px: 2, color: "white", fontStyle: "Bold" }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          if (isAdmin) {
            if (
              item.title === "Simulasi Pinjaman" ||
              item.title === "Simulasi Simpanan" ||
              item.subheader === "Supports"
            ) {
              return null;
            }
          } else if (isHO) {
            if (
              item.title === "Simulasi Pinjaman" ||
              item.title === "Simulasi Simpanan" ||
              item.title === "Pengajuan Pinjaman" ||
              item.title === "Pengajuan Simpanan" ||
              item.title === "Validasi Simpanan" ||
              item.subheader === "Services" ||
              item.subheader === "Supports"
            ) {
              return null;
            }
          } else {
            if (
              item.title === "Validasi Anggota" ||
              item.title === "Validasi Pinjaman" ||
              item.title === "Validasi Simpanan" ||
              item.subheader === "Validation"
            ) {
              return null;
            }
          }

          // Jika tidak memenuhi kondisi di atas, tampilkan menu
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
