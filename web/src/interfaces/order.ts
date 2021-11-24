import { ICategory}  from './category';

export interface IOrder {
  id: number;
  category: ICategory;
  categoryId: number;
  contactName: string;
  contactPhone: string;
  contactAndPhone: string;
  realState: string;
  company: string;
  deadline: Date;
  description: string;
};
