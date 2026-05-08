import { useState } from "react";
import { useRatesData } from "../hooks/useRatesData";
import { RateTable } from "components/Rates/RatesTable";
import { Stack } from "@mui/material";
import { SearchInput } from "components/SearchInput";
import { NewButton } from "components/NewButton";
import { ActionType, ERROR, MISSING_REQUIRED_FIELDS } from "@/utils/constants";
import Box from "@mui/material/Box";
import AddGroupButton from "../components/AddGroupButton";
import { AddGroupRateModal } from "../components/Rates/AddGroupRateModal";
import { useExchangesData } from "@/hooks/useExchangesData";
import { getFormData } from "../utils/getformdata";
import { useNotificationStore } from "@/store/notifications";
import { useCurrenciesData } from "@/hooks/useCurrenciesData";
import { UpdateRateModal } from "@/components/Rates/UpdateRateModal";
import { AddExchangeModal } from "@/components/Exchange/AddExchangeModal";
import { getSwapExchange } from "@/utils/getSwapExchange";
import { ShowRateModal } from "@/components/Rates/ShowRateModal";
import { Paginator } from "@/components/common/Paginator";

export default function Rate() {
  const [options, setOptions] = useState({
    action: ActionType.LIST,
    params: {},
  });
  const {
    recurrentExchanges: recurrents,
    exchanges,
    createExchange,
    recurrentOptions,
  } = useExchangesData(options?.action);

  const { currencyOptions } = useCurrenciesData();

  const { rates, createRate, updateRate, info } = useRatesData(
    options?.action,
    options?.params
  );

  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const handleSelect = (target) => (event) => {
    event.preventDefault();

    const { action, params } = target;

    setOptions({
      action: action,
      params: params,
    });
  };

  const resetOptions = () => {
    setOptions({
      action: ActionType.LIST,
      params: {},
    });
  };

  const handleFavoriteRates = async (event) => {
    event.preventDefault();
    setOptions({ action: ActionType.ADD_GROUP, params: {} });
  };

  const handleClose = async (event) => {
    event.preventDefault();
    resetOptions();
  };

  const handleCreateRate = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    await createRate(data);
  };

  const handleCreateExchange = async (event) => {
    event.preventDefault();

    const form = event.target;

    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    const exchangeData = getSwapExchange(data);

    await createExchange({ data: exchangeData });

    resetOptions();
  };

  const handleUpdateRate = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    const { id } = options.params;

    await updateRate({ id, data: data });
    resetOptions();
  };

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        page: value,
      },
    }));
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = getFormData(form);

    const { search } = formData;

    setOptions((state) => ({
      action: state.action,
      params: { ...state.params, search },
    }));
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSearchSubmit}>
          <SearchInput name="search" placeholder={"Nombre"} />
        </Box>
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={1}
        >
          <AddGroupButton label="Favorito" onClick={handleFavoriteRates} />
          <NewButton
            id="newBtn"
            label="Agregar"
            onClick={() => setOptions({ action: ActionType.ADD, params: {} })}
          />
        </Stack>
      </Stack>
      <RateTable rows={rates} onSelect={handleSelect} />
      <Paginator
        id="paginator"
        pages={info?.pages}
        current={info?.current}
        onChange={hanglePageChange}
      />
      <AddGroupRateModal
        rate={options?.params}
        showModal={ActionType.ADD_GROUP === options.action}
        recurrents={recurrents}
        onClose={handleClose}
        title={"Agregar Tasas Favoritas"}
        onSubmit={handleCreateRate}
        exchanges={exchanges}
      />
      <AddExchangeModal
        currencies={currencyOptions}
        showModal={ActionType.ADD === options.action}
        onSubmit={handleCreateExchange}
        onClose={handleClose}
      />
      <UpdateRateModal
        showModal={ActionType.UPDATE === options.action}
        rate={options.params}
        exchangeTypes={recurrentOptions}
        onClose={handleClose}
        exchanges={exchanges}
        onSubmit={handleUpdateRate}
      />
      <ShowRateModal
        showModal={ActionType.SHOW === options.action}
        rate={options.params}
        exchangeTypes={recurrentOptions}
        onClose={handleClose}
        exchanges={exchanges}
      />
    </Box>
  );
}
