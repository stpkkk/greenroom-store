import { Product } from '../../types/product'
import { formatCurrency } from '../../utils/helpers'

type MenuItemProps = {
	product: Product
}

function MenuItem({ product }: MenuItemProps) {
	const { name, unitPrice, description, soldOut, image } = product

	return (
		<li>
			<img src={image} alt={name} />
			<div>
				<p>{name}</p>
				<p>{description}</p>
				<div>
					{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
				</div>
			</div>
		</li>
	)
}

export default MenuItem
