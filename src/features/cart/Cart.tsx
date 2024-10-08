import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import { formatCurrency } from '../../utils/helpers';
import CartItem from './CartItem';
import { clearCart, getCart, getTotalCartPrice } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="wrapper flex flex-col justify-start sm:justify-center">
      <div className="flex flex-col items-start gap-2">
        <LinkButton to="-1">&larr; Назад</LinkButton>
        <LinkButton to="/menu">Вернуться в каталог</LinkButton>
      </div>
      <h2 className="mt-7 text-xl font-semibold">Корзина{`, ${username}`}</h2>
      <ul className="mt-3 divide-y divide-neutral-500 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="py-2 text-right text-xl font-bold">
        Итого: {formatCurrency(totalCartPrice)}
      </div>
      <div className="mt-6 space-x-1 sm:space-x-2">
        <Button style="primary" to="/order/new">
          Заказать
        </Button>
        <Button style="secondary" onClick={handleClearCart}>
          Очистить
        </Button>
      </div>
    </div>
  );
}

export default Cart;
