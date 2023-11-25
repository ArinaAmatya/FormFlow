import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

/**
 * Represents the essential data of a filter chip.
 * 
 * @typedef {Object} ChipData
 * @property {number} id - The unique ID of the chip.
 * @property {string} type - The type the chip will filter for.
 * @property {number} value - The value that will be filtered for.
 */

/**
 * A react component for the history section of the drawer
 * and its functionality.
 * 
 * @param {Object} props - Component props.
 * @param {ChipData[][]} props.history - An array of ChipData arrays, each of which represent a single search's filters.
 * @returns {React.ReactElement} - SearchHistory component.
 */
function SearchHistory({history = []}) {
    /**
     * Builds a MUI Chip component using an input ChipData object.
     * 
     * @param {ChipData} c - The data that is necessary to build the chip.
     * @returns {React.ReactElement} - Chip component.
     * 
     * @function
     */
    const generateChip = (c) => {
        return (<Chip className="ml-[5px] mr-[5px] mt-[2px] max-w-[97%] bg-theme-logo-blue text-white"
            key={c.id}
            label={c.type + ": " + c.value}
        />);
    }

    return (
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
                <Typography>Search History</Typography>
            </AccordionSummary>
            <AccordionDetails className="max-h-[400px] overflow-y-scroll">
                {history.map((snap, k) => {
                    return (
                        <div className="max-w-[347px] border-2 bg-theme-contrast-blue-dark rounded-3xl p-0.5 pb-1" key={k+1}>
                            {snap.map((c) => generateChip(c))}
                        </div>
                    )
                })}
            </AccordionDetails>
        </Accordion>
    );
}

export default SearchHistory;