import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function search() {
    // TODO: hook into the backend here
    
    // TODO: make icon move along with button when depressed

    console.log("SEARCHED!");
}

function Searchbar() {
  return (
    <div className="searchbar-container">
        <div className="searchbar-input-box-container">
            <TextField fullWidth size="small" label="File search" id="searchbar"/>
        </div>
        <Button className="search-button" variant="outlined" onClick={search}>
            <svg xmlns="http://www.w3.org/2000/svg" className="bi search-icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        </Button>
    </div>
  );
}

export default Searchbar;