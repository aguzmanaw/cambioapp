import { minLength, number, minValue, object, string } from "valibot";

export const CheckoutSchema = object({
  rateId: number("Por favor, elija una tasa del dia valida."),
  specialRate: number([
    minValue(0, "Por favor, intruduzca una tasa especial valida."),
  ]),
  rateType: string([
    minLength(1, "Por favor, introduzca un tipo de tasa valido."),
  ]),
  customerCurrency: string([minLength(1, "Por favor, una moneda valido.")]),
  businessCurrency: string([
    minLength(1, "Por favor, introduzca una moneda valido."),
  ]),
  rateAmount: number([
    minValue(0.01, "Por favor, introduzca una tasa valido."),
  ]),
  customerAmount: number([
    minValue(0.01, "Por favor, introduzca un monto valido."),
  ]),
});
