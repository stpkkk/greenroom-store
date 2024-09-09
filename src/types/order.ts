export type OrderProduct = {
  productId: number;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};

export type OrderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  priorityPrice: number;
  priority: boolean;
  cart: OrderProduct[];
  status: string;
};
