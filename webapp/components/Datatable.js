import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// just sample data 
// TODO connect to the backend
function retrieveFiles() {
    return [
        { projectid: 1, FileType: 'pdf', ProjectName: 'Jon', length: 35 },
        { projectid: 2, FileType: 'csv', ProjectName: 'Cersei', length: 42 },
        { projectid: 3, FileType: 'pdf', ProjectName: 'Jaime', length: 45 },
        { projectid: 4, FileType: 'csv', ProjectName: 'Arya', length: 16 },
        { projectid: 5, FileType: 'png', ProjectName: 'Daenerys', length: null },
        { projectid: 6, FileType: 'txt', ProjectName: null, length: 150 },
        { projectid: 7, FileType: 'txt', ProjectName: 'Ferrara', length: 44 },
        { projectid: 8, FileType: 'png', ProjectName: 'Rossini', length: 36 },
        { projectid: 9, FileType: 'csv', ProjectName: 'Harvey', length: 65 },
      ];
}

const columns = [
  { field: 'projectid', headerName: 'Project ID', width: 90 },
  {
    field: 'ProjectName',
    headerName: 'Project name',
    width: 150,
    editable: true,
  },
  {
    field: 'FileType',
    headerName: 'FileType',
    width: 150,
    editable: true,
  },
  {
    field: 'Length',
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
    <Box sx={{ height: 400, width: '100%' }}>
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
