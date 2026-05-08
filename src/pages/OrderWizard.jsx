import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AddOrderExchange } from "../components/Orders/AddOrderExchange";
import { OrderCheckout } from "@/components/Orders/OrderCheckout";
import { OrderConfirmModal } from "@/components/Orders/OrderConfirmModal";
import { getPrintableOrder } from "@/utils/getPrintableOrder";
import { OrderReceipt } from "@/components/Orders/OrderReceipt";
import { useLocation } from "wouter";
import { useOrdersStore } from "@/store/orders";
import { ERROR, MISSING_REQUIRED_FIELDS, PURCHASE } from "@/utils/constants";
import { useNotificationStore } from "@/store/notifications";
import { useStepperData } from "@/hooks/useStepperData";

export default function OrderWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const {
    values,
    status,
    addPurcharse,
    resetCustomer,
    resetCheckout,
    error: errorStepper,
  } = useStepperData(activeStep);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const error = useOrdersStore((state) => state.error);
  const order = useOrdersStore((state) => state.order);

  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const [, setLocation] = useLocation();

  const steps = [
    {
      title: "Paso 1",
      content: <AddOrderExchange />,
    },
    {
      title: "Paso 2",
      content: <OrderCheckout />,
    },
  ];

  const handleNext = (step) => (event) => {
    event.preventDefault();

    setActiveStep(step);

    if (step === activeStep) {
      if (errorStepper && Object.keys(errorStepper).length) {
        notificationShow({
          message: MISSING_REQUIRED_FIELDS,
          notificationType: ERROR,
        });
      } else setActiveStep(step + 1);
    }
  };

  const resetWizard = () => {
    resetCheckout();
    resetCustomer();
  };

  const handleCloseAndConfirm = (event) => {
    event.preventDefault();

    setActiveStep(1);
  };

  const handleCloseAndRestart = (event) => {
    event.preventDefault();

    resetWizard();

    setActiveStep(0);
  };

  const handleOrderCreate = async (event) => {
    event.preventDefault();

    if (errorStepper && Object.keys(errorStepper).length) {
      const { message } = error;

      notificationShow({
        message: message,
        notificationType: ERROR,
      });
      return;
    }

    try {
      await createOrder(values);
      addPurcharse();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigatoToOrder = (event) => {
    event.preventDefault();

    setLocation("/orders");
  };

  const isConfirm = status !== PURCHASE && steps.length === activeStep;

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <Paper
        sx={{
          minWidth: 270,
          width: 400,
          minHeight: 410,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Stepper
          className={"wizard-stepper__container"}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step key={step.title}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="h6">Last step</Typography>
                  ) : null
                }
              >
                <Typography variant="h6">{step.title}</Typography>
              </StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mb: 2, textAlign: "end" }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1
                        ? "Generar Remito"
                        : "Procesar"}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {order && status === PURCHASE && steps.length === activeStep && (
          <OrderReceipt
            title={"Remito"}
            text={getPrintableOrder(order)}
            showModal={
              order && status === PURCHASE && steps.length === activeStep
            }
            onClose={handleCloseAndRestart}
            onSubmit={handleNavigatoToOrder}
          />
        )}
      </Paper>
      <OrderConfirmModal
        showModal={isConfirm}
        order={values}
        onClose={handleCloseAndConfirm}
        onSubmit={handleOrderCreate}
      />
    </Box>
  );
}
