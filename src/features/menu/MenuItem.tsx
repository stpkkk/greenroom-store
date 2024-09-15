import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Product } from '../../types/product';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';

type MenuItemProps = {
  product: Product;
};

function MenuItem({ product }: MenuItemProps) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const { id, name, unitPrice, description, soldOut, image } = product;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

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
            <div className="flex">
              {isInCart ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <Button style="small" onClick={handleDecrementQuantity}>
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button style="small" onClick={handleIncrementQuantity}>
                      +
                    </Button>
                    <DeleteItem id={id} />
                  </div>
                  <div />
                </>
              ) : (
                <Button style="small" onClick={handleAddToCart}>
                  Добавить в корзину
                </Button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
