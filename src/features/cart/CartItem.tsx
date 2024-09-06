import { CartItemType } from '../../types/cart-item';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice || 0)}</p>
        <Button style="small">Удалить</Button>
      </div>
    </li>
  );
}

export default CartItem;
