import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

export default function ResultsRack() {
    const router = useRouter();

    const queryForFiles = () => {
        // TODO: Create query to backend

        return null;
    }

    const tryPreview = () => {
        let query = queryForFiles();

        router.push('/preview');
    }

    const tryDownload = () => {
        // TODO: Get zipped files from backend

        let query = queryForFiles();
    }

    return (
        <>
            <div className="flex">
                <Button
                    variant="outlined"
                    onClick={tryPreview}
                    >
                    Preview Selected Files
                </Button>
                <Button className="ml-[20px] bg-theme-logo-blue"
                    variant="contained"
                    onClick={tryDownload}
                    >
                    Download Selected Files
                </Button>
            </div>
        </>
  );
}