import { useEffect, createContext, useState } from 'react';
import { me } from '../api/auth';
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const userToken = localStorage.getItem('token');
 
  useEffect(() => {
    const Getme = async () => {
      const response = await me();
      if (response) {
        setUser({
          _id: response?.data?.data?.user?._id,
          name: response?.data?.data?.user?.name ,
          email: response?.data?.data?.user?.email,
         
        });
      } else {
        setUser(null);
      }
    };
    if (userToken) {
      Getme();
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};