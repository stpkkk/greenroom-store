import { OrderType } from '../types/order';
import { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');

  const data = await res.json();
  return data.products;
}

export async function getOrder(id: string) {
  const res = await fetch(`/api/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();

  return data;
}

export async function createOrder(newOrder: OrderType) {
  try {
    const res = await fetch(`/api/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();

    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(
  orderId: string,
  updateObj: Pick<OrderType, 'delivery'>,
) {
  try {
    const res = await fetch(`/api/order/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
