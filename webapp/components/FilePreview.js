import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';

/**
 * A React component that displays previews for selected files.
 * 
 * @returns {React.ReactElement} - FilePreview component
 * 
 * @function
 */
function FilePreview() {
    const [value, setValue] = React.useState(0);

    /**
     * Gets the titles for the previewed files from the backend
     * 
     * @returns {string[]} - An array of labels for the files
     * 
     * @function
     */
    const getTabLabels = () => {
        // TODO: Hook into backend for this

        return ["boiler_proj_det_manilaco.pdf", "ManilaCo Boiler Cost Table.xls", "ManilaCo_boiler Permit.docx", "ManilaCo_gen_32.docx", "ManilaCo_q3.xls", "ManilaCo Boiler Ex.png"];
    }

    /**
     * Builds an array of Tabs out of the labels given to it.
     * 
     * @returns {React.ReactComponentElement[]} - Tab component array.
     * 
     * @function
     */
    const getTabs = (labels = []) => {
        return labels.map((v) => <Tab className="normal-case" label={v} key={v}></Tab>);
    }

    /**
     * Handles the changing of the selected tab to the one that is clicked.
     * 
     * @param {Event} event - The click event.
     * @param {*} newValue - The index of the tab clicked.
     * 
     * @function
     */
    const handleTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box>
        <Tabs
            value={value}
            onChange={handleTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            {getTabs(getTabLabels())}
        </Tabs>
    </Box>
    );
}

export default FilePreview;