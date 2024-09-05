import { useLoaderData } from 'react-router-dom'
import MenuItem from './MenuItem'
import { getProducts } from '../../services/apiGreenRoom'
import { Product } from '../../types/product'

function Menu() {
	const products = useLoaderData() as Product[]

	return (
    <ul className="divide-y divide-neutral-500 px-2">
      {products.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export async function loader(): Promise<Product[]> {
	const products = await getProducts()
	return products
}

export default Menu
