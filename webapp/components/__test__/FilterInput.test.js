import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterInput from '../FilterInput';

describe('FilterInput tests', () => {
  test('calling setInput alone doesnt change the number of chips', () => {
    const setInputsMock = jest.fn();
    const addChipMock = jest.fn();
    render(
      <FilterInput
        label="Testing"
        setInputs={setInputsMock}
        addChip={addChipMock}
      />
    )
    fireEvent.change(screen.getByLabelText('Testing'), { target: { value: 'new value' } });
    expect(setInputsMock).toHaveBeenCalledWith(expect.any(Function));
    expect(addChipMock).not.toHaveBeenCalled();
  });
  
  test('adds chips when you hit enter', () => {
    const addChipMock = jest.fn();
    render(
        <FilterInput
          label="Testing"
          addChip={addChipMock}
        />
      );
    fireEvent.keyDown(screen.getByLabelText('Testing'), { key: 'Enter' });
    expect(addChipMock).toHaveBeenCalled();
  });
});
