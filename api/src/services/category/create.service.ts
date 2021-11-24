import { BadRequestError } from '../../common';
import { Category } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type CreateCategoryDTO = {
  name: string;
}

class CreateCategoryService {

  public async execute(dto: CreateCategoryDTO): Promise<Category> {

    try {
      const newCategory = await prismaClient.category.create({
        data: {
          name: dto.name
        },
      });

      return newCategory;
    } catch {
      throw new BadRequestError('Error creating category');
    }
  }
}

export { CreateCategoryService, CreateCategoryDTO };
