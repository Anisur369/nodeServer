import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { useState, useEffect } from "react";
import axios from "axios";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, name, imageFile) => {
    setLoading(true);
    try {
      // Firebase create user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //image upload formate
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload image to imgbb api key => VITE_IMGBB_API_KEY
      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

      const response = await axios.post(imageAPI_URL, formData);
      const imageUrl = response.data.data.display_url;

      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageUrl,
      });

      setUser(result.user);
      setLoading(false);
    } catch (error) {
      console.error("Error creating user:", error);
      setLoading(false);
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(false);
    setUser(null);
    return signOut(auth);
  };

  // const resetPassword = (email) => {
  //   setLoading(true);
  //   return firebaseResetPassword(auth, email);
  // };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(true);
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
export default AuthProvider;
