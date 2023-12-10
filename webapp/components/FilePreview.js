import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FileViewer from 'react-file-viewer';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

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
     * @returns {React.ReactComponentElement[]} - Tab component array.
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
        setSelectedTab(newValue);
    };

    const fetchFiles = () => {
        try {
            let filePromises = [];
            selectedRows.forEach((file) => {
                let encodedPath = encodeURIComponent(file.filePath);
                let encodedDest = encodeURIComponent("/temp/" + file.fileName);
                filePromises.push(
                    fetch(`https://localhost:8080/getFileObject/${encodedPath}/${encodedDest}`)
                );
                setTabData(prev => prev.concat([{
                    label: file.fileName,
                    path: file.filePath,
                    type: file.fileType
                }]));
            });
            Promise.all(filePromises).then(setSelectedFile(tabData[0]));
        } catch(e) {
            console.log("WAH" + e);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [selectedRows]);

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
        <FileViewer
            fileType={selectedFile?.type}
            filePath={selectedFile?.path}
        />
    </Box>
    <Button onClick={() => console.log(JSON.stringify(selectedRows))}></Button>
    </>);
}

export default FilePreview;