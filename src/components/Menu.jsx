import { useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TradeIcon } from "./Icons";
import { useLocation, useRoute } from "wouter";

const StyledBox = styled(Box)(({ theme }) => ({
  ["& .MuiListItemButton-root"]: {
    color: "#fff",
    backgroundColor: "(13.3, 13.3, 13.3)",
    ["& .MuiListItemIcon-root"]: {
      color: "#fff",
    },
  },

  ["& .MuiListItemButton-root:hover"]: {
    color: "#000",
    backgroundColor: theme.palette.primary.main,
    outline: "1px solid rgb(13.3, 13.3, 13.3)",
    ["& .MuiListItemIcon-root"]: {
      color: "#000",
    },
  },

  ["& .MuiListItemButton-root.Mui-selected"]: {
    color: "#000",
    backgroundColor: theme.palette.primary.main,
    ["& .MuiListItemIcon-root"]: {
      color: "#000",
    },
  },

  ["& .MuiListItemButton-root.Mui-active"]: {
    color: "#000",
    backgroundColor: "rgb(238, 238, 238)",
    ["& .MuiListItemIcon-root"]: {
      color: "#000",
    },
  },
}));

const mapRouteToPath = (routes) => {
  return routes.reduce((acc, el) => {
    const rest = el.children.reduce((list, item) => {
      if (item.path) return { ...list, [item.id]: item.path };

      return list;
    }, {});

    if (el.path) return { ...acc, [el.id]: el.path };

    return { ...acc, ...rest };
  }, {});
};

export function Menu({ routes }) {
  const [openMenu, setOpenMenu] = useState({});
  //const [selectedMenu, setSelectedMenu] = useState({});
  const [, setLocation] = useLocation();
  //const mobileRefresh = useApplicationStore((state) => mobileRefresh);
  /*
  function routeToPath(flatRoutes, routeId) {
    if (routeId in flatRoutes) {
      setLocation(url);
    }
  }
*/
  const handleClick = (target) => (event) => {
    event.preventDefault();

    //setSelectedMenu(target);

    //routeToPath(mappedRoute, target);

    if (target in mappedRoute) {
      const url = mappedRoute[target];
      //mobileRefresh(false);
      setLocation(url);
    }
  };

  const handleMenuClick = (target) => (event) => {
    event.preventDefault();

    setOpenMenu({ [target]: !openMenu[target] });
    //setSelectedMenu(target);

    if (target in mappedRoute) {
      const url = mappedRoute[target];
      setLocation(url);
    }
  };

  const hasRouteChildren = (elements) => {
    return elements.children.length > 0;
  };

  function NavigationItem({ onClick, iconType, title, path, ...props }) {
    const [isActive] = useRoute(path);

    return (
      <ListItemButton selected={isActive} onClick={onClick} {...props}>
        <ListItemIcon>
          <TradeIcon type={iconType} />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
  }

  const mappedRoute = mapRouteToPath(routes);
  /*
                <ListItemButton onClick={handleClick(route.id)}>
                  <ListItemIcon>
                    <TradeIcon type={route.id} />
                  </ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItemButton>
*/
  return (
    <Box
      sx={{
        overflow: "auto",
      }}
    >
      <List>
        {routes.map((route) => (
          <StyledBox key={route.id}>
            {!hasRouteChildren(route) && (
              <>
                <NavigationItem
                  className={"navigator-menu__item"}
                  onClick={handleClick(route.id)}
                  iconType={route.id}
                  title={route.title}
                  path={route.path}
                />
              </>
            )}
            {hasRouteChildren(route) && (
              <ListItemButton onClick={handleMenuClick(route.id)}>
                <ListItemIcon>
                  <TradeIcon type={route.id} />
                </ListItemIcon>
                <ListItemText primary={route.title} />
                {openMenu[route.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            )}
            {hasRouteChildren(route) && (
              <Collapse in={openMenu[route.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {route.children.map((el) => (
                    <ListItemButton
                      key={el.id}
                      sx={{ pl: 4 }}
                      onClick={handleClick(el.id)}
                    >
                      <ListItemIcon>
                        <TradeIcon type={el.id} />
                      </ListItemIcon>
                      <ListItemText primary={el.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </StyledBox>
        ))}
      </List>
    </Box>
  );
}
