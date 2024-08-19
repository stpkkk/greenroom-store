import { productsData } from '../../data/products'
import MenuItem from './MenuItem'

function Menu() {
	return (
		<ul>
			{productsData.data.map(product => (
				<MenuItem product={product} />
			))}
		</ul>
	)
}

export default Menu
