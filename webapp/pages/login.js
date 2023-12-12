import logo from '../public/icons/logo512.png';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter();
  
  const tryLogin = () => {
    // TODO: Hook into backend and validate stuff

    router.push('/search');
  }
  
  return (
    <>
      <div className="text-center">
      <Image className="ml-auto mr-auto"
        src={logo}
        width={300}
        height={300}
        alt="Formflow Logo"
      />
      </div>
      <div className="w-screen flex justify-center">
        <div className="h-[400px] w-[500px] text-center bg-theme-contrast-blue-light border-[#555555] border-2 rounded-[40px] shadow-[#555555] shadow-md">
          <div>
            <p className="text-5xl mt-[30px]">Login</p>
          </div>
          <br/>
          <TextField className="m-[3px] w-[400px]"
            id="outlined-basic"
            label="User ID"
            variant="outlined"
          />
          <br/>
          <TextField className="m-[3px] w-[400px]"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br/>
          <FormControlLabel
            control={
              <Checkbox />
            }
            label=" Stay logged in" />
          <br/>
          <Button className="mt-[20px] h-[40px] w-[300px] bg-theme-logo-blue"
            variant="contained"
            onClick={tryLogin}
          > Login </Button>
          <br/>
          <Link className="inline-block pt-[15px]"
            href="#"
          > forgot your password? </Link>
        </div>
      </div>
    </>
  );
}