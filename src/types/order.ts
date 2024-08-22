type OrderProduct = {
	pizzaId: number
	name: string
	quantity: number
	totalPrice: number
	unitPrice: number
}

export type OrderType = {
	id: string
	customer: string
	phone: string
	address: string
	priority: boolean
	estimatedDelivery: Date
	cart: OrderProduct[]
	position: string
	orderPrice: number
	priorityPrice: number
}
