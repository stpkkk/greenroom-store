import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

function AppLayout() {
	const navigation = useNavigation()

	return (
    <div className="layout bg-neutral-950 text-neutral-300">
      <Header />
      <main>{navigation.state === 'loading' ? <Loader /> : <Outlet />}</main>
      <CartOverview />
    </div>
  );
}

export default AppLayout

//Outlet - dynamic children from App/router,
