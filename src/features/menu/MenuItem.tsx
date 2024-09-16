import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Product } from '../../types/product';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

type MenuItemProps = {
  product: Product;
};

function MenuItem({ product }: MenuItemProps) {
  const dispatch = useAppDispatch();
  const { id, name, unitPrice, description, soldOut, image } = product;
  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  };

  const renderPrice = () =>
    soldOut ? (
      <p className="p-4 text-sm font-medium uppercase opacity-50">Распродано</p>
    ) : (
      <p className="p-4 text-sm font-medium">{formatCurrency(unitPrice)}</p>
    );

  const renderCartControls = () =>
    isInCart ? (
      <div className="sm:gap-8 flex items-center justify-between gap-3">
        <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        <DeleteItem id={id} />
      </div>
    ) : (
      <Button style="small" onClick={handleAddToCart}>
        Добавить в корзину
      </Button>
    );

  return (
    <li className="sm:flex-row flex flex-col items-center gap-4 py-2">
      <img
        src={image}
        alt={name}
        className={`${soldOut ? 'opacity-70 grayscale' : ''} h-72 w-72`}
      />
      <div className="flex grow flex-col gap-2 pt-0.5">
        <p className="font-medium uppercase">{name}</p>
        <p className="opacity-90 text-sm italic">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          {renderPrice()}
          {!soldOut && <div className="flex">{renderCartControls()}</div>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
