import { createContext, useContext } from "react";

import type { DemoUser, Listing, ListingStatus } from "@/components/swap/data";

export type ListingDraft = Omit<
  Listing,
  "id" | "owner" | "whatsapp" | "icon" | "color" | "status" | "createdAt"
>;

export type AppState = {
  view: "mural" | "saved" | "mine";
  user: DemoUser | null;
  listings: Listing[];
  savedIds: number[];
  categoryFilter: string;
  notice: string;
  loginOpen: boolean;
  toast: (message: string) => void;
  openLogin: () => void;
  signOut: () => void;
  createListing: () => void;
  toggleSaved: (id: number) => void;
  addListing: (draft: ListingDraft) => void;
  manageListing: (id: number, status: ListingStatus) => void;
  selectListing: (listing: Listing) => void;
  setCategoryFilter: (category: string) => void;
  setView: (view: "mural" | "saved" | "mine") => void;
  discoverListing: () => void;
};

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) throw new Error("useAppState must be used within AppStateProvider");
  return state;
}
