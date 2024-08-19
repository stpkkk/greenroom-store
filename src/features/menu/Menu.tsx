import { LoaderFunction, useLoaderData } from 'react-router-dom'
import MenuItem from './MenuItem'
import { getProducts } from '../../services/apiGreenRoom'
import { Product } from '../../types/product'

export const loader: LoaderFunction = async (): Promise<Product[]> => {
	const products = await getProducts()
	return products
}

function Menu() {
	const products = useLoaderData() as Product[]

	return (
		<ul>
			{products.map(product => (
				<MenuItem key={product.id} product={product} />
			))}
		</ul>
	)
}

export default Menu
