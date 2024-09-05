import { Product } from '../../types/product'
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

type MenuItemProps = {
  product: Product;
};

function MenuItem({ product }: MenuItemProps) {
  const { name, unitPrice, description, soldOut, image } = product;

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
            <p className="p-4 text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase opacity-50">
              Распродано
            </p>
          )}
          {!soldOut ? <Button style="small">Добавить в корзину</Button> : ''}
        </div>
      </div>
    </li>
  );
}

export default MenuItem
