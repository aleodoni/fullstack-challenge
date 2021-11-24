import { BadRequestError } from '../../common';
import { Category } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type GetCategoryDTO = {
  id: number,
}

class GetCategoryService {

  public async execute(dto: GetCategoryDTO): Promise<Category> {
    const category = await prismaClient.category.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!category) {
      throw new BadRequestError('Category not found');
    }

    return category;
  }
}

export { GetCategoryService, GetCategoryDTO };
