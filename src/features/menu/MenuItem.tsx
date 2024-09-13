import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { Product } from '../../types/product';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../cart/cartSlice';

type MenuItemProps = {
  product: Product;
};

function MenuItem({ product }: MenuItemProps) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const { id, name, unitPrice, description, soldOut, image } = product;

  function handleAddToCart() {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    dispatch(addItem(newItem));
  }

  function handleDecrementQuantity() {
    setQuantity(quantity);
    dispatch(decreaseItemQuantity(quantity));
  }

  function handleIncrementQuantity() {
    setQuantity(quantity);
    dispatch(increaseItemQuantity(quantity));
  }

  return (
    <li className="flex flex-col items-center gap-4 py-2 sm:flex-row">
      <img
        src={image}
        alt={name}
        className={`${soldOut ? 'opacity-70 grayscale' : ''} h-72 w-72`}
      />
      <div className="flex grow flex-col gap-2 pt-0.5">
        <p className="font-medium uppercase">{name}</p>
        <p className="text-sm italic opacity-90">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="p-4 text-sm font-medium">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="p-4 text-sm font-medium uppercase opacity-50">
              Распродано
            </p>
          )}
          {!soldOut ? (
            <>
              <Button style="small" onClick={handleAddToCart}>
                Добавить в корзину
              </Button>
              <div className="flex items-center justify-between gap-2">
                <Button style="small" onClick={handleDecrementQuantity}>
                  -
                </Button>
                <span>{quantity}</span>
                <Button style="small" onClick={handleIncrementQuantity}>
                  +
                </Button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
