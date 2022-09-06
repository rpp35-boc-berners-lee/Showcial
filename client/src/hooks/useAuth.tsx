import React, {
   useState,
   useEffect,
   useContext,
   createContext,
   ReactComponentElement,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { replace } from 'cypress/types/lodash';

interface AuthProvider {
   user: null | string;
   isLoggedIn: boolean;
   signout: any;
}
const authContext = createContext<AuthProvider>({
   user: null,
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
   const [user, setUser] = useState<string>('');
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   useEffect(() => {
      console.log('here in use effect useauth');
      axios
         .get('/api/auth/checkAuthStatus')
         .then((response) => {
            if (response.status === 200) {
               console.log('response:', response);
               setUser(response.data);
               setIsLoggedIn(true);
            }
         })
         .catch((err) => {
            setIsLoggedIn(false);
            console.log('err', err);
            // navigate('/signin', {replace: true});
         });
   }, []);

   const signout = async () => {
      try {
         await axios.get('/api/auth/logout');
         navigate('/signin');
         setIsLoggedIn(false);
         setUser('');
      } catch (err) {
         console.log('err:', err);
      }
   };
   //now return an object that contains all of our newly created state so it can be accessed when calling our hook
   return {
      user,
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
