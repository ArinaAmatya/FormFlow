import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import FileDisplay from './FileDisplay';

/**
 * A React component that displays previews for selected files.
 * 
 * @returns {React.ReactElement} - FilePreview component.
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
     * Handles the changing of the selected tab to the one that is clicked.
     * 
     * @param {Event} event - The click event.
     * @param {number} newValue - The index of the tab clicked.
     * 
     * @function
     */
    const handleTab = (event, newValue) => {
        setSelectedFile(tabData[newValue]);
        setSelectedTab(newValue);
    };

    const fetchFiles = () => {
        try {
            let rawPath = "";
            let fileData = [];
            selectedRows.forEach((file) => {
                rawPath += "&" + file.filePath.replace("Attachments/", "");
                if (["png", "jpeg", "gif", "bmp", "pdf", "csv", "xlsx", "docx"].includes(file?.fileType)) {
                    fileData.push({
                        label: file.fileName,
                        path: "/retrieved_files/" + file.fileName,
                        type: file.fileType
                    })
                }
            });
            let encodedPath = encodeURIComponent(rawPath.slice(1));
            fetch(`http://localhost:8080/getFiles/${encodedPath}`)
                .then(() => setTabData(fileData))
                .catch(e => console.log(e));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (selectedRows.length > 0) {
            fetchFiles();
        }
    }, [selectedRows]);

    useEffect(() => {
        setSelectedFile(tabData[0]);
    }, [tabData]);

    return (
        <Box>
            <Tabs
                value={selectedTab}
                onChange={handleTab}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {tabData.map((t) => <Tab className="normal-case" label={t.label} key={t.label}></Tab>)}
            </Tabs>
            <FileDisplay file={selectedFile} />
        </Box>
    );
}

export default FilePreview;