import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

export default function AdvancedSearch({ setChips }) {
  let chipObjects = [];

  const [inputs, setInputs] = useState({
    file: "",
    extension: "",
    customer: "",
    project: "",
    proposal: "",
    resource: "",
    auction: "",
    begin: "",
    end: ""
  });

  const handleDelete = (evt, type) => {
        // TODO: delete bubbles
  }

  const updateChipObjs = () => {
    let idInc = 0;

    for (const [type, value] of Object.entries(inputs)) {
        if (value !== "") {
            chipObjects.push(<Chip className="ml-[10px] bg-theme-contrast-blue-dark"
                key={idInc++}
                label={type + ":" + value}
                onDelete={evt => handleDelete(evt, type)} 
            />);
        }
    }

    setChips(chipObjects);
  }

  useEffect(() => {
    updateChipObjs();
  }, [inputs]);
  
  const searchHandler = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Advanced Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="file"
            label="File Name/ID"
            type="search"
            variant="filled"
            value={inputs.file}
            onChange={searchHandler}
          />
          <TextField
            id="extension"
            label="File Type"
            type="search"
            variant="filled"
            value={inputs.extension}
            onChange={searchHandler}
          />
          <TextField
            id="customer"
            label="Customer Name/ID"
            type="search"
            variant="filled"
            value={inputs.customer}
            onChange={searchHandler}
          />
          <TextField
            id="project"
            label="Project Name/ID"
            type="search"
            variant="filled"
            value={inputs.project}
            onChange={searchHandler}
          />
          <TextField
            id="proposal"
            label="Proposal Name/ID"
            type="search"
            variant="filled"
            value={inputs.proposal}
            onChange={searchHandler}
          />
          <TextField
            id="resource"
            label="Resource Type/ID"
            type="search"
            variant="filled"
            value={inputs.resource}
            onChange={searchHandler}
          />
          <TextField
            id="auction"
            label="Auction ID"
            type="search"
            variant="filled"
            value={inputs.auction}
            onChange={searchHandler}
          />
          <TextField
            id="begin"
            label="Begin Date"
            type="search"
            variant="filled"
            value={inputs.begin}
            onChange={searchHandler}
          />
          <TextField
            id="end"
            label="End Date"
            type="search"
            variant="filled"
            value={inputs.end}
            onChange={searchHandler}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}