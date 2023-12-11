import React, { useState, useEffect } from 'react';
import FileViewer from 'react-file-viewer';
import { FileInfo } from '../typedefs.js';

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
        <FileViewer
            key={file?.path}
            fileType={file?.type}
            filePath={file?.path}
        />
    );
}

export default FileDisplay;