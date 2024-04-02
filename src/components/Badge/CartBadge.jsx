import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { HiOutlineShoppingCart } from "react-icons/hi";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartBadge() {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary" >
        <HiOutlineShoppingCart className="text-2xl text-white" />
      </StyledBadge>
    </IconButton>
  );
}
