import { Order } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

class GetAllOrderService {

  public async execute(): Promise<Order[]> {
    const orders = await prismaClient.order.findMany({
      orderBy: {
        deadline: 'asc'
      },
      include: {
        category: true
      }
    });

    return orders;
  }
}

export { GetAllOrderService };
