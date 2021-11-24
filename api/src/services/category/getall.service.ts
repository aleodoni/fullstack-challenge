import { Category } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

class GetAllCategoryService {

  public async execute(): Promise<Category[]> {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return categories;
  }
}

export { GetAllCategoryService };
