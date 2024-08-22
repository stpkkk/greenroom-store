import { createBrowserRouter } from 'react-router-dom'
import Cart from './features/cart/Cart'
import Menu, { loader as productsLoader } from './features/menu/Menu'
import CreateOrder from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import AppLayout from './ui/AppLayout'
import Home from './ui/Home'
import Error from './ui/Error'

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,

		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/menu',
				element: <Menu />,
				loader: productsLoader,
				errorElement: <Error />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/order/new',
				element: <CreateOrder />,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
				loader: orderLoader,
				errorElement: <Error />,
			},
		],
	},
])
