import { CheckoutSchema } from "@/schema/checkout";
import { safeParse } from "valibot";

export const validateCheckout = (checkout) => {
  const result = safeParse(CheckoutSchema, checkout);
  return result;
};
