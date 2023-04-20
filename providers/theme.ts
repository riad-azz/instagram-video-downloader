import { create } from "zustand";

export const useStore = create<{
  theme: string;
}>((set) => ({
  theme: "",
}));
