// Test ID: IIDSAT

import { Params, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiGreenRoom'
import { OrderType } from '../../types/order'
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from '../../utils/helpers'

type OrderData = {
	order: OrderType
}

function Order() {
	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

	const { order } = useLoaderData() as OrderData

	const {
		id,
		customer,
		phone,
		address,
		priority,
		estimatedDelivery,
		cart,
		position,
		orderPrice,
		priorityPrice,
	} = order

	const deliveryIn = calcMinutesLeft(estimatedDelivery)

	return (
		<div>
			<div>
				<h2>Status</h2>

				<div>
					{priority && <span>Priority</span>}
					<span>{status} order</span>
				</div>
			</div>

			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: 'Order should have arrived'}
				</p>
				{/* <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p> */}
			</div>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && <p>Price priority: {formatCurrency(+priorityPrice)}</p>}
				<p>To pay on delivery: {formatCurrency(orderPrice + +priorityPrice)}</p>
			</div>
		</div>
	)
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
