import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationTable(props) {
  const noOfPages = Math.ceil(props.totalNumber / 10);

  const handlePageChange = (e) => {
    props.currentPage(e.target.textContent);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={noOfPages} color="primary" onChange={handlePageChange}/>
    </Stack>
  );
}
