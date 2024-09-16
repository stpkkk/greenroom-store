import { useAppSelector } from '../../redux/hooks';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/helpers';
import { getCurrentQuantityById } from './cartSlice';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

type CartItemProps = {
  item: Partial<Product>;
};

function CartItem({ item }: CartItemProps) {
  const { id, name, quantity, totalPrice } = item;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id));

  return (
    <li className="sm:flex sm:items-center sm:justify-between py-3">
      <p className="sm:mb-0 mb-1">
        {quantity}&times; {name}
      </p>
      <div className="sm:gap-6 flex items-center justify-between">
        <p className="text-sm font-bold">{formatCurrency(totalPrice || 0)}</p>
        <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        <DeleteItem id={id} />
      </div>
    </li>
  );
}

export default CartItem;
