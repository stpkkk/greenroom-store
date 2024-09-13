import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Вернуться в каталог</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Корзина{`, ${username}`}</h2>
      <ul className="mt-3 divide-y divide-neutral-500 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button style="primary" to="/order/new">
          Заказать растения
        </Button>
        <Button style="secondary" onClick={handleClearCart}>
          Очистить корзину
        </Button>
      </div>
    </div>
  );
}

export default Cart;
