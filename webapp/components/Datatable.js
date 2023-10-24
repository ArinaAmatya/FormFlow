import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// just sample data 
// TODO connect to the backend
function retrieveFiles() {
    return [
        {
          id: 1,
          projectID: "223953562",
          fileType: 'docx',
          projectName: 'ManilaCo_boiler Permit',
          fileSize: "5MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
          periodID: "000000021",
          customerID: "379434341",
          customerName: "ManilaCo",
          resourceID: "000000100",
          resourceType: "Big Generator",
          dateBegin: "06/01/2020",
          dateEnd: "06/01/2021"
        },
        {
          id: 2,
          projectID: "384595373",
          fileType: 'docx',
          projectName: 'ManilaCo_gen_32',
          fileSize: "9MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
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
          projectID: "276067546",
          fileType: 'pdf',
          projectName: 'VoltHit array023',
          fileSize: "16MB",
          proposalName: "VolRay Maine Field",
          proposalID: "000006534",
          autionID: "000000478",
          periodID: "000000021",
          customerID: "379434341",
          customerName: "ManilaCo",
          resourceID: "000000100",
          resourceType: "Solar Aggregation",
          dateBegin: "03/01/2017",
          dateEnd: "03/01/2020"
        },
        {
          id: 4,
          projectID: "957225754",
          fileType: 'docx',
          projectName: 'ManilaCo_boiler Permit',
          fileSize: "32MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
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
          projectID: "968434563",
          fileType: 'xls',
          projectName: 'ManilaCo Boiler Cost Table',
          fileSize: "4MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
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
          projectID: "634576784",
          fileType: 'pdf',
          projectName: "boiler_proj_det_manilaco",
          fileSize: "34MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
          periodID: "000000021",
          customerID: "379434341",
          customerName: "ManilaCo",
          resourceID: "000000100",
          resourceType: "Big Generator",
          dateBegin: "06/01/2020",
          dateEnd: "06/01/2021"
        },
        {
          id: 7,
          projectID: "536854525",
          fileType: 'xls',
          projectName: 'ManilaCo_q3_20',
          fileSize: "6MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
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
          projectID: "836324654",
          fileType: 'png',
          projectName: 'ManilaCo Boiler Ex',
          fileSize: "56MB",
          proposalName: "ManilaCo Big Boiler House",
          proposalID: "000006534",
          autionID: "000000478",
          periodID: "000000021",
          customerID: "379434341",
          customerName: "ManilaCo",
          resourceID: "000000100",
          resourceType: "Big Generator",
          dateBegin: "06/01/2020",
          dateEnd: "06/01/2021"
        },
        {
          id: 9,
          projectID: "298973111",
          fileType: 'csv',
          projectName: 'CaprioMax',
          fileSize: "3MB",
          proposalName: "CaprioMax Sunwalk",
          proposalID: "000006534",
          autionID: "000000478",
          periodID: "000000021",
          customerID: "379434341",
          customerName: "Caprio and Company",
          resourceID: "000000100",
          resourceType: "Solar Generator",
          dateBegin: "07/01/2016",
          dateEnd: "07/01/2021"
        },
      ];
}

const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      width: 200,
    },
    {
      field: 'fileType',
      headerName: 'File Type',
      width: 80,
    },
    {
      field: 'fileSize',
      headerName: 'File Size',
      width: 100,
    },
    {
      field: 'proposalName',
      headerName: 'Proposal Name',
      width: 200
    },
    {
      field: 'resourceType',
      headerName: 'Resource Type',
      width: 150
    },
    {
      field: 'dateBegin',
      headerName: 'Begin Date',
      width: 100
    },
    {
      field: 'dateEnd',
      headerName: 'End Date',
      width: 100
    }
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
