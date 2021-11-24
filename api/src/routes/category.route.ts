import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

import { validateRequest } from '../common';
import { CreateCategoryService } from '../services/category/create.service';
import { GetAllCategoryService } from '../services/category/getall.service';
import { GetCategoryService } from '../services/category/get.service';
import { UpdateCategoryService } from '../services/category/update.service';
import { DeleteCategoryService } from '../services/category/delete.service';

const router = express.Router();

router.post(
  '/api/category',
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Category name required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    const newCategory = await createCategoryService.execute({ name });

    res.status(201).send(newCategory);
});

router.get(
  '/api/category/all',
  async (req: Request, res: Response) => {
    const listAllCategoriesService = new GetAllCategoryService();

    const categoriesList = await listAllCategoriesService.execute();

    res.status(200).send(categoriesList);
});

router.get(
  '/api/category/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Category id invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const getCategoriesService = new GetCategoryService();

    const category = await getCategoriesService.execute({ id: Number(id) });

    res.status(200).send(category);
});

router.put(
  '/api/category/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Category id invalid'),
    body('name')
      .not()
      .isEmpty()
      .withMessage('Category name required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const updateCategoriesService = new UpdateCategoryService();

    const category = await updateCategoriesService.execute({ id: Number(id), name });

    res.status(200).send(category);
});

router.delete(
  '/api/category/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Category id invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteCategoriesService = new DeleteCategoryService();

    await deleteCategoriesService.execute({ id: Number(id) });

    res.status(200).send();
});

export { router as categoryRouter };
