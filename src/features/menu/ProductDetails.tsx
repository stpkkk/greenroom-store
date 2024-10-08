import { useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import DeleteItem from '../cart/DeleteItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import LinkButton from '../../ui/LinkButton';

function ProductDetails() {
  const dispatch = useAppDispatch();
  let { productId } = useParams();
  const products = useLoaderData() as Product[];
  if (!productId) return null;

  const product = products.find((product) => product.id === +productId);
  if (!product || !productId) return null;

  const { id, name, unitPrice, description, soldOut, image } = product;
  const currentQuantity = useAppSelector(getCurrentQuantityById(+productId));
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
      <p className="text-lg font-semibold uppercase text-red-500">Распродано</p>
    ) : (
      <p className="text-2xl font-bold">{formatCurrency(unitPrice)}</p>
    );

  const renderCartControls = () =>
    isInCart ? (
      <div className="flex items-center gap-4">
        <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        <DeleteItem id={id} />
      </div>
    ) : (
      <Button style="primary" onClick={handleAddToCart}>
        Добавить в корзину
      </Button>
    );

  return (
    <div className="wrapper container mx-auto px-4 py-6">
      <div className="mb-4">
        <LinkButton to="-1">&larr; Вернуться в каталог</LinkButton>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={image || '/placeholder.svg'}
            alt={name}
            className="h-full w-full cursor-pointer object-cover transition-opacity duration-300 hover:opacity-75"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-2 rounded-lg bg-neutral-200 p-2 text-3xl font-bold text-neutral-600">
              {name}
            </h1>
            <div className="mb-4 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-400">
                4.5 (24 отзыва)
              </span>
            </div>
            {renderPrice()}
            <p className="mt-4 text-sm text-gray-200">{description}</p>
          </div>
          <div className="mt-8">
            {soldOut ? (
              <span className="py-4">
                На данный момент этого товара нет в наличии, но скоро он
                появиться в продаже!
              </span>
            ) : (
              renderCartControls()
            )}
            {!soldOut && (
              <p className="mt-2 text-sm text-gray-200">
                Бесплатная доставка при заказе от {formatCurrency(5000)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
