import { Product } from "@/payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => addProductToCart(set, product),
      removeItem: (id) => removeProductFromCart(set, id),
      clearCart: () => clearItemsFromCart(set),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function addProductToCart(
  set: (
    partial:
      | CartState
      | Partial<CartState>
      | ((state: CartState) => CartState | Partial<CartState>),
    replace?: boolean | undefined
  ) => void,
  product: Product
): void {
  return set((state) => {
    return { items: [...state.items, { product }] };
  });
}

function removeProductFromCart(
  set: (
    partial:
      | CartState
      | Partial<CartState>
      | ((state: CartState) => CartState | Partial<CartState>),
    replace?: boolean | undefined
  ) => void,
  id: string
): void {
  return set((state) => ({
    items: state.items.filter((item) => item.product.id !== id),
  }));
}

function clearItemsFromCart(
  set: (
    partial:
      | CartState
      | Partial<CartState>
      | ((state: CartState) => CartState | Partial<CartState>),
    replace?: boolean | undefined
  ) => void
): void {
  return set({ items: [] });
}


