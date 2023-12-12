import * as React from 'react';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterInput from './FilterInput.js';

const typedefs = require("../typedefs");
/** @type {typedefs.ChipData} */

/**
 * A react component for the history section of the drawer
 * and its functionality.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.inputs - The object to store filter inputs.
 * @param {function(Object):void} props.setInputs - For setting inputs object.
 * @param {function(ChipData):void} props.addChip - For adding filter chips.
 * @param {function():void} props.handleFilterAndSearchButton - Handles behavior of filter and search button.
 */
function Filters({ inputs, setInputs, addChip, handleFilterAndSearchButton }) {
    return (<>
        <Accordion className="bg-theme-grey-light"
            disableGutters
            elevation={0}
            defaultExpanded
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FilterInput
                    label="File Name"
                    type="fileName"
                    input={inputs.fileName}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="File Type"
                    type="fileType"
                    input={inputs.fileType}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Customer Name"
                    type="customerName"
                    input={inputs.customerName}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Customer ID"
                    type="customerID"
                    input={inputs.customerID}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Project Name"
                    type="projectName"
                    input={inputs.projectName}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Project ID"
                    type="projectID"
                    input={inputs.projectID}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Proposal Name"
                    type="proposalName"
                    input={inputs.proposalName}
                    setInputs ={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Proposal ID"
                    type="proposalID"
                    input={inputs.proposalID}
                    setInputs ={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Resource Name"
                    type="resourceName"
                    input={inputs.resourceName}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Resource ID"
                    type="resourceID"
                    input={inputs.resourceID}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="Begin Date"
                    type="dateBegin"
                    input={inputs.dateBegin}
                    date
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <FilterInput
                    label="End Date"
                    type="dateEnd"
                    date
                    input={inputs.dateEnd}
                    setInputs={setInputs}
                    addChip={addChip}
                />
                <Button className="h-[56px] w-[316px] mt-[5px] ml-[13px] shadow shadow-theme-logo-blue rounded-xl bg-theme-contrast-blue-light text-xl font-extrabold hover:bg-[#afc3da] hover:border-none"
                    onClick={handleFilterAndSearchButton}
                >
                    <svg className="h-[32px] w-[32px] fill-theme-logo-blue mr-[20px]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                    >
                        <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                    </svg>
                    Filter & Search
                </Button>
            </AccordionDetails>
        </Accordion>
    </>);
}

export default Filters;