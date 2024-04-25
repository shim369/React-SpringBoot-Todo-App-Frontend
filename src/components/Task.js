import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Task() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Task Name" variant="outlined" />
      <TextField id="outlined-basic" label="Task URL" variant="outlined" />
    </Box>
  );
}