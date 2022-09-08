import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const ProfileButton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" href="#outlined-buttons">
        Link
      </Button>
    </Stack>
  );
}


