import { useLoaderData } from 'react-router-dom'
import MenuItem from './MenuItem'
import { getProducts } from '../../services/apiGreenRoom'
import { Product } from '../../types/product';

function Menu() {
  const products = useLoaderData() as Product[];

  return (
    <div className="bg-neutral-100 p-4">
      <h1 className="my-4 flex justify-center text-xl font-semibold text-neutral-600 md:my-6 md:text-3xl">
        Комнатные растения в горшках
      </h1>
      <ul className="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 mt-10 grid w-full grid-cols-1 gap-y-6">
        {products.map((product) => (
          <MenuItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export async function loader(): Promise<Product[]> {
  const products = await getProducts();
  return products;
}

export default Menu
