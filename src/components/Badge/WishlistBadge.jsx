import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { BsHeart } from "react-icons/bs";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function WishlistBadge() {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={2} color="secondary">
        <BsHeart className="text-xl text-white" />
      </StyledBadge>
    </IconButton>
  );
}
