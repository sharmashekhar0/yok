/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import { useRouter } from "src/routes/hooks";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export default function App() {
  const router = useRouter()
  useEffect(() => {
    const authToken = Cookies.get("token");
    if(authToken){
      const userData = JSON.parse(authToken);
      if(!userData){
        router.push('/login');
      }
      if(userData){
        // setUser(userData)
      }
    }
  }, [router])

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
