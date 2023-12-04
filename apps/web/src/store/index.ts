import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthSlice, createAuthSlice } from "./auth";

export type IGlobalStore = AuthSlice;

export const STORAGE_KEY = "whoami_storage";

export const useStore = create<
  IGlobalStore,
  [["zustand/persist", Pick<IGlobalStore, "accessToken">]]
>(
  persist(createAuthSlice, {
    name: STORAGE_KEY,
    partialize: (state) => ({
      accessToken: state.accessToken,
      user: state.user,
    }),
  })
);