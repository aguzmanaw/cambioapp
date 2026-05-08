export const mapReponseJsonToWeeklyBillings = (reponseJson) => {
  return reponseJson.map((data) => ({
    totalOperations: data?.total_operations,
    operationsOpened: data?.operations_opened,
    operationsPayable: data?.operations_payable,
    operationsReceivable: data?.operations_receivable,
    pendingOperations: data?.pending_operations,
    operationsClosed: data?.operations_closed,
    operationsDisabled: data?.operations_disabled,
  }));
};
