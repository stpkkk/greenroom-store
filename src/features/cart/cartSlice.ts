import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

type CartState = {
  cart: Partial<Product>[];
};

const initialState: CartState = {
  cart: [],
};

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
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item?.quantity && item.unitPrice) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
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

export const getTotalCartPrice = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

export const getTotalCartQuantity = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

export const getCurrentQuantityById =
  (id?: number) => (state: { cart: CartState }) =>
    state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;