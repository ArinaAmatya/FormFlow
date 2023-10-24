import '../styles/login.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from '@mui/material/Container';
import logo from '../public/icons/logo512.png';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router'

import styles from '../styles/login.module.css';

export default function LoginPage() {
  const router = useRouter();
  
  const tryLogin = () => {
    // TODO: Hook into backend and validate stuff

    router.push('/search');
  }
  
  return (
    <>
      <div className={styles["logo-container"]}>
      <Image className={styles["logo-img"]}
        src={logo}
        width={300}
        height={300}
        alt="Formflow Logo"
      />
      </div>
      <div className={styles["login-container"]}>
        <div className={styles["login-prompt-text-container"]}>
          <p className={styles["login-prompt-text"]}>Login</p>
        </div>
        <br/>
        <TextField className={styles["user-id-input"]}
          id="outlined-basic"
          label="User ID"
          variant="outlined"
        />
        <br/>
        <TextField className={styles["password-input"]}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <br/>
        <FormControlLabel className={styles["stay-logged-in-label"]}
          control={
            <Checkbox className={styles["stay-logged-in-checkbox"]} />
          }
          label=" Stay logged in" />
        <br/>
        <Button className={styles["login"]}
          variant="contained"
          onClick={tryLogin}
        > Login </Button>
        <br/>
        <Link className={styles["forgot-password"]}
          href="#"
        > forgot your password? </Link>
      </div>
    </>
  );
}