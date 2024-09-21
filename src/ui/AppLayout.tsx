import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

//<Outlet /> - dynamic children from App/router,

function AppLayout() {
	const navigation = useNavigation()

	return (
    <div className="bg-home grid h-screen grid-rows-[auto_1fr_auto] bg-cover bg-fixed bg-center bg-no-repeat text-neutral-300">
      <Header />

      <div className="no-scrollbar overflow-scroll">
        <main className="mx-auto w-full max-w-3xl">
          {navigation.state === 'loading' ? <Loader /> : <Outlet />}
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout

