/* eslint-disable */
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "src/routes/hooks";

// ----------------------------------------------------------------------
export const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};


const accountHolder = () => {
  const [user, setUser] = useState(null)
  const router = useRouter();


  useEffect(() => {
    const authToken = Cookies.get("token");
    const userData = JSON.parse(authToken);
    if(!userData){
      router.push('/login');
    }
    if(userData){
      setUser(userData)
    }
    account.displayName = userData.name
  }, [])
}

export default accountHolder
