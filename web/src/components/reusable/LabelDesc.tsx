import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IProps {
  label: string;
  desc: string;
};

const LabelDesc: React.FC<IProps> = ({ label, desc }) => {
  return(
    <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
      <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
      <Typography >{desc}</Typography>
    </Box>
  )
}

export default LabelDesc;
