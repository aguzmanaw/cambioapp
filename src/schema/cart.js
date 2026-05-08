import { minLength, number, object, string } from "valibot";

export const CartSchema = object({
  customerId: number("Por favor, elija un cliente valido."),
  dni: string([minLength(1, "Por favor, intruduzca un DNI valido.")]),
  firstname: string([minLength(1, "Por favor, introduzca un nombre valido.")]),
  lastname: string([minLength(1, "Por favor, introduzca un apellido valido.")]),
  countryName: string([minLength(1, "Por favor, elija un pais valido.")]),
  customerAccountCode: string([
    minLength(1, "Por favor, introduzca un codigo valido."),
  ]),
  customerAccountName: string([
    minLength(1, "Por favor, introduzca un nombre de cuenta valido."),
  ]),
  description: string([
    minLength(1, "Por favor, introduzca una descripción valido."),
  ]),
});
