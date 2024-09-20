import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Error from './ui/Error'
import Menu, { loader as productsLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import Order, { loader as orderLoader } from './features/order/Order'
import CreateOrder from './features/order/CreateOrder'
import AppLayout from './ui/AppLayout'
import { productsData } from './data/products'
import { Server } from 'miragejs'
import { ordersData } from './data/orders'
import { action as updateOrderAction } from './features/order/UpdateOrder';

//import.meta.env.VITE_API_URL - same as process.env.REACT_APP_API_URL;

new Server({
  routes() {
    this.urlPrefix = import.meta.env.VITE_API_URL;
    this.namespace = 'api';

    this.get('/products', () => {
      return {
        products: productsData.data,
      };
    });

    this.get('/order/:orderId', (_schema, request) => {
      const { orderId } = request.params;
      const order = ordersData.find((order) => order.id === orderId);

      return {
        order,
      };
    });

    this.post('/order', (_schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      attrs.id = Math.floor(Math.random() * 10000).toString();
      attrs.estimatedDelivery = '2027-04-25T10:00:00';

      ordersData.push(attrs);

      return {
        data: attrs,
      };
    });

    this.patch('/order/:orderId', (_schema, request) => {
      const { orderId } = request.params;
      const updatedData = JSON.parse(request.requestBody);

      let order = ordersData.find((order) => order.id === orderId);

      if (order) {
        Object.assign(order, updatedData); // Update the order with new data
        return {
          order,
        };
      } else {
        return new Response();
      }
    });

    //Allow to get request from https://api.bigdatacloud.net
    this.passthrough('https://api.bigdatacloud.net/**');
  },
});

const router = createBrowserRouter([
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
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
	return <RouterProvider router={router} />
}

export default App
