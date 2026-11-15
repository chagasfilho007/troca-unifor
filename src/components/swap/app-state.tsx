import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { CreateListingDialog } from "@/components/swap/create-listing-dialog";
import {
  categories,
  listings,
  type DemoUser,
  type Listing,
  type ListingStatus,
} from "@/components/swap/data";
import { ListingDialog } from "@/components/swap/listing-dialog";
import { LoginDialog } from "@/components/swap/login-dialog";
import {
  AppStateContext,
  type AppState,
  type ListingDraft,
} from "@/components/swap/app-state-context";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [allListings, setAllListings] = useState<Listing[]>(listings);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [view, setView] = useState<"mural" | "saved" | "mine">("mural");
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [notice, setNotice] = useState("");

  const toast = useCallback((message: string) => setNotice(message), []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("troca-favs") ?? "[]") as unknown;
      if (Array.isArray(saved) && saved.every((id) => Number.isInteger(id))) {
        setSavedIds(saved as number[]);
      }
    } catch {
      setSavedIds([]);
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      localStorage.setItem("troca-favs", JSON.stringify(savedIds));
    } catch {
      toast("Não foi possível salvar favoritos neste navegador.");
    }
  }, [favoritesLoaded, savedIds, toast]);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const signOut = useCallback(() => {
    setUser(null);
    toast("Perfil de demonstração encerrado");
  }, [toast]);
  const createListing = useCallback(() => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setCreateOpen(true);
  }, [user]);
  const toggleSaved = useCallback(
    (id: number) => {
      if (!user) {
        setLoginOpen(true);
        return;
      }
      setSavedIds((current) =>
        current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
      );
    },
    [user],
  );
  const addListing = useCallback(
    (draft: ListingDraft) => {
      if (!user) return;
      const category = categories.find((item) => item.name === draft.cat) ?? categories[0];
      const listing: Listing = {
        ...draft,
        id: Math.max(0, ...allListings.map((item) => item.id)) + 1,
        owner: user.name,
        whatsapp: user.whatsapp,
        icon: category.icon,
        color: category.color,
        status: "active",
        createdAt: Date.now(),
      };
      setAllListings((current) => [listing, ...current]);
      setView("mine");
      setCategoryFilter("Todos");
      setCreateOpen(false);
      toast("Anúncio criado nesta sessão de demonstração");
    },
    [allListings, toast, user],
  );
  const manageListing = useCallback(
    (id: number, status: ListingStatus) => {
      setAllListings((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
      );
      toast(
        status === "active"
          ? "Anúncio reativado"
          : status === "paused"
            ? "Anúncio pausado"
            : status === "completed"
              ? "Anúncio marcado como concluído"
              : "Anúncio excluído desta sessão",
      );
    },
    [toast],
  );
  const discoverListing = useCallback(() => {
    const available = allListings.filter((item) => item.status === "active");
    if (available.length) setActiveListing(available[Math.floor(Math.random() * available.length)]);
  }, [allListings]);

  const value = useMemo<AppState>(
    () => ({
      user,
      view,
      listings: allListings,
      savedIds,
      categoryFilter,
      notice,
      loginOpen,
      toast,
      openLogin,
      signOut,
      createListing,
      toggleSaved,
      addListing,
      manageListing,
      selectListing: setActiveListing,
      setCategoryFilter,
      setView,
      discoverListing,
    }),
    [
      user,
      view,
      allListings,
      savedIds,
      categoryFilter,
      notice,
      loginOpen,
      toast,
      openLogin,
      signOut,
      createListing,
      toggleSaved,
      addListing,
      manageListing,
      discoverListing,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
      {activeListing && (
        <ListingDialog
          listing={activeListing}
          onClose={() => setActiveListing(null)}
          onContact={() => toast("Contato não disponível nesta prévia local.")}
          onReport={() => {
            setActiveListing(null);
            toast("Denúncia registrada apenas nesta demonstração");
          }}
        />
      )}
      {loginOpen && (
        <LoginDialog
          onClose={() => setLoginOpen(false)}
          onDemoLogin={(profile) => {
            setUser(profile);
            setLoginOpen(false);
            toast(`Perfil de demonstração iniciado. Bem-vindo, ${profile.name}!`);
          }}
        />
      )}
      {createOpen && (
        <CreateListingDialog onClose={() => setCreateOpen(false)} onSubmit={addListing} />
      )}
      {notice && (
        <div className="app-toast" role="status">
          {notice}
        </div>
      )}
    </AppStateContext.Provider>
  );
}
