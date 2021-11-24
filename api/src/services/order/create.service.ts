import { BadRequestError } from '../../common';
import { Order } from '@prisma/client';
import { parseISO, isAfter, startOfDay } from 'date-fns';

import { prismaClient } from '../../config/prisma.config';

type CreateOrderDTO = {
  contactName: string;
  contactPhone: string;
  realState: string
  description: string;
  company: string;
  deadline: string;
  categoryId: number;
}

class CreateOrderService {

  public async execute(dto: CreateOrderDTO): Promise<Order> {
    const today = new Date();

    if (isAfter(startOfDay(today), parseISO(dto.deadline))) {
      throw new BadRequestError(`Deadline can't be in the past`);
    }

    const validCategory = await prismaClient.category.findUnique({
      where: {
        id: dto.categoryId
      }
    });

    if (!validCategory) {
      throw new BadRequestError('Category not found');
    }

    try {
      const newOrder = await prismaClient.order.create({
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

      return newOrder;
    } catch {
      throw new BadRequestError('Error creating order');
    }
  }
}

export { CreateOrderService, CreateOrderDTO };
