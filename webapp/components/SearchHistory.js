import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { ChipData } from '../typedefs.js';

/**
 * A react component for the history section of the drawer
 * and its functionality.
 * 
 * @param {Object} props - Component props.
 * @param {ChipData[][]} props.history - An array of ChipData arrays, each of which represent a single search's filters
 * @param {function(ChipData[]):void} props.handleRestoreSearch - Restores search to corresponding search history and re-searches.
 * @returns {React.ReactElement} - SearchHistory component.
 */
function SearchHistory({ history = [], handleRestoreSearch }) {
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
                <Typography className="font-sans font-semibold text-lg">Search History</Typography>
            </AccordionSummary>
            <AccordionDetails className="h-[400px] overflow-y-auto">
                {history.map((snap, k) => {
                    return (
                        <div className="max-w-[347px] border-2 bg-theme-contrast-blue-dark rounded-3xl p-0.5 pb-1" key={k+1}>
                            {snap.map((c) => generateChip(c))}
                            <Button className="bg-theme-logo-blue text-white hover:bg-theme-logo-blue-selected h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-[50%] p-0"
                                onClick={() => {
                                    console.log(handleRestoreSearch);
                                    handleRestoreSearch(snap);
                                }}
                            >
                                <SettingsBackupRestoreIcon className="h-[20px] w-[20px]" />
                            </Button>
                        </div>
                    )
                })}
            </AccordionDetails>
        </Accordion>
    );
}

export default SearchHistory;