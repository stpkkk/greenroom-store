import { Server } from 'miragejs'
import { productsData } from './data/products'
import { ordersData } from './data/orders'

export function makeServer() {
	new Server({
		routes() {
			this.urlPrefix = import.meta.env.VITE_API_URL
			this.namespace = 'api'

			this.get('/products', () => {
				return {
					products: productsData.data,
				}
			})

			this.get('/order/:orderId', (schema, request) => {
				const { orderId } = request.params
				const order = ordersData.find(order => order.id === orderId)

				return {
					order,
				}
			})
		},
	})
}
