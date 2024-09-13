import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useAppSelector(getTotalCartQuantity);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-neutral-900 p-4 px-4 py-4 text-sm font-semibold uppercase text-neutral-300 sm:px-6 md:text-base">
      <p className="space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} товаров</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Корзина &rarr;</Link>
    </div>
  );
}

export default CartOverview
