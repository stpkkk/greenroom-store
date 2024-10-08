import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

//<Outlet /> - dynamic children from App/router,

function AppLayout() {
	const navigation = useNavigation()

	return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-home bg-cover bg-fixed bg-center bg-no-repeat text-neutral-300">
      <Header />

      <div className="no-scrollbar overflow-scroll">
        <main className="mx-auto w-full max-w-7xl">
          {navigation.state === 'loading' ? <Loader /> : <Outlet />}
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout

