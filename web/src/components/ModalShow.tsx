import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { mainSelector } from '../store/slices/main.slice';
import LabelDesc from './reusable/LabelDesc';
import { formatDate } from '../helpers/date.helper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  handleClose(): void;
}

const ModalShow: React.FC<IProps> = ({ open = false, handleClose }) => {
  const { order } = useSelector(mainSelector);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order details
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <LabelDesc label="Contact name" desc={order.contactName} />
            <LabelDesc label="Contact phone" desc={order.contactPhone} />
            <LabelDesc label="Real estate agency" desc={order.realState} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <LabelDesc label="Order description" desc={order.description} />
            <LabelDesc label="Company" desc={order.company} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <LabelDesc label="Category" desc={order.category.name} />
            <LabelDesc label="Deadline" desc={formatDate(order.deadline)} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalShow;
