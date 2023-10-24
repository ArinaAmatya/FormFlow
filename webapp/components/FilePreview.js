import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';

export default function FilePreview() {
    const [value, setValue] = React.useState(0);

    const getTabLabels = () => {
        // TODO: Hook into backend for this

        return ["boiler_proj_det_manilaco.pdf", "ManilaCo Boiler Cost Table.xls", "ManilaCo_boiler Permit.docx", "ManilaCo_gen_32.docx", "ManilaCo_q3.xls", "ManilaCo Boiler Ex.png"];
    }

    const getTabs = () => {
        return getTabLabels().map((v) => <Tab className="normal-case" label={v} key={v + Math.floor(Math.random() * 1000)}></Tab>);
    }

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
            {getTabs()}
        </Tabs>
    </Box>
    );
}
