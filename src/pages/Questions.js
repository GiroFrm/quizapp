import { Button, Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScoreChange } from "../redux/actions";


import { useNavigate } from "react-router-dom";


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {

  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  }= useSelector(state=>state);
    
  const navigation = useNavigate();
  const dispatch = useDispatch();

    let apiUrl = `/api.php?amount=${amount_of_question}`;

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const {response, loading}= useAxios({url: apiUrl});

  const [questionIndex, setQuestionIndex] = useState(0);

  const [options, setOptions] = useState([]);

  const [nextIndex, setNextIndex] = useState(0);

  
 

   useEffect(()=>{

    if(response?.results.length) {

    const question = response.results[questionIndex];

    let answers = [...question.incorrect_answers];

      answers.splice(

        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );

      setOptions(answers);
     
    }
   
  }, [response, questionIndex]);
   

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  const handleClickAnswer = (e) => {
    if(nextIndex<=0) {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
    
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigation("/results");
    }
    
  }
  };

  const handlePrevAnswer =(e) => {
    if (questionIndex > 0) {
      setNextIndex(nextIndex + 1)
      setQuestionIndex(questionIndex - 1);
      console.log("nextIndex From prev is"+nextIndex);
      
    }
  }

  const handleNextAnswer =(e) => {
    if  (nextIndex>0 && questionIndex + 1 < response.results.length ) {
      setNextIndex( nextIndex - 1 );
      setQuestionIndex(questionIndex + 1); 
    }
  }


  return (
   <Box>
    <Typography variant="h4">Questions {questionIndex + 1}</Typography>
    <Typography variant="h5" mt={5}>{decode(response.results[questionIndex].question)}
    </Typography>
    {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button variant="contained"
          sx={{
            width:'250px',
           
          }}
           onClick={handleClickAnswer} >
            {decode(data)}
          </Button>
        </Box>
      ))}
      
    <Box mt={5}>
    Score: {score} / {response.results.length}
    </Box>
    <Box mt={2} >
          <Button 
          mr={2}
          onClick={handlePrevAnswer} variant="contained">
           Previus
          </Button>
          <Button mt={4} onClick={handleNextAnswer} variant="contained">
           Next
          </Button>
        </Box>
  
   </Box>
  )
}

export default Questions;