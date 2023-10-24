import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Image from 'next/image'
import logo from '../public/icons/logo512.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

export default function HomePage() {
  const router = useRouter();

  const loginRedirect = () => {
    router.push('/login');
  }

  return (
    <>
      <div className="h-screen flex content-center justify-center">
        <div className="mt-[10%] text-center">
          <Image
            src={logo}
            width={300}
            height={300}
            alt="Formflow Logo"
          />
          <br />
          <Button className="h-[40px] w-[100px] m-[5px] bg-theme-logo-blue"
            variant="contained"
            onClick={loginRedirect}
          > Login </Button>
          <Button className="h-[40px] w-[100px] m-[5px] bg-theme-contrast-blue-dark text-black hover:bg-[#afc3da]"
            variant="contained"
          > Sign Up </Button>
        </div>
      </div>
    </>
  );
}