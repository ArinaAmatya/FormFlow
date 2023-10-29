import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Searchbar({ chips }) {
    const search = () => {
        // TODO: hook into the backend here
    }

    return (
        <div className="flex">
            <div className="rounded-l-xl bg-theme-contrast-blue-dark p-[10px] w-[500px]">
                <TextField
                    fullWidth
                    size="small"
                    label="File search"
                    id="searchbar"
                />
            </div>
            <Button className="rounded-r-xl rounded-l-none border-none bg-theme-contrast-blue-light hover:bg-[#afc3da] hover:border-none"
                variant="outlined"
                onClick={search}
            >
                <svg className="h-[32px] w-[32px] fill-theme-logo-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </Button>
            <div className="mt-auto mb-auto">
                {chips}
            </div>
        </div>
  );
}