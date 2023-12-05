import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

/**
 * A react component for the history section of the drawer
 * and its functionality.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.label - The label for the filter.
 * @param {string} props.type - The type of filter to apply.
 * @param {string} props.input - Varaible to store input.
 * @param {function(Object):void} props.setInputs - Function to set inputs object of parent.
 * @param {function(string):void} props.addChip - Function to add the filter chip.
 * @returns {React.ReactElement} - FilterInput component.
 */
function FilterInput({ label, type, input, date = false, setInputs, addChip }) {
    /**
     * Updates the stored values of the filter textboxes.
     * 
     * @param {string | Event} d - Either an Event or a date string. Only used in the case where d is a date string.
     * @param {string} type - The type of filter to be updated.
     * 
     * @function
     */
    const filterUpdateHandler = (d, type) => {
        let value;
        if (date) {
            let day = dayjs(d).format("YYYY-MM");
            value = day;
        } else {
            value = d.target.value;
        }

        setInputs(prev => ({
            ...prev,
            [type]: value,
        }));
    }

    /**
     * Adds a filter chip of the specified type when the enter key is pressed.
     * 
     * @param {Event} e - The event sent by the component.
     * @param {string} filterType - The type of chip to be added.
     * 
     * @function
     */
    const keyHandler = (e, filterType) => {
        if (e.key === 'Enter') {
            addChip(filterType);
        }
    }

    return (
        <div className="h-[56px] w-[347px] flex mb-[8px]">
            {
                date ?
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="w-[320px]"
                            label={label}
                            value={input ? dayjs(input) : null}
                            views={['month', 'year']}
                            onChange={(v) => filterUpdateHandler(v, type)}
                            onKeyDown={(e) => keyHandler(e, type)}
                            slotProps={{ textField: { variant: 'filled' } }}
                        />
                    </LocalizationProvider>
                :
                    <div className="h-[56px] w-[347px] flex mb-[8px]">
                        <TextField className="w-[320px]"
                            id={type}
                            label={label}
                            type="search"
                            variant="filled"
                            value={input}
                            onChange={e => filterUpdateHandler(e, type)}
                            onKeyDown={(e) => keyHandler(e, type)}
                        />
                    </div>

            }
            <Button className="flex h-[56px] min-w-[6px] w-[32px] p-[0px] rounded-r-xl rounded-l-none border-0 border-b bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                variant="outlined"
                onClick={() => addChip(type)}
            >
                <svg className="h-[16px] w-[16px] fill-theme-logo-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                >
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                </svg>
            </Button>
        </div>
    );
}

export default FilterInput;