import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileTable from '../FileTable';
import '@testing-library/jest-dom/extend-expect';

describe('filetable tests, checking the components', () => {
  const mockFiles = [
    {
      id: '1',
      fileType: 'fileType',
      customerID: 1,
      customerName: 'Some Guy'
    },
    {
      id: '2',
      fileType: 'fileType',
      customerID: 2,
      customerName: 'Some Guy'
    },
    {
      id: '3',
      fileType: 'fileType',
      customerID: 3,
      customerName: 'Some Guy'
    }
  ];
  
  test('renders FileTable with rows', () => {
    render(<FileTable files={mockFiles} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  
})



