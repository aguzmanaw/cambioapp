export const drawerWidth = 205;

export const baseURL = import.meta.env.VITE_BASE_URL;
export const CURRENCY = import.meta.env.VITE_CURRENCY;

export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const FILTER_CUSTOMERS = "FILTER_CUSTOMERS";

export const FETCH_USERS = "FETCH_USERS";
export const CREATE_USER = "CREATE_USER";
export const FILTER_USERS = "FILTER_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export const FETCH_LOGIN = "FETCH_LOGIN";
export const FETCH_LOGOUT = "FETCH_LOGOUT";

export const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const FILTER_ACCOUNTS = "FILTER_ACCOUNTS";
export const PAYMENT_ACCOUNTS = "PAYMENT_ACCOUNTS";
export const RECEIPT_ACCOUNTS = "RECEIPT_ACCOUNTS";

export const FETCH_RATES = "FETCH_RATES";
export const FILTER_RATES = "FILTER_RATES";
export const CREATE_RATE = "CREATE_RATE";
export const UPDATE_RATE = "UPDATE_RATE";

export const FETCH_EXCHANGES = "FETCH_EXCHANGES";
export const CREATE_EXCHANGE = "CREATE_EXCHANGE";
export const FILTER_EXCHANGES = "FILTER_EXCHANGES";

export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_ORDER = "FETCH_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const FETCH_RECEIVABLE_ORDER = "FETCH_RECEIVABLE_ORDER";
export const FETCH_PAYABLE_ORDER = "FETCH_PAYABLE_ORDER";

export const FETCH_PAYMENTS = "FETCH_PAYMENTS";
export const FETCH_PAYMENT = "FETCH_PAYMENT";
export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const FETCH_FILTER_PAYMENT = "FETCH_FILTER_PAYMENT";
export const FETCH_PAYMENT_RECEIPT = "FETCH_PAYMENT_RECEIPT";
export const REMOVE_PAYMENT_RECEIPT = "REMOVE_PAYMENT_RECEIPT";

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

export const ActionType = (function () {
  return {
    ADD: "ADD",
    DELETE: "DELETE",
    UPDATE: "UPDATE",
    SHOW: "SHOW",
    LIST: "LIST",
    ADD_GROUP: "ADD_GROUP",
  };
})();

export const CONTACT_SUPPORT =
  "Por favor, contacte al equipo de soporte técnico";
export const MISSING_REQUIRED_FIELDS =
  "Por favor, revise si está llenado todos los campos requeridos!";

export const ACCOUNT_CREATE_SUCCESSFULLY = "Cuenta creada satisfactoriamente.";
export const ACCOUNT_UPDATE_SUCCESSFULLY =
  "Cuenta actualizada satisfactoriamente.";
export const ACCOUNT_DELETE_SUCCESSFULLY =
  "Cuenta actualizada satisfactoriamente.";
export const ACCOUNT_DELETE_FAILED = "No se puede eliminar la Cuenta.";

export const EXCHANGE_CREATE_SUCCESSFULLY =
  "Tipo de Cambio creado satisfactoriamente.";
export const EXCHANGE_CREATE_FAILED =
  "El tipo de cambio entre Monedas no existe.";
export const EXCHANGE_CREATE_NOT_FOUND =
  "El Tipo de Cambio seleccionado no existe.";
export const EXCHANGE_UPDATE_SUCCESSFULLY =
  "Tipo de cambio actualizado satisfactoriamente.";
export const EXCHANGE_DELETE_SUCCESSFULLY =
  "Tipo de cambio actualizado satisfactoriamente.";

export const RATE_CREATE_SUCCESSFULLY = "Tasa creada satisfactoriamente.";
export const RATE_UPDATE_SUCCESSFULLY = "Tasa actualizado satisfactoriamente.";
export const RATE_DELETE_SUCCESSFULLY = "Tasa creada satisfactoriamente.";

export const PURCHASE = "PURCHASE";
export const PURCHASE_STEPPER = "PURCHASE_STEPPER";

export const ORDER_CREATE_SUCCESSFULLY = "Operación creada satisfactoriamente.";
export const ORDER_UPDATE_SUCCESSFULLY =
  "Operación actualizada satisfactoriamente.";
export const ORDER_UPDATE_FAILED =
  "Solo se pueden usar tasas creadas el dia de hoy.";
export const ORDER_DELETE_SUCCESSFULLY =
  "Operación actualizada satisfactoriamente.";

export const CUSTOMER_CREATE_SUCCESSFULLY =
  "Cliente creado satisfactoriamente.";
export const CUSTOMER_UPDATE_SUCCESSFULLY =
  "Cliente actualizado satisfactoriamente.";

export const TRANSACTION_CREATE_SUCCESSFULLY =
  "Transacción creado satisfactoriamente.";

export const USER_CREATE_SUCCESSFULLY = "Usuario creado satisfactoriamente.";
export const USER_DELETE_SUCCESSFULLY = "Usuario eliminado satisfactoriamente.";
export const PASSWORD_CONFIRMATION_MISMATCH =
  "La contraseña y la confirmación de la contraseña no coinciden.";

export const PAYMENT_CREATE_SUCCESSFULLY = "Pago creado satisfactoriamente.";
export const PAYMENT_UPDATE_SUCCESSFULLY =
  "Pago actualizado satisfactoriamente.";
export const PAYMENT_DELETE_SUCCESSFULLY = "Pago eliminado satisfactoriamente.";

export const ERROR = "error";
export const WARNING = "warning";
export const INFO = "info";
export const SUCCESS = "success";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILE_COUNT = 1;

export const MAX_INTEGER_PART = 999999999999999;
export const MIN_DECIMAL_PART = 0.0000000001;

export const NUM_DECIMAL_PART = 0.01;
export const MAX_NUMBER_PART = 9999999999;
export const MIN_NUMBER_PART = 0.01;

export const AllowedContentTypes = (function () {
  return {
    JPEG: "image/jpeg",
    PNG: "image/png",
    PDF: "application/pdf",
  };
})();

export const AllowedMediaTypes = (function () {
  return {
    JPEG: "image/jpeg",
    PNG: "image/png",
  };
})();

export const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
export const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";
