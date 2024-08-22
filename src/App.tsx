import { RouterProvider } from 'react-router-dom'
import { productsData } from './data/products'
import { Server } from 'miragejs'
import { ordersData } from './data/orders'
import { router } from './Router'

new Server({
	routes() {
		//import.meta.env.VITE_API_URL - same as process.env.REACT_APP_API_URL;
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

function App() {
	return <RouterProvider router={router} />
}

export default App
