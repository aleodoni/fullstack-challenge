import { BadRequestError } from '../../common';
import { Category } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type UpdateCategoryDTO = {
  id: number;
  name: string;
}

class UpdateCategoryService {

  public async execute(dto: UpdateCategoryDTO): Promise<Category> {
    const category = await prismaClient.category.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!category) {
      throw new BadRequestError('Category not found');
    }

    try {
      const updatedCategory = await prismaClient.category.update({
        where: {
          id: dto.id,
        },
        data: {
          name: dto.name,
        },
      });

      return updatedCategory;
    } catch {
      throw new BadRequestError('Error updating category');
    }
  }
}

export { UpdateCategoryService, UpdateCategoryDTO };
