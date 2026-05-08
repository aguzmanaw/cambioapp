import { useAuthStore } from "@/store/auth";
import { getRoutes } from "@/utils/getRoutes";
import { useMemo } from "react";

export function useAuthData(routes, allowedRouteByRole) {
  const role = useAuthStore((state) => state.role);
  const isAuth = useAuthStore((state) => state.isAuth);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const login = useAuthStore((state) => state.login);

  const routesByUser = useMemo(() => {
    return getRoutes(routes, allowedRouteByRole, role);
  }, [routes, allowedRouteByRole, role]);

  const allowedRoutes = useMemo(() => {
    return routes.reduce((allowed, { id, path }) => {
      const allowedRoute = routesByUser.filter((route) => route.id === id);
      const isFound = allowedRoute.length;

      return { ...allowed, [path]: isFound };
    }, {});
  }, [routes, routesByUser]);

  return {
    role,
    isAuth,
    username,
    logout,
    login,
    routesByUser,
    allowedRoutes,
  };
}
