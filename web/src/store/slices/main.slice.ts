import { CombinedState, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { RootState, AppDispatch } from '../index';
import { ICategory } from '../../interfaces/category';
import { IOrder } from '../../interfaces/order';
import api from '../../service/api';

type OrderInsert = {
  contactName: string;
  contactPhone: string;
  realState: string;
  description: string;
  company: string;
  deadline: string;
  categoryId: number;
}
type StateType = {
  loading: boolean;
  hasErrors: boolean;
  categories: ICategory[];
  orders: IOrder[];
  order: IOrder;
  flagOperation: boolean;
};

const categoryInitialValues = {
  id: 0,
  name: ''
};

const orderInitialValues = {
  id: 0,
  contactName :  '',
  contactPhone :  '',
  realState :  '',
  description :  '',
  company :  '',
  contactAndPhone: '',
  categoryId: -1,
  deadline: new Date(),
  category: categoryInitialValues,
}

const initialState: StateType = {
  loading: false,
  hasErrors: false,
  categories: [] as ICategory[],
  orders: [] as IOrder[],
  order: orderInitialValues,
  flagOperation: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    getCategories: state => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCategoriesFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },

    getOrders: state => {
      state.loading = true;
    },
    getOrdersSuccess: (state, { payload }) => {
      state.orders = payload;
      state.loading = false;
      state.hasErrors = false;

    },
    getOrdersFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },

    getOrder: (state, { payload }) => {
      state.order = payload;
    },

    insertOrder: state => {
      state.loading = true;
    },
    insertOrderSuccess: (state, { payload }) => {
      toast.success('Order created successfully');
      state.loading = false;
      state.hasErrors = false;
      state.flagOperation = !state.flagOperation;
    },
    insertOrderFailure: state => {
      toast.error('Error creating new order');
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const {
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  getOrders,
  getOrdersFailure,
  getOrdersSuccess,
  getOrder,
  insertOrder,
  insertOrderSuccess,
  insertOrderFailure,
} = mainSlice.actions;

export const mainSelector = (state: RootState): CombinedState<StateType> =>
  state.main;

export default mainSlice.reducer;

export const loadCategories = () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(getCategories());

    try {
      const response = await api.get('/api/category/all');

      dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(getCategoriesFailure());
    }
  };

export const loadOrders = () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(getOrders());

    try {
      const response = await api.get('/api/order/all');

      dispatch(getOrdersSuccess(response.data));
    } catch (error) {
      dispatch(getOrdersFailure());
    }
  };

export const selectOrder = (order: IOrder) => (dispatch: AppDispatch): void => {
  dispatch(getOrder(order));
  };

export const createNewOrder = (order: OrderInsert) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(insertOrder());
    try {
      const response = await api.post('/api/order', order);

      dispatch(insertOrderSuccess(response.data));
    } catch (error) {
      dispatch(insertOrderFailure());
    }
  };
