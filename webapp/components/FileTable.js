import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

const typedefs = require("../typedefs");
/** @type {typedefs.FileData} */

/**
 * A React component that displays the files from a search in a table.
 * 
 * @param {Object} props - Component properties.
 * @param {*} props.files - File metadata to display in the table.
 * @returns {React.ReactElement} - FileTable component
 */
function FileTable({ files }) {
  const columns = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'fileName',
      headerName: 'File',
      width: 200,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'fileType',
      headerName: 'File Type',
      width: 80,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'customerID',
      headerName: 'Customer ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      width: 150,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'projectID',
      headerName: 'Project ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'projectName',
      headerName: 'Project',
      width: 200,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'proposalID',
      headerName: 'Proposal ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'proposalName',
      headerName: 'Proposal',
      width: 200,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'resourceID',
      headerName: 'Resource ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'resourceType',
      headerName: 'Resource Type',
      width: 150,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'auctionID',
      headerName: 'Auction ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'periodID',
      headerName: 'Period ID',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'dateBegin',
      headerName: 'Begin Date',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    },
    {
      field: 'dateEnd',
      headerName: 'End Date',
      width: 100,
      headerClassName: "bg-theme-contrast-blue-light"
    }
  ];

  return (
    <div className="max-w-[1932px]">
      <Box className="max-w-[calc(95vw-380px)]">
        <DataGrid
          rows={files}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'fileName', sort: 'asc' }],
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      </Box>
    </div>
  );
}

export default FileTable;