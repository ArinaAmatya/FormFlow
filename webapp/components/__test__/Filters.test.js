import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';
import '@testing-library/jest-dom/extend-expect';

describe('Filters', () => {
  it('renders the screen to proper filters table', () => {
    const setInputsMock = jest.fn();
    const addChipMock = jest.fn();
    const handleFilterAndSearchButtonMock = jest.fn();
    render(
      <Filters
        inputs={{
            fileName: 'fileName',
            fileType: 'fileType',
            customerName: 'customerName',
            customerID: 'customerID',
            projectName: 'projectName',
            projectID: 'projectID',
            proposalName: 'proposalName',
            proposalID: 'proposalID',
            resourceName: 'resourceName',
            resourceID: 'resourceID',
        }}
        setInputs={setInputsMock}
        addChip={addChipMock}
        handleFilterAndSearchButton={handleFilterAndSearchButtonMock}
      />
    );
    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('File Type')).toBeInTheDocument();
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Project Name')).toBeInTheDocument();
    expect(screen.getByText('Project ID')).toBeInTheDocument();
    expect(screen.getByText('Proposal Name')).toBeInTheDocument();
    expect(screen.getByText('Proposal ID')).toBeInTheDocument();
  });

  it('button click function works', () => {
    const setInputsMock = jest.fn();
    const addChipMock = jest.fn();
    const handleFilterAndSearchButtonMock = jest.fn();
    render(
      <Filters
        inputs={{
            fileName: 'fileName',
            fileType: 'fileType',
            customerName: 'customerName',
            customerID: 'customerID',
            projectName: 'projectName',
            projectID: 'projectID',
            proposalName: 'proposalName',
            proposalID: 'proposalID',
            resourceName: 'resourceName',
            resourceID: 'resourceID',
        }}
        setInputs={setInputsMock}
        addChip={addChipMock}
        handleFilterAndSearchButton={handleFilterAndSearchButtonMock}
      />
    );
    fireEvent.click(screen.getByText('Filter & Search'));
    expect(handleFilterAndSearchButtonMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Filter & Search'));
    fireEvent.click(screen.getByText('Filter & Search'));
    fireEvent.click(screen.getByText('Filter & Search'));
    expect(handleFilterAndSearchButtonMock).toHaveBeenCalledTimes(4);
  });
});
