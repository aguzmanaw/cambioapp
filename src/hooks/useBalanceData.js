import { useBalancesStore } from "@/store/balances";
import { useEffect } from "react";

export const useBalancesData = () => {
  const balances = useBalancesStore((state) => state.balances);
  const loading = useBalancesStore((state) => state.balances);
  const info = useBalancesStore((state) => state.balances);
  const getBalances = useBalancesStore((state) => state.getBalances);
  const generateBalance = useBalancesStore((state) => state.generateBalance);

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  const results = [
    {
      id: 1,
      dollars: 20000,
      euros: {
        total: 10000,
        for_dollar: 2,
        to_dollar: 20000,
      },
      pesos_argentinos: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      bolivares: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      reales: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      total_dollares: 1500,
      created_at: "2023-09-01 12:43:07",
      updated_at: "2023-09-01 12:43:07",
    },
    {
      id: 3,
      dollars: 20000,
      euros: {
        total: 10000,
        for_dollar: 2,
        to_dollar: 20000,
      },
      pesos_argentinos: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      bolivares: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      reales: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      total_dollares: 1000,
      created_at: "2023-09-02 12:43:07",
      updated_at: "2023-09-02 12:43:07",
    },
    {
      id: 2,
      dollars: 20000,
      euros: {
        total: 10000,
        for_dollar: 2,
        to_dollar: 20000,
      },
      pesos_argentinos: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      bolivares: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      reales: {
        total: 0,
        for_dollar: 2,
        to_dollar: 0,
      },
      total_dollares: 2000,
      created_at: "2023-09-03 12:43:07",
      updated_at: "2023-09-03 12:43:07",
    },
  ];

  const mapReponseJsonToBalance = (reponseJson) => {
    return reponseJson.map((data) => ({
      totalDollares: data?.total_dollares,
      updatedAt: data?.updated_at,
    }));
  };

  const dollars = mapReponseJsonToBalance(results);

  let amounts = [];
  let days = [];

  dollars.forEach((balance) => {
    amounts.push(balance?.totalDollares);
    days.push(new Date(balance?.updatedAt).getDay());
  });

  return {
    balances,
    loading,
    info,
    generateBalance,
    balancesInUsd: {
      amounts,
      days,
    },
  };
};
