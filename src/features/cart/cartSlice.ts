import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

type CartState = {
  cart: Partial<Product>[];
};

const initialState: CartState = {
  cart: [],
};
//   cart: [
//     {
//       id: 1555,
//       name: 'dfsf',
//       quantity: 2,
//       unitPrice: 666,
//       totalPrice: 1332,
//     },
//   ],
// };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Partial<Product>>) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item?.quantity && item.unitPrice) {
        item?.quantity + 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item?.quantity && item.unitPrice) {
        item?.quantity - 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: { cart: CartState }) => state.cart.cart;

export const getTotalCartQuantity = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

export const getTotalCartPrice = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

