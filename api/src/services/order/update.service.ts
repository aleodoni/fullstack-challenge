import { BadRequestError } from '../../common';
import { parseISO, isAfter } from 'date-fns';
import { Order } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type UpdateOrderDTO = {
  id: number;
  contactName: string;
  contactPhone: string;
  realState: string
  description: string;
  company: string;
  deadline: string;
  categoryId: number;
}

class UpdateOrderService {

  public async execute(dto: UpdateOrderDTO): Promise<Order> {
    const today = new Date();

    if (isAfter(today, parseISO(dto.deadline))) {
      throw new BadRequestError(`Deadline can't be in the past`);
    }

    const order = await prismaClient.order.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    const category = await prismaClient.category.findUnique({
      where: {
        id: dto.categoryId
      }
    });

    if (!category) {
      throw new BadRequestError('Category not found');
    }

    try {
      const updatedOrder = await prismaClient.order.update({
        where: {
          id: dto.id,
        },
        data: {
          company: dto.company,
          contactName: dto.contactName,
          contactPhone: dto.contactPhone,
          deadline: parseISO(dto.deadline),
          description: dto.description,
          realState: dto.realState,
          categoryId: dto.categoryId
        },
      });

      return updatedOrder;
    } catch {
      throw new BadRequestError('Error updating order');
    }
  }
}

export { UpdateOrderService, UpdateOrderDTO };
