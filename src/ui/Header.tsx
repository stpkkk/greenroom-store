import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'

export default function Header() {
	return (
    <header className="bg-neutral-900">
      <Link to="/">GreenRoom</Link>
      <SearchOrder />
    </header>
  );
}
