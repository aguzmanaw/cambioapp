import { create } from "zustand";

export const useApplicationStore = create(
  (set, get) => {
    return {
      mobileOpen: false,
      messageOpen: false,
      messages: [
        {
          message: "Registro guaradado!",
          messageType: "success",
        },
      ],

      mobileToggle: async () => {
        const mobileOpen = !get().mobileOpen;
        set({ mobileOpen }, false, "MENU_TOGGLE");
      },

      mobileRefresh: async (isMobile) => {
        const mobileOpen = isMobile;
        set({ mobileOpen }, false, "MENU_SETTING");
      },

      messageShow: ({ message, messageType }) => {
        const notes = {
          message,
          messageType,
        };
        const messages = get().messages;
        messages.concat(notes);
        set({ messageOpen: true, messages }, false, "MESSAGE_SHOW");
      },

      messageHide: async () => {
        const messages = get().messages.slice(1);
        set({ messageOpen: false, messages }, false, "MESSAGE_SHOW");
      },
    };
  },
  {
    name: "application",
  }
);
