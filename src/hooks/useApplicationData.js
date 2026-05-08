import { useEffect } from "react";
import { useApplicationStore } from "../store/application";

export function useApplicationData(isMobile) {
  const mobileOpen = useApplicationStore((state) => state.mobileOpen);
  const mobileToggle = useApplicationStore((state) => state.mobileToggle);
  const mobileRefresh = useApplicationStore((state) => state.mobileRefresh);
  const messageOpen = useApplicationStore((state) => state.messageOpen);
  const messageShow = useApplicationStore((state) => state.messageShow);
  const messageHide = useApplicationStore((state) => state.messageHide);
  const messages = useApplicationStore((state) => state.messages);
  /*
  useEffect(() => {
    mobileRefresh(isMobile);
  }, []);
*/
  return {
    mobileOpen,
    mobileToggle,
    messageOpen,
    messageShow,
    messageHide,
    messages,
  };
}
