import React,{useState} from 'react';
import { Box } from '@mui/system';
import { FormControl, TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";

const TextFieldComp = (props) => {

    const dispatch = useDispatch();

    const{label, type, setEmail} = props;

    const[value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        switch (type) {
         case "number":
          dispatch(handleAmountChange(e.target.value));
          break;
          case "email":
         setEmail(e.target.value);
          break;
        default:
            return;
      };
    }

  return (
   <Box mt={3} width="100">
   <FormControl fullWidth size="small">
    <TextField 
      value={value}
      onChange={handleChange}
      variant="outlined"
      label={label}
      type={type}
      size='small'
      />
   </FormControl>
   </Box>
  )
}

export default TextFieldComp