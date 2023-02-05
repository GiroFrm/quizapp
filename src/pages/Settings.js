import { Typography, Button, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import SelectField from "../components/SelectField"
import TextFieldComp from "../components/TextFieldComp"
import useAxios from "../hooks/useAxios"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  }= useSelector(state=>state);

const { response, error, loading } = useAxios({ url:"/api_category.php"})

const navigate = useNavigate();
if(loading) {
  return (
    <Box mt={20}>
     <CircularProgress/>
    </Box>
  );
}

if(error) {
  return(
    <Typography variant="h6" mt={20} color="red">
      Error!
    </Typography>
  )
}

const difficultyOptions = [
  {id: "easy", name: "Easy"},
  {id: "medium", name: "Medium"},
  {id: "hard", name: "Hard"},
]

const typeOptions = [
  {id: "multiple", name: "Multiple Choise"},
  {id: "boolean", name: "True/False"}
]

const handleSubmit = e => {
  e.preventDefault();
  if(question_category && question_difficulty && question_type && amount_of_question){
  navigate("/questions");
  }
}

  return (
   <>
      <Typography variant="h2" fontWeight="bold">Quiz App</Typography>
      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category"/>
        <SelectField options={difficultyOptions} label="Level"/>
        <SelectField options={typeOptions} label="Type"/>
        <TextFieldComp type="number" label="Amout of Questions"/>
        <Box mt={3} width="100">
          <Button fullWidth variant="contained" type="submit">
          Get Started
          </Button>
        </Box>
      </form>
</>
    
  )
}

export default Settings