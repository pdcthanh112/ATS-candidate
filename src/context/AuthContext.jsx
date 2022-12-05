import {
  GoogleAuthProvider,
  signInWithPopup, signOut
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { auth } from '../configs/firebaseConfig';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  };

  const logOut = () => {
      signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};