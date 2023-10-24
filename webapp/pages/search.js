import '../styles/search.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

export default function SearchPage() {
  const router = useRouter();

  const queryForFiles = () => {
    // TODO: Create query to backend

    return null;
  }

  const tryPreview = () => {
    query = queryForFiles();

    router.push('/preview');
  }

  const tryDownload = () => {
    // TODO: Get zipped files from backend

    query = queryForFiles();
  }

  return (
    <>
      <NavBar/>
      <Button
        variant="outlined"
        onClick={tryPreview}
      >
        Preview Selected Files
      </Button>
      <Button
        variant="contained"
        onClick={tryDownload}
      >
        Download Selected Files
      </Button>
    </>
  );
}