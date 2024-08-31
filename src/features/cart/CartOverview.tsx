import { Link } from 'react-router-dom'

function CartOverview() {
	return (
    <div className="bg-neutral-900 p-4 px-4 py-4 text-sm uppercase text-neutral-300 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview
