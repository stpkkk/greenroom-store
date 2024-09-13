import { useAppDispatch } from '../../redux/hooks';
import { Product } from '../../types/product';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem } from './cartSlice';

type CartItemProps = {
  item: Partial<Product>;
};

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { id, name, quantity, totalPrice } = item;

  function handleDeleteFromCart() {
    if (id) {
      dispatch(deleteItem(id));
    }
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice || 0)}</p>
        <Button style="small" onClick={handleDeleteFromCart}>
          Удалить
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
