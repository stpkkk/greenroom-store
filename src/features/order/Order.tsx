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
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Заказ №{id}</h2>

        <div className="space-x-2">
          {delivery && (
            <span className="text-red-50 px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-red-500 rounded-full">
              Доставка
            </span>
          )}
          <span className="text-green-50 px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-green-500 rounded-full">
            Заказ {status}
          </span>
        </div>
      </div>

      <ul className="divide-neutral-400 text-neutral-100 py-4 divide-y">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="bg-neutral-100 text-neutral-700 flex flex-wrap items-center justify-between gap-2 px-6 py-5">
        <p className="sm:text-base text-sm font-medium">
          {deliveryIn >= 0
            ? `Осталось ${calcMinutesLeft(estimatedDelivery)} минут 😃`
            : 'Заказ доставлен'}
        </p>
        <p className="text-neutral-800 text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="bg-neutral-100 text-neutral-700 px-6 py-5 space-y-2">
        <p className="text-neutral-700 text-sm font-medium">
          Стоимость: {formatCurrency(orderPrice)}
        </p>
        {delivery && (
          <p className="text-neutral-700 text-sm font-medium">
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
