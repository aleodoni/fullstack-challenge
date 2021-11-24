import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import ptBRLocale from 'date-fns/locale/pt-BR';
import { useSelector, useDispatch } from 'react-redux';

import { mainSelector, loadCategories, createNewOrder } from '../store/slices/main.slice';
import { useForm } from '../hooks/useForm';
import InputText from './reusable/InputText';
import PhoneInput from './reusable/PhoneInput';
import { IOrder } from '../interfaces/order';
import { formatDateApi } from '../helpers/date.helper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  contactName :  '',
  contactPhone :  '',
  realState :  '',
  description :  '',
  company :  '',
  categoryId: -1,
  deadline: new Date(),
}

interface IProps {
  open: boolean;
  handleClose(): void;
}

const ModalInsert: React.FC<IProps> = ({ open = false, handleClose }) => {
  const { categories } = useSelector(mainSelector);
  const dispatch = useDispatch();

  const validations = {
    contactName:  {
      required: {
        value: true,
        message: "Contact required",
      }
    },
    contactPhone:  {
      pattern: {
        value: /\(\d{2}\)\s\d{4,5}-\d{4}$/g.source,
        message: 'Phone number invalid'
      }
    },
    realState:  {
      required: {
        value: true,
        message: "Agency required",
      }
    },
    description:  {
      required: {
        value: true,
        message: "Description required",
      }
    },
    company:  {
      required: {
        value: true,
        message: "Company required",
      }
    },
  }

  const {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleChangeSelect,
    handleChangeDate,
  } = useForm<IOrder>({
    initialValues: initialValues,
    validations,
    onSubmit: async () => {
      dispatch(createNewOrder({
        categoryId: data.categoryId,
        company: data.company,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        deadline: formatDateApi(data.deadline),
        description: data.description,
        realState: data.realState
      }));
      handleClose();
    }
  });

  useEffect(() => {
    const load = async () => {
      dispatch(loadCategories());
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            New order
          </Typography>
          <form
            onSubmit={(e) => handleSubmit(e)}
            // onSubmit={handleSubmit}
          >
          <Box display="flex" justifyContent="space-between" sx={{mt: 2}}>
            <InputText
              error={errors.contactName ? true : false}
              helperText={errors.contactName}
              required
              name="contactName"
              label="Contact name"
              value={data.contactName || ''}
              onChange={handleChange('contactName')}
            />
            <PhoneInput
              error={errors.contactPhone ? true : false}
              helperText={errors.contactPhone}
              required
              name="contactPhone"
              label="Contact phone"
              sx={{ marginLeft: 2 }}
              value={data.contactPhone || ''}
              onChange={handleChange('contactPhone')}
            />
            {/* <InputText
              error={errors.contactPhone ? true : false}
              helperText={errors.contactPhone}
              required
              name="contactPhone"
              label="Contact phone (99) 9999?-9999"
              sx={{ marginLeft: 2 }}
              value={data.contactPhone || ''}
              onChange={handleChange('contactPhone')}
            /> */}
            <InputText
              error={errors.realState ? true : false}
              helperText={errors.realState}
              required
              name="realState"
              label="Real estate agency"
              sx={{ marginLeft: 2 }}
              value={data.realState || ''}
              onChange={handleChange('realState')}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" sx={{mt: 2}}>
            <InputText
              error={errors.description ? true : false}
              helperText={errors.description}
              required
              name="description"
              label="Order description"
              multiline
              rows={5}
              value={data.description || ''}
              onChange={handleChange('description')}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{mt: 2}}>
            <InputText
              error={errors.company ? true : false}
              helperText={errors.company}
              required
              name="company"
              label="Company"
              value={data.company || ''}
              onChange={handleChange('company')}
            />
            <FormControl fullWidth={true} sx={{ marginLeft: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                label="Category"
                name="categoryId"
                value={String(data.categoryId)}
                onChange={handleChangeSelect}
                input={<OutlinedInput label="Category" />}
              >
                <MenuItem value={-1}>
                  <em>Please Select</em>
                </MenuItem>
                { categories?.map(category => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth={true} sx={{ marginLeft: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
                <DatePicker
                  label="Deadline"
                  value={data.deadline}
                  onChange={handleChangeDate('deadline')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="flex-end" sx={{mt: 2}}>
            <Button type="submit">Save</Button>
          </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalInsert;
