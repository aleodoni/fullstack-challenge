import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

const PhoneInput = (props: any) => {
  return (
    <InputMask mask="(99) 99999-9999" value={props.value} onChange={props.onChange}>
    <TextField
      {...props}
      fullWidth={true}
    />
    </InputMask>
  )
}

export default PhoneInput;
