import React, {
   useState,
   useEffect,
   useContext,
   createContext,
   ReactComponentElement,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthProvider {
   username: string;
   isLoggedIn: boolean;
   signout: null | (() => void);
}
const authContext = createContext<AuthProvider>({
   username: '',
   isLoggedIn: false,
   signout: null,
});

interface Props {
   children: React.ReactNode;
}

//this is a hook that can be imported in any component to get the authentication object
export const useAuth = () => {
   return useContext(authContext);
};

//this is the custom hook passed to our Provider that will handle all our authentication state and create the authentication object
function useProvideAuth() {
   const navigate = useNavigate();
   const [username, setUsername] = useState<string>('');
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   useEffect(() => {
      console.log('here in use effect auth context');
      axios
         .get('/api/auth/checkAuthStatus')
         .then((response) => {
            if (response.status === 200) {
               console.log('response:', response);
               setUsername(response.data);
               setIsLoggedIn(true);
            }
         })
         .catch((err) => {
            setIsLoggedIn(false);
            console.log('err', err);
            navigate('/signin');
         });
   }, []);

   const signout = async () => {
      try {
         await axios.get('/api/auth/logout');
         navigate('/signin');
      } catch (err) {
         console.log('err:', err);
      }
   };
   //now return an object that contains all of our newly created state so it can be accessed when calling our hook
   return {
      username,
      isLoggedIn,
      signout,
   };
}

//this is the Provider Component that wraps components/entire app to create the authentication object
// this makes the authentication object available to any child component that calls useAuth()
export const ProvideAuth = ({ children }: Props) => {
   const auth = useProvideAuth();
   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
