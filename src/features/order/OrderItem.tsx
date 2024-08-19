import { Order } from '../../types/order'
import { formatCurrency } from '../../utils/helpers'

// function OrderItem({ item, isLoadingDescription, description }: Order)
function OrderItem({ item }: Order) {
	const { quantity, name, totalPrice } = item

	return (
		<li>
			<div>
				<p>
					<span>{quantity}&times;</span> {name}
				</p>
				<p>{formatCurrency(totalPrice)}</p>
			</div>
		</li>
	)
}

export default OrderItem
