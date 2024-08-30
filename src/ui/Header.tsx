import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from './Username';

export default function Header() {
  return (
    <header className="border-b border-neutral-500 bg-neutral-900 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        GreenRoom
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
