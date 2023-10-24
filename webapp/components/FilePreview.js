import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';

export default function FilePreview() {
    const [value, setValue] = React.useState(0);

    const getTabLabels = () => {
        // TODO: Hook into backend for this

        return ["PDF", "XLS", "DOCX"];
    }

    const getTabs = () => {
        return getTabLabels().map((v) => <Tab label={v} key={v}></Tab>);
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
