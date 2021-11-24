import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DataGrid,
  GridColDef,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { formatDateString } from '../helpers/date.helper';
import ModalShow from '../components/ModalShow';
import { mainSelector, loadOrders, selectOrder } from '../store/slices/main.slice';

function getContactAndPhone(params: any) {
  return `${params.getValue(params.id, 'contactName') || ''} - ${
    params.getValue(params.id, 'contactPhone') || ''
  }`;
}

function getCategoryName(params: any) {
  return params.row.category.name || ''
}

function getDeadlineFormatted(params: any) {
  return formatDateString(params.row.deadline);
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, align: 'right', headerAlign: 'right' },
  { field: 'category', headerName: 'Category', width: 200, valueGetter: getCategoryName },
  { field: 'contactName', hide: true},
  { field: 'contactPhone', hide: true},
  {
    field: 'contactAndPhone',
    headerName: 'Contact',
    width: 250,
    valueGetter: getContactAndPhone,
  },
  { field: 'company', headerName: 'Agency', width: 200 },
  { field: 'company', headerName: 'Company', width: 200 },
  {
    field: 'deadline',
    headerName: 'Deadline',
    width: 200,
    align: 'right',
    headerAlign: 'right',
    valueGetter: getDeadlineFormatted,
  },
];

export default function DataTable() {
  const [modalShow, setModalShow] = useState(false);
  const { orders, flagOperation } = useSelector(mainSelector);
  const dispatch = useDispatch();
  const handleCloseModalShow = () => setModalShow(false);

  useEffect(()  => {
    const load = async () => {
      dispatch(loadOrders());
    };

    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagOperation]);

  function rowClickHandler(params: any, event: MuiEvent<React.SyntheticEvent>, details: GridCallbackDetails) {
    dispatch(selectOrder({
      id: params.id,
      realState: params.row.realState,
      category: params.row.category,
      company: params.row.company,
      contactName: params.row.contactName,
      contactPhone: params.row.contactPhone,
      deadline: params.row.deadline,
      description: params.row.description,
      categoryId: 0,
      contactAndPhone: '',
    }));
    setModalShow(true);
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ width: '100%'}}>
      <DataGrid
        autoHeight={true}
        rows={orders as []}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        onRowClick={(params, event, details) => rowClickHandler(params, event, details)}
      />
      <ModalShow open={modalShow} handleClose={handleCloseModalShow} />
    </Box>
  );
}
