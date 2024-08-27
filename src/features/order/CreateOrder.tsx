import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { createOrder } from '../../services/apiGreenRoom'
import { OrderProduct, OrderType } from '../../types/order'

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
]

const CreateOrder: React.FC = () => {
	const [withPriority, setWithPriority] = useState<boolean>(false)
	const navigate = useNavigate()
	const cart = fakeCart

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const data = Object.fromEntries(formData.entries()) as {
			customer: string
			phone: string
			address: string
			priority: string
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
		}

		try {
			const newOrder = await createOrder(order)

			if (!newOrder.id) throw new Error('Invalid order ID')

			navigate(`/order/${newOrder.id}`)
		} catch (error) {
			console.error('Error creating order:', error)
			navigate('/error')
		}
	}

	return (
		<div>
			<h2>Ready to order? Let's go!</h2>
			<Form method='post' onSubmit={handleSubmit}>
				<div>
					<label>First Name</label>
					<input type='text' name='customer' required />
				</div>

				<div>
					<label>Phone number</label>
					<div>
						<input type='tel' name='phone' required />
					</div>
				</div>

				<div>
					<label>Address</label>
					<div>
						<input type='text' name='address' required />
					</div>
				</div>

				<div>
					<input
						type='checkbox'
						name='priority'
						id='priority'
						onChange={e => setWithPriority(e.target.checked)}
					/>
					<label htmlFor='priority'>Want to give your order priority?</label>
				</div>

				<div>
					<input type='hidden' name='cart' value={JSON.stringify(cart)} />
					<button type='submit'>Order now</button>
				</div>
			</Form>
		</div>
	)
}

export default CreateOrder
