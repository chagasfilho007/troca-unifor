import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppPage } from "@/components/swap/app-page";
import { useAppState } from "@/components/swap/app-state-context";
import { Ticker } from "@/components/swap/landing-sections";
import { filterListings, type ListingKind } from "@/components/swap/data";
import { ListingsSection } from "@/components/swap/listings-section";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/mural")({
  head: () => ({
    meta: [
      { title: `Mural — ${BRAND_NAME}` },
      {
        name: "description",
        content: "Encontre trocas, serviços e projetos entre alunos da Unifor.",
      },
    ],
  }),
  component: Mural,
});

function Mural() {
  const state = useAppState();
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<ListingKind | "">("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<"newest" | "price">("newest");
  const visibleListings = filterListings(
    state.listings,
    state.categoryFilter,
    search,
    state.savedIds,
    {
      kind,
      maxPrice: maxPrice.trim() ? Number(maxPrice) : undefined,
      sort,
      view: state.view,
      owner: state.user?.name,
    },
  );
  const resetFilters = () => {
    state.setCategoryFilter("Todos");
    setSearch("");
    setKind("");
    setMaxPrice("");
    setSort("newest");
  };

  return (
    <AppPage>
      <Ticker />
      <ListingsSection
        view={state.view}
        filter={state.categoryFilter}
        search={search}
        savedIds={state.savedIds}
        listings={visibleListings}
        signedIn={!!state.user}
        kind={kind}
        maxPrice={maxPrice}
        sort={sort}
        onFilterChange={state.setCategoryFilter}
        onViewChange={state.setView}
        onSearchChange={setSearch}
        onKindChange={setKind}
        onMaxPriceChange={setMaxPrice}
        onSortChange={setSort}
        onResetFilters={resetFilters}
        onSavedToggle={state.toggleSaved}
        onListingSelect={state.selectListing}
        onManageListing={state.manageListing}
        onCreateListing={state.createListing}
        onLogin={state.openLogin}
      />
    </AppPage>
  );
}
