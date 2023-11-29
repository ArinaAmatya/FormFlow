import React from 'react';
import Button from '@mui/material/Button';
import FileTable from './FileTable';
import { useRouter } from 'next/router'

/**
 * A React component that displays the search results table
 * and provides the preview and download buttons for it.
 * 
 * @param {Object} props - Component properties.
 * @param {*} props.files - File metadata to display in the table.
 * @returns {React.ReactElement} - ResultsRack component.
 * 
 * @function
 */
function ResultsRack({ files }) {
    const router = useRouter();

    const tryPreview = () => {
        let query = queryForFiles();

        router.push('/preview');
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
            <FileTable files={files}/>
        </>
  );
}

export default ResultsRack;