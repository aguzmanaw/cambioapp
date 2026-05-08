import { lazy } from "react";
import { Switch, Route, Router } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";
import { Suspense } from "react";
import { useApplicationData } from "@/hooks/useApplicationData";
//import { getRoutes } from "@/utils/getRoutes";
import { AuthRoute } from "@/components/Auth/AuthRoute";
import { useAuthData } from "@/hooks/useAuthData";

import { Loader } from "./components/Loader";

import { Notification } from "./components/Notification";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ActionType, drawerWidth } from "./utils/constants";

import { Copyright } from "./components/Copyright";
const Header = lazy(() => import("./components/Header"));
const Navigator = lazy(() => import("./components/Navigator"));
const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const CustomerPage = lazy(() => import("./pages/Customer"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const RatePage = lazy(() => import("./pages/Rate"));
const BankPage = lazy(() => import("./pages/Bank"));
const OrderPage = lazy(() => import("./pages/Order"));
const OrderWizardPage = lazy(() => import("./pages/OrderWizard"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));
const UsersPage = lazy(() => import("./pages/Users"));
const BillingsPage = lazy(() => import("./pages/Billings"));
const BalancePage = lazy(() => import("./pages/Balance"));

const allowedRouteByRole = [
  { id: 1, routeId: "order", role: ["admin", "user"] },
  { id: 2, routeId: "bank", role: ["admin", "user"] },
  { id: 3, routeId: "customer", role: ["admin", "user"] },
  { id: 4, routeId: "account", role: ["admin", "user"] },
  { id: 5, routeId: "balance", role: ["admin"] },
  { id: 5, routeId: "rate", role: ["admin"] },
  { id: 5, routeId: "transaction", role: ["admin"] },
  { id: 5, routeId: "user", role: ["admin"] },
];

const routes = [
  {
    id: "order",
    title: "Operaciones",
    path: "/orders",
    children: [],
  },
  {
    id: "bank",
    title: "Bancos",
    path: "/banks",
    children: [],
  },
  {
    id: "customer",
    title: "Clientes",
    path: "/customer",
    children: [],
  },
  {
    id: "account",
    title: "Cuentas",
    path: "/billings",
    children: [],
  },
  {
    id: "balance",
    title: "Saldos",
    path: "/balance",
    children: [],
  },
  {
    id: "rate",
    title: "Tasas",
    path: "/rates",
    children: [],
  },
  {
    id: "transaction",
    title: "Transacciones",
    path: "/transactions",
    children: [],
  },
  {
    id: "user",
    title: "Usuarios",
    path: "/users",
    children: [],
  },
];

const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to) => navigate("#" + to);

const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export default function App() {
  const { allowedRoutes, routesByUser, isAuth, username, logout } = useAuthData(
    routes,
    allowedRouteByRole
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mobileToggle, mobileOpen } = useApplicationData();

  /*const [location] = useHashLocation();*/

  return (
    <Suspense fallback={<Loader />}>
      <Router hook={useHashLocation}>
        <Header
          username={username}
          isMobile={isMobile}
          onClick={mobileToggle}
          onSignOut={logout}
        />
        <Navigator routes={routesByUser} open={mobileOpen} />
        <Box
          component="main"
          sx={{
            overflow: "auto",
            height: "calc(94vh - 50px)",
            width: {
              sm: !mobileOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100%)`,
            },
            ml: { sm: !mobileOpen ? `${drawerWidth}px` : 0 },
            backgroundColor: "rgba(251, 185, 49, 0.63)",
          }}
        >
          <Switch>
            <Route path="/" component={LoginPage} />
            <Route path="/dashboard">
              <AuthRoute isAllowed={isAuth}>
                <HomePage />
              </AuthRoute>
            </Route>
            <Route path="/customer">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/customer"]}>
                  <CustomerPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/rates">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/rates"]}>
                  <RatePage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/banks">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/banks"]}>
                  <BankPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/orders">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/orders"]}>
                  <OrderPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/orders/add">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/orders"]}>
                  <OrderWizardPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/transactions">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/transactions"]}>
                  <TransactionsPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/users">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/users"]}>
                  <UsersPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/billings">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/billings"]}>
                  <BillingsPage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/balance">
              {(params) => (
                <AuthRoute isAllowed={isAuth && allowedRoutes["/balance"]}>
                  <BalancePage action={ActionType.LIST} params={params} />
                </AuthRoute>
              )}
            </Route>
            <Route path="/:rest*">
              {(params) => (
                <AuthRoute isAllowed={isAuth}>
                  <NotFoundPage url={params.rest} />
                </AuthRoute>
              )}
            </Route>
          </Switch>
        </Box>
        <Copyright />
        <Notification />
      </Router>
    </Suspense>
  );
}
