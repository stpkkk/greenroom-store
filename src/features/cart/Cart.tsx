import { useAppSelector } from '../../redux/hooks';
import { CartItemType } from '../../types/cart-item';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';

const fakeCart: CartItemType[] = [
  {
    id: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    id: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    id: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const { username } = useAppSelector((state) => state.user);
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Вернуться в каталог</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Корзина, {username}</h2>

      <ul className="mt-3 divide-y divide-neutral-500 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button style="primary" to="/order/new">
          Заказать растения
        </Button>
        <Button style="secondary">Очистить корзину</Button>
      </div>
    </div>
  );
}

export default Cart;
