import React from 'react';
import { render, screen } from '@testing-library/react';
import FileTable from '../FileTable';
import '@testing-library/jest-dom/extend-expect';


const mockFiles = [
  {
    id: '1',
    field: 'id',
    fileType: 'fileType',
    customerID: 3,
    customerName: 'Some Guy'
  }
];

test('renders FileTable with rows', () => {
  render(<FileTable files={mockFiles} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  
});

