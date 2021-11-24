import { BadRequestError } from '../../common';
import { prismaClient } from '../../config/prisma.config';

type DaleteOrderDTO = {
  id: number;
}

class DeleteOrderService {

  public async execute(dto: DaleteOrderDTO): Promise<void> {
    const order = await prismaClient.order.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    try {
      await prismaClient.order.delete({
        where: {
          id: dto.id,
        }
      });

    } catch {
      throw new BadRequestError('Error deleting order');
    }
  }
}

export { DeleteOrderService, DaleteOrderDTO };
