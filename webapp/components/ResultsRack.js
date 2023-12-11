import React, {useState} from 'react';
import Button from '@mui/material/Button';
import FileTable from './FileTable';
import { useRouter } from 'next/router'
import { FileData } from '../typedefs.js';

/**
 * A React component that displays the search results table
 * and provides the preview and download buttons for it.
 * 
 * @param {Object} props - Component properties.
 * @param {FileData[]} props.files - File metadata to display in the table.
 * @returns {React.ReactElement} - ResultsRack component.
 * 
 * @function
 */
function ResultsRack({ files }) {
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileSelection = (selected) => {
        setSelectedFiles(selected);
    };

    const queryForFiles = () => {
        return '/test_files/TEST%20handleFileSelectionPDF.pdf';
    };

    const tryPreview = () => {
        if (selectedFiles.length === 0) {
            console.log('No files selected');
            return;
        }

        const selectedRows = encodeURIComponent(JSON.stringify(selectedFiles));
        router.push(`/preview?selectedRows=${selectedRows}`);
    }

    const tryDownload = () => {
        // TODO: Get zipped files from backend

        let query = queryForFiles();
    }

    return (
        <>
            <div className="flex">
                <Button
                    variant="outlined"
                    onClick={tryPreview}
                    >
                    Preview Selected Files
                </Button>
                <Button className="ml-[20px] bg-theme-logo-blue"
                    variant="contained"
                    onClick={tryDownload}
                    >
                    Download Selected Files
                </Button>
            </div>
            <br />
            <FileTable files={files} onSelectionChange={handleFileSelection} />
        </>
  );
};

export default ResultsRack;