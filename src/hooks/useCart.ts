import { useCallback } from "react";
import { useAppDispatch, useAppSelector, addToCart, removeFromCart, updateQuantity, clearCart } from "../store";
import { Product } from "../types";

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const add = useCallback(
    (product: Product, sizeId: number, sizeName: string, quantity: number = 1) => {
      dispatch(addToCart({ product, size_id: sizeId, size_name: sizeName, quantity }));
    },
    [dispatch]
  );

  const remove = useCallback(
    (productId: number, sizeId: number) => {
      dispatch(removeFromCart({ productId, sizeId }));
    },
    [dispatch]
  );

  const update = useCallback(
    (productId: number, sizeId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, sizeId, quantity }));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, add, remove, update, clear, total, itemCount };
}
