import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FileViewer from 'react-file-viewer';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { Typography } from '@mui/material';

/**
 * A React component that displays previews for selected files.
 * 
 * @returns {React.ReactElement} - FilePreview component
 * 
 * @function
 */
function FilePreview() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [tabData, setTabData] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState({});

    useEffect(() => {
        const { selectedRows: selectedRowsParam } = router.query;
        if (selectedRowsParam) {
          const decodedRows = JSON.parse(decodeURIComponent(selectedRowsParam));
          setSelectedRows(decodedRows);
        }
    }, [router.query]);

    /**
     * Builds an array of Tabs out of the labels given to it.
     * 
     * @returns {React.ReactElement[]} - Tab component array.
     * 
     * @function
     */
    const getTabs = () => {
        return tabData.map((t, i) => <Tab className="normal-case" label={t.label} key={i}></Tab>);
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
        setSelectedFile(tabData[newValue]);
        setSelectedTab(newValue);
    };

    const fetchFiles = () => {
        try {
            let filePromises = [];
            let fileData = [];
            selectedRows.forEach((file) => {
                let encodedPath = encodeURIComponent(file.filePath.replace("Attachments/", ""));
                filePromises.push(fetch(`http://localhost:8080/getFileObject/${encodedPath}`));
                fileData.push({
                    label: file.fileName,
                    path: "/retrieved_files/" + file.fileName,
                    type: "pdf"
                })
            });

            Promise.all(filePromises).then(() => setTabData(prev => fileData));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [selectedRows]);

    useEffect(() => {
        setSelectedFile(tabData[0]);
    }, [tabData]);

    return (<>
    <Box>
        <Tabs
            value={selectedTab}
            onChange={handleTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            {getTabs()}
        </Tabs>
        {
            selectedFile && ["png", "jpeg", "gif", "bmp", "pdf", "csv", "xslx", "docx"].includes(selectedFile?.type) ?
                <FileViewer
                    fileType={selectedFile?.type}
                    filePath={selectedFile?.path}
                />
                :
                <Typography>This file cannot be previewed. Download it to view.</Typography>
        }
    </Box>
    <Button onClick={() => console.log(JSON.stringify(selectedFile))}></Button>
    </>);
}

export default FilePreview;