import React, { useState } from 'react'
import { Form, useNavigate, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiGreenRoom'
import { OrderProduct, OrderType } from '../../types/order'
import Button from '../../ui/Button';
import { useAppSelector } from '../../redux/hooks';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

type FormDataType = {
  customer: string;
  phone: string;
  address: string;
  priority: string;
};

type FormErrorsType = {
  phone?: string;
};

const fakeCart: OrderProduct[] = [
  {
    productId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 701,
    totalPrice: 700,
  },
  {
    productId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 851,
    totalPrice: 850,
  },
  {
    productId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 1000,
    totalPrice: 999,
  },
];

const CreateOrder: React.FC = () => {
  const { username } = useAppSelector((state) => state.user);

  // const [withPriority, setWithPriority] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const cart = fakeCart;

  // console.log('withPriority:', withPriority);

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
      orderPrice: 666,
      priorityPrice: 200,
      priority: data.priority === 'on',
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

  //defaultValue - instead 'value', value that we can change in input, not hardcoded

  return (
    <div className="px-6 py-4">
      <h2 className="mb-8 text-xl font-semibold">Готовы оформить заказ?</h2>
      <Form method="post" onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:basis-40 sm:text-base">Ваше Имя:</label>
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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:basis-40 sm:text-base">Телефон:</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              required
            />
            {formErrors.phone && (
              <p className="mt-2 rounded-xl bg-red-100 px-4 py-2 text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:basis-40 sm:text-base">Адрес:</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              placeholder="Куда доставить заказ"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="size-6 accent-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Ускорить доставку ?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button style="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Размещаем заказ...' : 'Заказать сейчас'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder
