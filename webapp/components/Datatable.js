import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// just sample data 
// TODO connect to the backend
function retrieveFiles() {
    return [
        { id: 1, lastName: 'pdf', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'csv', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'pdf', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'csv', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'png', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'txt', firstName: null, age: 150 },
        { id: 7, lastName: 'txt', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'png', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'csv', firstName: 'Harvey', age: 65 },
      ];
}

const columns = [
    { field: 'id', headerName: 'Project ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Project Name',
      width: 150,
      editable: true,
    },
    {
        field: 'lastName',
        headerName: 'File Type',
        width: 150,
        editable: true,
      },
      {
        field: 'age',
        headerName: 'Length',
        type: 'number',
        width: 110,
        editable: true,
      },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //   },
    ];

const rows = retrieveFiles();

export default function DataGridDemo() {
  return (
    <Box className="h-[400px] w-[30%]">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
