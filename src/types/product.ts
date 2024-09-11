export type Product = {
  id: number;
  name: string;
  unitPrice: number;
  image: string;
  description: string;
  soldOut: boolean;
  quantity: number;
  totalPrice: number;
};

export type ProductDataType = {
	status: string
	data: Product[]
}
