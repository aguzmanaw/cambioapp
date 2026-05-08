import { useState } from "react";
import { OrderTable } from "@/components/Orders/OrderTable";
import { useBillingsPayableData } from "@/hooks/useBillingsPayableData";
import { Paginator } from "@/components/common/Paginator";

export function BillingsPayable(action = "LIST", params = {}) {
  const [options, setOptions] = useState({ action, params });
  const { ordersPayable, info } = useBillingsPayableData({
    action: options.action,
    params: options.params,
  });

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        page: value,
      },
    }));
  };

  return (
    <>
      <OrderTable rows={ordersPayable} disableAction />
      <Paginator
        id="paginator"
        pages={info?.pages}
        current={info?.current}
        onChange={hanglePageChange}
      />
    </>
  );
}
