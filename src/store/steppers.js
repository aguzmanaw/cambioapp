import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PURCHASE, PURCHASE_STEPPER } from "@/utils/constants";
import { getSchemaError } from "@/utils/getSchemaError";
import { validateCart } from "@/utils/validateCart";
import { validateCheckout } from "@/utils/validateCheckout";

export const useSteppersStore = create(
  persist(
    (set, get) => {
      return {
        values: {
          id: "",
          customerId: "",
          dni: "",
          firstname: "",
          lastname: "",
          countryName: "",
          customerAccountCode: "",
          customerAccountName: "",
          description: "",
          rateId: "",
          specialRate: 0,
          rateType: "",
          customerCurrency: "",
          businessCurrency: "",
          customerAmount: "",
          rateAmount: "",
          totalPayment: 0,
          totalReceivable: 0,
          autoRate: 0,
        },
        status: "DRAFT",
        error: {},

        addCustomer: (data = {}) => {
          const values = get().values;

          const {
            customerId,
            dni,
            firstname,
            lastname,
            countryName,
            customerAccountCode,
            customerAccountName,
            description,
          } = data;

          const order = {
            ...values,
            countryName: countryName || values?.countryName,
            dni: dni || values?.dni,
            firstname: firstname || values?.firstname,
            lastname: lastname || values?.lastname,
            customerId: customerId || values?.customerId,
            customerAccountCode: !customerAccountCode
              ? ""
              : customerAccountCode,
            customerAccountName: !customerAccountName
              ? ""
              : customerAccountName,
            description: !description ? "" : description,
          };

          set({ values: order }, false, "CART_STEPPER");
        },

        addProduct: (data) => {
          const values = get().values;

          const {
            rateId,
            specialRate,
            rateType,
            customerCurrency,
            businessCurrency,
            rateAmount,
            customerAmount,
            autoRate,
          } = data;

          let order = {
            ...values,
            rateId: rateId || values?.rateId,
            specialRate: specialRate || values?.specialRate,
            rateType: rateType ?? values?.rateType,
            customerCurrency: customerCurrency || values?.customerCurrency,
            businessCurrency: businessCurrency || values?.businessCurrency,
            rateAmount: rateAmount ?? values?.rateAmount,
            customerAmount: customerAmount ?? values?.customerAmount,
          };

          const rateNumber =
            order?.rateAmount && !isNaN(order?.rateAmount)
              ? Number(order.rateAmount)
              : order?.rateAmount;
          const amountNumber =
            order.customerAmount && !isNaN(order.customerAmount)
              ? Number(order.customerAmount)
              : order.customerAmount;

          const prevAutoRate = get().values.autoRate;
          const autoRateNumber = autoRate ?? prevAutoRate;

          const calcultedRateNumber =
            autoRateNumber && autoRateNumber !== 0
              ? 1 / rateNumber
              : rateNumber;

          const totalPayment =
            order.rateType === "venta"
              ? order.customerAmount
              : calcultedRateNumber * Number(amountNumber || 0);

          const totalReceivable =
            order.rateType === "venta"
              ? calcultedRateNumber * order.customerAmount
              : order.customerAmount;

          order = {
            ...order,
            rateAmount: rateNumber,
            customerAmount: amountNumber,
            totalPayment: totalPayment,
            totalReceivable,
            autoRate: autoRateNumber,
          };

          set({ values: order }, false, "CHECKOUT_STEPPER");
        },

        addPurcharse: () => {
          set({ status: PURCHASE, error: null }, false, PURCHASE_STEPPER);
        },

        resetCustomer: () => {
          const values = get().values;
          set(
            {
              values: {
                ...values,
                customerId: "",
                dni: "",
                firstname: "",
                lastname: "",
                countryName: "",
                customerAccountCode: "",
                customerAccountName: "",
                description: "",
              },
              status: "DRAFT",
              error: null,
            },
            false,
            "DRAFT_STEPPER"
          );
        },

        resetCheckout: () => {
          const values = get().values;
          set(
            {
              values: {
                ...values,
                id: "",
                rateId: "",
                specialRate: 0,
                rateType: "",
                customerCurrency: "",
                businessCurrency: "",
                customerAmount: "",
                rateAmount: "",
                totalPayment: 0,
                totalReceivable: 0,
              },
              status: "CHECKOUT",
              error: {},
            },
            false,
            "CHECKOUT_STEPPER"
          );
        },

        checkValidity: (step) => {
          const values = get().values;
          const status = get().status;
          let currentStatus = status;
          if ((status === "DRAFT" || status === "CART") && step === 0) {
            const { success, issues } = validateCart(values);

            const error = getSchemaError(issues);

            currentStatus = success ? "CART" : "DRAFT";

            set(
              { values: values, status: currentStatus, error: error, step },
              false,
              "CHECKOUT_STEPPER"
            );
          } else {
            if ((status === "CART" || status === "CHECKOUT") && step === 1) {
              const { success, issues } = validateCheckout(values);

              const error = getSchemaError(issues);
              currentStatus = success ? "CHECKOUT" : "CART";

              set(
                { values: values, status: currentStatus, error: error },
                false,
                "CHECKOUT_STEPPER"
              );
            }
          }
        },
      };
    },
    {
      name: "steppers",
      storage: createJSONStorage(() => sessionStorage),
      version: 3,
    }
  )
);
