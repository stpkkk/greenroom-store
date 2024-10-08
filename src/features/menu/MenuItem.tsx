import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/helpers';

type MenuItemProps = {
  product: Product;
};

function MenuItem({ product }: MenuItemProps) {
  const { id, name, unitPrice, soldOut, image } = product;

  const renderPrice = () =>
    soldOut ? (
      <p className="text-md sm:text-md px-4 py-2 font-semibold uppercase opacity-50">
        Распродано
      </p>
    ) : (
      <p className="text-md sm:text-md px-4 py-2 font-semibold">
        {formatCurrency(unitPrice)}
      </p>
    );

  return (
    <li className="flex flex-col items-center justify-center gap-y-4">
      <Link to={`/menu/${id}`}>
        <img
          src={image}
          alt={name}
          className={`${soldOut ? 'opacity-70 grayscale' : ''} h-72 w-72 rounded-2xl bg-neutral-600 transition-opacity duration-300 hover:opacity-75`}
        />
      </Link>
      <Link to={`/menu/${id}`}>
        <p className="text-sm font-medium uppercase text-neutral-600 hover:underline hover:underline-offset-4">
          {name}
        </p>
      </Link>
      <div className="mt-auto flex items-center justify-between rounded-full bg-neutral-100 text-neutral-500">
        {renderPrice()}
      </div>
    </li>
  );
}

export default MenuItem;
