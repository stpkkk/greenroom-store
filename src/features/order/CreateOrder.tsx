import React, { useState } from 'react'
import { Form, useNavigate, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiGreenRoom'
import { OrderType } from '../../types/order';
import Button from '../../ui/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

type FormDataType = {
  customer: string;
  phone: string;
  address: string;
  delivery: string;
};

type FormErrorsType = {
  phone?: string;
};

const CreateOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username, address } = useAppSelector((state) => state.user);

  const [withDelivery, setWithDelivery] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const deliveryPrice = 500;
  const totalPrice = withDelivery
    ? totalCartPrice + +deliveryPrice
    : totalCartPrice;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as FormDataType;

    // Clear previous errors
    setFormErrors({});

    const errors: FormErrorsType = {};

    // Validate phone number
    if (!isValidPhone(data.phone)) {
      errors.phone = 'Укажите номер в формате +79999999999';
    }

    // If there are any errors, update state and exit early
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const order: OrderType = {
      id: '',
      customer: username,
      phone: data.phone,
      address: data.address,
      estimatedDelivery: '',
      position: '',
      orderPrice: totalPrice,
      deliveryPrice,
      delivery: withDelivery,
      status: 'Собирается',
      cart,
    };

    try {
      const newOrder = await createOrder(order);

      navigate(`/order/${newOrder.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!cart.length) return <EmptyCart />;

  //defaultValue - instead 'value', value that we can change in input, not hardcoded

  return (
    <div className="px-6 py-4">
      <h2 className="mb-8 text-xl font-semibold">Готовы оформить заказ?</h2>

      <Form method="post" onSubmit={handleSubmit}>
        <div className="sm:flex-row sm:items-center flex flex-col gap-2 mb-5">
          <label className="sm:basis-40 sm:text-base text-sm">Ваше Имя:</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              placeholder="Ваше имя"
              required
            />
          </div>
        </div>

        <div className="sm:flex-row sm:items-center flex flex-col gap-2 mb-5">
          <label className="sm:basis-40 sm:text-base text-sm">Телефон:</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              required
            />
            {formErrors.phone && (
              <p className="rounded-xl px-4 py-2 mt-2 text-xs text-red-500 bg-red-100">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {withDelivery && (
          <div className="sm:flex-row sm:items-center relative flex flex-col gap-2 mb-5">
            <label className="sm:basis-40 sm:text-base text-sm">Адрес:</label>
            <div className="grow">
              <input
                className="input w-full"
                type="text"
                value={address}
                name="address"
                placeholder="Куда доставить заказ"
                required
              />
              <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                <Button
                  onClick={() => dispatch(fetchAddress())}
                  style="small"
                  type="button"
                >
                  Геолокация
                </Button>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-5 mb-12">
          <input
            className="size-6 accent-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
            type="checkbox"
            name="delivery"
            id="delivery"
            onChange={(e) => setWithDelivery(e.target.checked)}
          />
          <label htmlFor="delivery" className="font-medium">
            Добавить доставку?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button style="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Размещаем заказ...'
              : `Заказать сейчас за ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder;