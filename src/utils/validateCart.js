import { CartSchema } from "@/schema/cart";
import { safeParse } from "valibot";

export const validateCart = (cart) => {
  const result = safeParse(CartSchema, cart);
  return result;
};
