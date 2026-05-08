import { create } from "zustand";
import {
  fetchRates,
  fetchCreateRate,
  fetchFilterRates,
  fetchGetRatesFromCurrentDay,
  fetchUpdateRate,
  fetchGetRateFromToday,
} from "@/services/rates";
import { mapResponseJsonToRates } from "@/utils/mappers/mapResponseJsonToRates";
import { mapRatesToRequestJson } from "@/utils/mappers/mapRatesToRequestJson";
import { getResponseError } from "@/utils/getResponseError";
import {
  CONTACT_SUPPORT,
  CREATE_RATE,
  FETCH_RATES,
  FILTER_RATES,
  UPDATE_RATE,
} from "@/utils/constants";
import { getPageInfo } from "@/utils/getPageInfo";

export const useRatesStore = create(
  (set, get) => {
    return {
      loading: false,
      rates: [],
      error: null,
      rate: null,
      info: null,

      getRates: async () => {
        set({ loading: true }, false, FETCH_RATES);
        try {
          const response = await fetchRates();
          const { message, data } = response;

          if (!message && data) {
            const rates = mapResponseJsonToRates(data);

            const { info } = getPageInfo(response);

            set(
              {
                rates: rates,
                loading: false,
                info: info,
                error: null,
                rate: null,
              },
              false,
              FETCH_RATES
            );
          } else {
            const err = await getResponseError(response);
            set({ loading: false, error: err, rate: null }, false, FETCH_RATES);
          }
        } catch (err) {
          set({ error: err, loading: false, rate: null }, false, FETCH_RATES);
        }
      },

      createRate: async (data) => {
        set({ loading: true }, false, CREATE_RATE);

        const [payload] = mapRatesToRequestJson([data]);
        try {
          const response = await fetchCreateRate(payload);
          const { message, rate } = response;

          if (message && rate) {
            const prevRates = get().rates;
            const [currentRate] = mapResponseJsonToRates([rate]);
            const rates = [currentRate, ...prevRates];

            set(
              {
                rates: rates,
                rate: currentRate,
                loading: false,
                error: null,
              },
              false,
              CREATE_RATE
            );
          } else {
            const err = await getResponseError(response);
            set(
              {
                loading: false,
                error: err,
                rate: null,
              },
              false,
              CREATE_RATE
            );
          }
        } catch (err) {
          console.error(err);
          set(
            {
              loading: false,
              error: { code: "500", message: CONTACT_SUPPORT },
              rate: null,
            },
            false,
            CREATE_RATE
          );
        }
      },

      getRatesByParam: async (param) => {
        set({ loading: true }, false, FILTER_RATES);
        const response = await fetchFilterRates(param);

        const { message, data } = response;

        if (!message && data) {
          const rates = mapResponseJsonToRates(data);

          set({ rates: rates, loading: false }, false, FILTER_RATES);
        } else if (message) {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, FILTER_RATES);
        } else {
          set({ loading: false }, false, FILTER_RATES);
        }
      },

      getRatesFromCurrenDay: async () => {
        set({ loading: true }, false, FILTER_RATES);

        const response = await fetchGetRatesFromCurrentDay();

        const { message, data } = response;

        if (!message && data) {
          const rates = mapResponseJsonToRates(data);

          set({ rates: rates, loading: false }, false, FILTER_RATES);
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, FILTER_RATES);
        }
      },

      updateRate: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_RATE);

        const [payload] = mapRatesToRequestJson([data]);

        const response = await fetchUpdateRate({ id, data: payload });

        const { message, rate } = response;

        if (message && rate) {
          const [currentRate] = mapResponseJsonToRates([rate]);

          let rates = get().rates;

          const index = rates.findIndex(
            (customer) => customer.id === parseInt(id)
          );

          rates[index] = currentRate;

          set(
            {
              rates: rates,
              rate: rate,
              loading: false,
              error: {},
            },
            false,
            UPDATE_RATE
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              rate: {},
            },
            false,
            UPDATE_RATE
          );
        }
      },

      getRatesFromToday: async () => {
        set({ loading: true }, false, "TODAY_RATE");
        try {
          const response = await fetchGetRateFromToday();
          const { message, ...data } = response;

          if (!message && data) {
            const responseJson = Object.values(data);

            const rates = mapResponseJsonToRates(responseJson);

            set({ rates: rates, loading: false }, false, "TODAY_RATE");
          } else {
            const err = getResponseError(response);
            set({ error: err, loading: false }, false, "TODAY_RATE");
          }
        } catch (err) {
          set(
            {
              error: {
                code: "500",
                message: err,
              },
              loading: false,
            },
            false,
            "TODAY_RATE"
          );
        }
      },
    };
  },
  {
    name: "rates",
  }
);
