import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataTable from './components/DataTable';
import ModalInsert from './components/ModalInsert';

function App() {
  const [modalInsert, setModalInsert] = useState(false);
  const handleCloseModalInsert = () => setModalInsert(false);

  function newOrderHandler() {
    setModalInsert(true);
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box display="flex" justifyContent="flex-end" sx={{ mx: 2 }}>
          <Button variant="contained" onClick={() => newOrderHandler()}>Open new order</Button>
        </Box>
        <Box display="flex" flex={1} sx={{ my: 2 }}>
          <DataTable />
        </Box>
      </Container>
      <ModalInsert open={modalInsert} handleClose={handleCloseModalInsert} />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
