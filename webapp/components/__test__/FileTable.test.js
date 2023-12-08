import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileTable from '../FileTable';
import '@testing-library/jest-dom/extend-expect';

describe('filetable tests, checking the components', () => {
  const mockFiles = [
    {
      id: '1',
      fileName: 'Sun Rise Power'
    },
    {
      id: '2',
      fileName: 'PETS'
    },
    {
      id: '3',
      fileName: 'Some Guy'
    }
  ];
  
  test('renders FileTable with rows', () => {
    render(<FileTable files={mockFiles} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Sun Rise Power')).toBeInTheDocument();
    expect(screen.getByText('PETS')).toBeInTheDocument();
    expect(screen.getByText('Some Guy')).toBeInTheDocument();
  });

  test('is able to correctly conduct checkbox selection and deselection', () => {
    render(<FileTable files={mockFiles} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(mockFiles.length + 1);
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
    fireEvent.click(checkboxes[2]);
    expect(checkboxes[1]).toBeChecked();
    fireEvent.click(checkboxes[2]);
    expect(checkboxes[2]).not.toBeChecked();
    
  });
  
})



