import React,{useState} from 'react'
import TextFieldComp from '../components/TextFieldComp'
import { Button, Box } from '@mui/material'
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleAutho } from "../redux/actions";



const Login = () => {

   const[email, setEmail] =useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
       if(email!==""){
        dispatch(handleAutho(true));
        navigate("/");
       }
      }

  return (
    <>Login
     <form onSubmit={handleSubmit}>
    <TextFieldComp setEmail={setEmail} type="email" label="email"/>
    <Box mt={3}>
         <Button fullWidth variant="contained" type="submit">
    Login
    </Button>
    </Box>
    </form>
   
    </>
  )
}

export default Login