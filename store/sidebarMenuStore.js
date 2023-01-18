import { create } from "zustand";

export const useSidebarMenuStore = create((set) => ({
  sidebarMenuIsOpen: false,

  openSidebarMenu: () =>
    set((state) => ({
      ...state,
      sidebarMenuIsOpen: true,
    })),

  closeSidebarMenu: () =>
    set((state) => ({
      ...state,
      sidebarMenuIsOpen: false,
    })),
}));
