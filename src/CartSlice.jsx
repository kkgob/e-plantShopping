import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const itemExists = state.items.find((item) => item.name === action.payload.name);
      if (itemExists) {
        // If item already exists, increase its quantity
        itemExists.quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    // Remove an item from the cart
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.name === action.payload.name);
      if (index !== -1) {
        state.items.splice(index, 1); // Remove item from the array
      }
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity; // Update quantity
        if (item.quantity <= 0) {
          // Remove the item if quantity is 0 or less
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
