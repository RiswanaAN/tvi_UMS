import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationTable() {
  return (
    <Stack spacing={2}>
      <Pagination count={2} color="primary" />
    </Stack>
  );
}