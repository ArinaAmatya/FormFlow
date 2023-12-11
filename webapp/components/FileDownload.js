import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { FileData } from '../typedefs.js';

/**
 * A React component button that downloads files selected in the file table.
 * 
 * @param {Object} props - Component properties.
 * @param {FileData[]} props.selectedFiles - Info for files to download.
 * @returns {React.ReactElement} - ResultsRack component.
 * 
 * @function
 */
function FileDownload({ selectedFiles }) {
    const tryDownload = () => {
        try {
            if (selectedFiles.length === 0) {
                return;
            }

            let rawPath = "";
            selectedRows.forEach((file) => {
                rawPath += "&" + file.filePath.replace("Attachments/", "");
            });
            let encodedPath = encodeURIComponent(rawPath.slice(1));
            fetch(`http://localhost:8080/getFiles/${encodedPath}`)
                .then((dlPath) => {
                    setDLEnabled(true);
                    const anchor = document.createElement('a');
                    anchor.href = dlPath;
                    anchor.download = 'selected-files.zip';
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                })
                .catch(e => console.log(e));
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <Button className="ml-[20px] bg-theme-logo-blue"
            variant="contained"
            onClick={tryDownload}
        >
            Download Selected Files
        </Button>
    );
};

export default FileDownload;
