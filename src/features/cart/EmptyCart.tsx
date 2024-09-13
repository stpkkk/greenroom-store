import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="space-y-4 px-4 py-3">
      <LinkButton to="/menu">&larr; Вернуться в каталог</LinkButton>

      <p className="font-semibold">Ваша корзина пуста! 😢</p>
    </div>
  );
}

export default EmptyCart;
