import TextField, { TextFieldProps } from '@mui/material/TextField';

const InputText: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      fullWidth={true}
    />
  )
}

export default InputText;
