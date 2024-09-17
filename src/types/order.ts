import { Product } from './product';

export type OrderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  deliveryPrice: number;
  delivery: boolean;
  cart: Partial<Product>[];
  status: string;
};
