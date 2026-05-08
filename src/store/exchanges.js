import { create } from "zustand";
import {
  fetchCreateExchange,
  fetchExchanges,
  fetchFilterExchanges,
} from "../services/exchanges";
import { mapResponseJsonToExchanges } from "@/utils/mappers/mapResponseJsonToExchanges";
import { mapExchangesToRequestJson } from "@/utils/mappers/mapExchangesToRequestJson";
import { getResponseError } from "@/utils/getResponseError";
import {
  CREATE_EXCHANGE,
  FETCH_EXCHANGES,
  FILTER_EXCHANGES,
} from "@/utils/constants";

export const useExchangesStore = create(
  (set, get) => {
    return {
      exchanges: [],
      exchange: null,
      loading: false,
      error: null,

      getExchanges: async () => {
        set({ loading: true }, false, FETCH_EXCHANGES);

        try {
          const response = await fetchExchanges();
          const { message, data } = response;

          if (!message && data) {
            const exchanges = mapResponseJsonToExchanges(data);
            set(
              {
                exchanges: exchanges,
                loading: false,
                exchange: null,
                error: null,
              },
              false,
              FETCH_EXCHANGES
            );
          } else {
            const err = await getResponseError(response);
            set(
              { loading: false, error: err, exchange: null },
              false,
              CREATE_EXCHANGE
            );
          }
        } catch (err) {
          console.error(err);
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
                exchange: null,
              },
            },
            false,
            FETCH_EXCHANGES
          );
        }
      },

      createExchange: async ({ data }) => {
        set({ loading: true }, false, CREATE_EXCHANGE);

        const [payload] = mapExchangesToRequestJson([data]);

        const response = await fetchCreateExchange(payload);

        const { message, exchange } = response;

        if (message) {
          const prevExchanges = get().exchanges;

          const [currentExchange] = mapResponseJsonToExchanges([exchange]);

          const exchanges = [currentExchange, ...prevExchanges];

          set(
            {
              exchanges: exchanges,
              exchange: currentExchange,
              loading: false,
              error: null,
            },
            false,
            CREATE_EXCHANGE
          );
        } else {
          const err = await getResponseError(response);
          set(
            { loading: false, error: err, exchange: null },
            false,
            CREATE_EXCHANGE
          );
        }
      },

      getExchangesByTerm: async (term) => {
        set({ loading: true }, false, FILTER_EXCHANGES);

        const response = await fetchFilterExchanges(term);

        const { message, data } = response;

        if (!message && data) {
          const exchanges = mapResponseJsonToExchanges(data);
          set(
            {
              exchanges: exchanges,
              loading: false,
            },
            false,
            FILTER_EXCHANGES
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, FILTER_EXCHANGES);
        }
      },
    };
  },
  {
    name: "exchanges",
  }
);
