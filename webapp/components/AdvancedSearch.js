import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-search"
          label="Project Name/ID"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Proposal Name/ID"
          type="search"
          variant="filled"
        />
         <TextField
          id="filled-search"
          label="File Name"
          type="search"
          variant="filled"
        />
         <TextField
          id="filled-search"
          label="Auction Type"
          type="search"
          variant="filled"
        />
         <TextField
          id="filled-search"
          label="File Type"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="File Size"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Commit Date: From"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Commid Date: To"
          type="search"
          variant="filled"
        />
      </div>
    </Box>
  );
}