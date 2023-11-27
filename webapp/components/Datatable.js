import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

// just sample data 
// TODO connect to the backend
let rows = []; 
function retrieveFiles() {
  return [
    {
      id: 1,
      fileName: 'ManilaCo_boiler Permit',
      fileType: 'DOCX',
      customerID: "379434341",
      customerName: "ManilaCo",
      projectID: "223953562",
      projectName: "ManilaCo Boiler 32",
      proposalID: "000006534",
      proposalName: "ManilaCo Big Boiler House",
      resourceID: "000000100",
      resourceType: "Big Generator",
      auctionID: "000000478",
      periodID: "000000021",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 2,
      projectName: "ManilaCo Boiler 32",
      projectID: "384595373",
      fileType: 'DOCX',
      fileName: 'vert_gen_32',
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "02/28/2018",
      dateEnd: "02/28/2021"
    },
    {
      id: 3,
      projectName: "VoltHit Array023",
      projectID: "276067546",
      fileType: 'PDF',
      fileName: 'Array023Permit3',
      proposalName: "VolRay Maine Field",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "VoltHit",
      resourceID: "000000100",
      resourceType: "Solar Aggregation",
      dateBegin: "03/01/2017",
      dateEnd: "03/01/2020"
    },
    {
      id: 4,
      projectName: "ManilaCo Boiler 32",
      projectID: "968434563",
      fileType: 'XLS',
      fileName: 'ManilaCo Boiler Cost Table',
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 5,
      projectName: "ManilaCo Boiler 32",
      projectID: "634576784",
      fileType: 'PDF',
      fileName: "boiler_proj_det_manilaco",
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 6,
      projectName: "ManilaCo Boilerhouse Solar Roof",
      projectID: "536854525",
      fileType: 'XLS',
      fileName: 'ManilaCo_roof_costtable',
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Solar Generator",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 7,
      projectName: "ManilaCo Boiler 32",
      projectID: "836324654",
      fileType: 'PNG',
      fileName: 'ManilaCo Boiler Ex',
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 8,
      projectName: "CMax Expansion",
      projectID: "298973111",
      fileType: 'XLS',
      fileName: 'cmax_expansion_res',
      proposalName: "CaprioMax Expansion",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "Caprio and Company",
      resourceID: "000000100",
      resourceType: "Solar Generator",
      dateBegin: "07/01/2021",
      dateEnd: "07/01/2021"
    },
    {
      id: 9,
      projectName: "ManilaCo Boiler 32",
      projectID: "536854525",
      fileType: 'XLS',
      fileName: 'ManilaCo_q3_20',
      proposalName: "ManilaCo Big Boiler House",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "ManilaCo",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "06/01/2020",
      dateEnd: "06/01/2021"
    },
    {
      id: 10,
      projectName: "Sunwalk North",
      projectID: "836324654",
      fileType: 'PNG',
      fileName: 'north-aerial-view',
      proposalName: "CaprioMax Sunwalk",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "Caprio and Company",
      resourceID: "000000100",
      resourceType: "Big Generator",
      dateBegin: "06/01/2018",
      dateEnd: "06/01/2019"
    },
    {
      id: 11,
      projectName: "Sunwalk South",
      projectID: "298973111",
      fileType: 'CSV',
      fileName: 'south-rsrces2433',
      proposalName: "CaprioMax Sunwalk",
      proposalID: "000006534",
      auctionID: "000000478",
      periodID: "000000021",
      customerID: "379434341",
      customerName: "Caprio and Company",
      resourceID: "000000100",
      resourceType: "Solar Generator",
      dateBegin: "07/01/2018",
      dateEnd: "07/01/2019"
    },
  ];
}

const columns = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    headerClassName: "bg-theme-contrast-blue-light"
  },
  {
    field: 'fileDd',
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
  /*
  {
    field: 'periodID',
    headerName: 'Period ID',
    width: 100,
    headerClassName: "bg-theme-contrast-blue-light"
  },*/
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

//const rows = retrieveFiles();

export default function DataGridDemo(data) {
  if (data.props){
    rows = data.props;
  }

  return (
    <div className="max-w-[1932px]">
      <Box className="max-w-[calc(95vw-380px)]">
        <DataGrid
          rows={rows}
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
