import { Params, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiGreenRoom'
import { OrderType } from '../../types/order'
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from '../../utils/helpers'
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { clearCart } from '../cart/cartSlice';

type OrderData = {
  order: OrderType;
};

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const dispatch = useAppDispatch();
  const { order } = useLoaderData() as OrderData;

  const {
    id,
    // customer,
    // phone,
    // address,
    delivery,
    estimatedDelivery,
    cart,
    // position,
    status,
    orderPrice,
    deliveryPrice,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Заказ №{id}</h2>

        <div className="space-x-2">
          {delivery && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Приоритет
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            Заказ {status}
          </span>
        </div>
      </div>

      <ul className="divide-y divide-neutral-400 py-4 text-neutral-100">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-100 px-6 py-5 text-neutral-700">
        <p className="text-sm font-medium sm:text-base">
          {deliveryIn >= 0
            ? `Осталось ${calcMinutesLeft(estimatedDelivery)} минут 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-neutral-800">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="space-y-2 bg-neutral-100 px-6 py-5 text-neutral-700">
        <p className="text-sm font-medium text-neutral-700">
          Стоимость: {formatCurrency(orderPrice)}
        </p>
        {delivery && (
          <p className="text-sm font-medium text-neutral-700">
            Стоимость доставки: {formatCurrency(+deliveryPrice)}
          </p>
        )}
        <p className="font-bold">
          Итого:{' '}
          {formatCurrency(delivery ? orderPrice + +deliveryPrice : orderPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({
	params,
}: {
	params: Params<'orderId'>
}): Promise<OrderType[]> {
	const order = await getOrder(params.orderId ?? '')

	return order
}

export default Order
