import Box from '@mui/material/Box';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { FileData } from '../typedefs.js';

/**
 * @param {Object} props - Component props.
 * @param {FileData[]} props.files - File metadata to display in table.
 * @param {function(FileData[]):void} props.onSelectionChange - State updater for keeping track of selected rows.
 * @returns {React.ReactElement} - FileTable component.
 */
function FileTable({ files, onSelectionChange}) {
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

  const handleSelection = (selectionModel) => {
    const selected = selectionModel.map(id => files.find(file => file.id === id));
    onSelectionChange(selected);
  };


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
          onRowSelectionModelChange={handleSelection}
        />
      </Box>
    </div>
  );
}

export default FileTable;