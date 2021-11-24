import { BadRequestError } from '../../common';
import { Order } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type GetOrderDTO = {
  id: number,
}

class GetOrderService {

  public async execute(dto: GetOrderDTO): Promise<Order> {
    const order = await prismaClient.order.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    return order;
  }
}

export { GetOrderService, GetOrderDTO };
