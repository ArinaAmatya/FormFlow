import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom/extend-expect';

describe('SearchBar', () => {
    const chips = [{ id: '1', fileName: 'Sun Rise Power' },];
    it('properly renders search bar', () => {
        const handleAddAllButtonMock = jest.fn();

        render(
        <SearchBar
            chips={chips}
            handleAddAllButton={handleAddAllButtonMock}
        />
        );
        expect(screen.getByText('Add Filters')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add Filters' })).toBeInTheDocument();
    });

    it('All buttons work when pressed', () => {
        const mockDeleteAll = jest.fn()
        const mockHandleAll = jest.fn()
        const mockDelete = jest.fn()
        const mockSearch = jest.fn()
        const {getByTestId} = render(
        <SearchBar
            chips={chips}
            handleDelete={mockDelete}
            handleAddAllButton={mockHandleAll}
            handleDeleteAllButton={mockDeleteAll}
            buttonVisible={true}
            handleSearch={mockSearch}
        />
        );
        const deleteButton = getByTestId('DelAllButton')
        fireEvent.click(deleteButton);
        expect(mockDeleteAll).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getByRole('button', { name: 'Add Filters' }));
        expect(mockHandleAll).toHaveBeenCalledTimes(1);
        const searchButton = getByTestId('SearchButton')
        fireEvent.click(searchButton)
        expect(mockSearch).toHaveBeenCalledTimes(1)
    });
});
