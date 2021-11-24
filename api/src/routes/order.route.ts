import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

import { validateRequest } from '../common';
import { CreateOrderService } from '../services/order/create.service';
import { GetAllOrderService } from '../services/order/getall.service';
import { GetOrderService } from '../services/order/get.service';
import { UpdateOrderService } from '../services/order/update.service';
import { DeleteOrderService } from '../services/order/delete.service';

const router = express.Router();

router.post(
  '/api/order',
  [
    body('company')
      .not()
      .isEmpty()
      .withMessage('Company required'),
    body('contactName')
      .not()
      .isEmpty()
      .withMessage('Contact name required'),
    body('contactPhone')
      .not()
      .isEmpty()
      .isMobilePhone('pt-BR')
      .withMessage('Phone invalid'),
    body('deadline')
      .not()
      .isEmpty()
      .isDate()
      .withMessage('Deadline date invalid'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('Description required'),
    body('realState')
      .not()
      .isEmpty()
      .withMessage('Real state required'),
    body('categoryId')
      .isNumeric()
      .withMessage('Category invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      company,
      contactName,
      contactPhone,
      deadline,
      description,
      realState,
      categoryId
    } = req.body;

    const createOrderService = new CreateOrderService();

    const newOrder = await createOrderService.execute({
      company,
      contactName,
      contactPhone,
      deadline,
      description,
      realState,
      categoryId
    });

    res.status(201).send(newOrder);
});

router.get(
  '/api/order/all',
  async (req: Request, res: Response) => {
    const listAllOrdersService = new GetAllOrderService();

    const ordersList = await listAllOrdersService.execute();

    res.status(200).send(ordersList);
});

router.get(
  '/api/order/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Order id invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const getOrderService = new GetOrderService();

    const order = await getOrderService.execute({ id: Number(id) });

    res.status(200).send(order);
});

router.put(
  '/api/order/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Order id invalid'),
    body('company')
      .not()
      .isEmpty()
      .withMessage('Company required'),
    body('contactName')
      .not()
      .isEmpty()
      .withMessage('Contact name required'),
    body('contactPhone')
      .not()
      .isEmpty()
      .isMobilePhone('pt-BR')
      .withMessage('Phone invalid'),
    body('deadline')
      .not()
      .isEmpty()
      .isDate()
      .withMessage('Deadline date invalid'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('Description required'),
    body('realState')
      .not()
      .isEmpty()
      .withMessage('Real state required'),
    body('categoryId')
      .isNumeric()
      .withMessage('Category invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      company,
      contactName,
      contactPhone,
      deadline,
      description,
      realState,
      categoryId
    } = req.body;

    const updateOrderService = new UpdateOrderService();

    const order = await updateOrderService.execute({
      id: Number(id),
      company,
      contactName,
      contactPhone,
      deadline,
      description,
      realState,
      categoryId
    });

    res.status(200).send(order);
});

router.delete(
  '/api/order/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Order is invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteOrderService = new DeleteOrderService();

    await deleteOrderService.execute({ id: Number(id) });

    res.status(200).send();
});

export { router as orderRouter };
