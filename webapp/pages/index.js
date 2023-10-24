import '../styles/index.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Image from 'next/image'
import logo from '../public/icons/logo512.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

import styles from '../styles/index.module.css';

export default function HomePage() {
  const router = useRouter();

  const loginRedirect = () => {
    router.push('/login');
  }

  return (
    <>
      <div className={styles["home-container"]}>
        <Image
          src={logo}
          width={300}
          height={300}
          alt="Formflow Logo"
        />
        <br />
        <Button className={styles["login"]}
          variant="contained"
          onClick={loginRedirect}
        > Login </Button>
        <Button className={styles["sign-up"]}
          variant="contained"
        > Sign Up </Button>
      </div>
    </>
  );
}