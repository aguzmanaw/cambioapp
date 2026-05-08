export const getRoutes = (allRoutes = [], allowedRoutes = [], role = "") => {
  const filteredRoutes = allowedRoutes.filter((allowed) =>
    allowed.role.includes(role)
  );
  const allowedIds = filteredRoutes.map(({ routeId }) => routeId);

  return allRoutes.filter((route) => {
    return allowedIds.includes(route.id);
  });
};
