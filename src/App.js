import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import { Container, Box } from "@mui/material";
import PrivateRoutes from "./pages/PrivateRoutes";
import Login from "./pages/Login";

function App() {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
      <Router>
      <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path="/" element={ <Settings/>}/>
        <Route path="/questions" element={ <Questions/>}/>
        <Route path="/results" element={ <Results/>}/>
      </Route>
      <Route element={<Login/>} path="/login"/>
     </Routes>
    </Router>
      </Box>
   
    </Container>
     
   
  );
}

export default App;
