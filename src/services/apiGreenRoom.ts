import { Product } from '../types/product'

export async function getProducts(): Promise<Product[]> {
	const res = await fetch('/api/products')
	if (!res.ok) throw new Error('Failed to fetch products')

	const data = await res.json()
	return data.products
}

export async function getOrder(id: string) {
	const res = await fetch(`/api/order/${id}`)
	if (!res.ok) throw Error(`Couldn't find order #${id}`)

	const data = await res.json()

	return data
}
