import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

/**
 * Represents the essential data of a filter chip.
 * 
 * @typedef {Object} ChipData
 * @property {number} id - The unique ID of the chip.
 * @property {string} type - The type the chip will filter for.
 * @property {number} value - The value that will be filtered for.
 */

/**
 * A react component for the history section of the drawer
 * and its functionality.
 * 
 * @param {Object} props - Component props.
 * @param {ChipData[]} chips - The filter chips.
 * @param {function(string):void} handleDelete - Handles the deletion of a chip of input ID.
 * @param {boolean} buttonVisible - Determines if the add filters button is visible.
 * @param {function():void} handleButton - Handles the add filters button behavior.
 * @returns {React.ReactElement} - FilterInput component
 */
function SearchBar({ chips, handleDelete, handleButton, buttonVisible, handleSearch }) {
    /**
     * Returns -1, 0, or 1 depending on which chip is alphabetically greater.
     * Used for sorting of chips array alphabetically.
     * 
     * @param {ChipData} chip1
     * @param {ChipData} chip2
     * @returns {number} - -1 if chip2 is greater, 0 if neither is greater, 1 if chip1 is greater.
     * 
     * @function
     */
    const chipSort = (chip1, chip2) => {
        if (chip1.type < chip2.type) {
            return -1;
        } else if (chip1.type > chip2.type) {
            return 1;
        }

        if (chip1.value < chip2.value) {
            return -1;
        } else if (chip1.value > chip2.value) {
            return 1;
        }

        return 0;
    }

    /**
     * Builds a MUI Chip component using an input ChipData object.
     * 
     * @param {ChipData} c - The data that is necessary to build the chip.
     * @returns {React.ReactElement} - A Chip component.
     * 
     * @function
     */
    const generateChip = (c) => {
        return (<Chip className="ml-[5px] mr-[5px] mt-[2px] bg-theme-logo-blue text-white"
            key={c.id}
            label={c.type + ": " + c.value}
            onDelete={() => handleDelete(c.id)}
        />);
    }
    
    return (
        <div className="flex">
            <div className="rounded-l-xl bg-theme-contrast-blue-dark p-[10px] min-h-[56px] min-w-[320px]">
                <div>
                    <Button className={buttonVisible ? "bg-theme-logo-blue w-[300px]" : "hidden"}
                        variant="contained"
                        onClick={handleButton}
                    >Add Filters</Button>
                    {chips.sort(chipSort).map((c) => generateChip(c))}
                </div>
            </div>
            <Button className="rounded-r-xl rounded-l-none border-none bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                variant="outlined"
                onClick={handleSearch}
            >
                <svg className="h-[32px] w-[32px] fill-theme-logo-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </Button>
        </div>
    );
}

export default SearchBar;