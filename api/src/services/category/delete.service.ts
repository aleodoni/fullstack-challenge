import { BadRequestError } from '../../common';
import { prismaClient } from '../../config/prisma.config';

type DaleteCategoryDTO = {
  id: number;
}

class DeleteCategoryService {

  public async execute(dto: DaleteCategoryDTO): Promise<void> {
    const category = await prismaClient.category.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!category) {
      throw new BadRequestError('Category not found');
    }

    try {
      await prismaClient.category.delete({
        where: {
          id: dto.id,
        }
      });

    } catch {
      throw new BadRequestError('Error deleting category');
    }
  }
}

export { DeleteCategoryService, DaleteCategoryDTO };
