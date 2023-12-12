import React, { useState, useEffect } from 'react';
import FileViewer from 'react-file-viewer';
import { FileInfo } from '../typedefs.js';
import Typography from '@mui/material/Typography';

/**
 * A React component that uses react-file-viewer to attempt to view a file.
 * 
 * @param {Object} props - Component props.
 * @param {FileInfo} props.file - Info needed to display the file.
 * @returns {React.ReactElement} - FileDisplay component.
 * 
 * @function
 */
function FileDisplay({ file }) {
    return (
        <div>
            {
                file && file.path && file.type && file.path ?
                    <FileViewer
                        key={file.path}
                        fileType={file.type}
                        filePath={file.path}
                    />
                    :
                    <div className="w-full text-center">
                        <Typography className="mt-[100px] text-4xl font-mono">Loading files...</Typography>
                    </div>
            }
        </div>
    );
}

export default FileDisplay;