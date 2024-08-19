type OrderProduct = {
	name: string
	quantity: number
	totalPrice: number
}

export type Order = {
	item: OrderProduct
	isLoadingDescription: boolean
	description: string
}
