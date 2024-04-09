import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useState } from "react";
import "./SignIn.css"
export default function SignIn() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function signIn() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    //   console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
  async function signInWithGoogle() {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );
    //   console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
  async function logOut() {
    try {
      await signOut(auth);
    //   console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signIn-form">
      <h1>Sign In</h1>
      <TextField id="email"
       label="Email" 
       variant="standard" 
       name="email"
       onChange={handleChange}
       />
        <TextField id="password"
       label="Password" 
       variant="standard" 
       name="password"
       type="password"
       onChange={handleChange}
       />
    
      <Button variant="contained" onClick={signIn}>Sign In</Button>
      <Button variant="contained" onClick={signInWithGoogle}>Sign In with Google</Button>
      <Button variant="contained" onClick={logOut}>Log Out</Button>

      
    </div>
  );
}
