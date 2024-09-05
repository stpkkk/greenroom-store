import React, { useState } from 'react'
import { Form, useNavigate, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiGreenRoom'
import { OrderProduct, OrderType } from '../../types/order'
import Button from '../../ui/Button';

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
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

const CreateOrder: React.FC = () => {
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
      errors.phone = 'Please provide a valid phone number.';
    }

    // If there are any errors, update state and exit early
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const order: OrderType = {
      id: '',
      customer: data.customer,
      phone: data.phone,
      address: data.address,
      estimatedDelivery: '',
      position: '',
      orderPrice: 666,
      priorityPrice: 666,
      priority: data.priority === 'on',
      cart,
    };

    try {
      const newOrder = await createOrder(order);

      navigate(`/order/${newOrder.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="p-2">
      <h2>Готовы оформить заказ?</h2>
      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label>Ваше Имя:</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Телефон:</label>
          <div>
            <input className="input" type="tel" name="phone" required />
            {formErrors.phone && (
              <p style={{ color: 'red' }}>{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label>Адрес:</label>
          <div>
            <input
              className="input"
              type="text"
              name="address"
              placeholder="Куда доставить заказ?"
              required
            />
          </div>
        </div>

        <div>
          <input
            className="size-6 accent-neutral-500 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Ускорить доставку ?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Размещаем заказ...' : 'Заказать сейчас'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder
