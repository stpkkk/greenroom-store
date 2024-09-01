import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

//Outlet - dynamic children from App/router,

function AppLayout() {
	const navigation = useNavigation()

	return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-neutral-950 text-neutral-300">
      <Header />
      <div className="overflow-scroll">
        <main className='no-scrollbar max-w-3xl mx-auto overflow-scroll'>{navigation.state === 'loading' ? <Loader /> : <Outlet />}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout

