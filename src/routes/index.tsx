import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  AffiliateSection,
  CategoryGrid,
  HeroSection,
  HowItWorksSection,
  MarketplaceSection,
  Ticker,
  TrustSection,
} from "@/components/swap/landing-sections";
import { useAppState } from "@/components/swap/app-state-context";
import { CommunityFeatures } from "@/components/swap/community-features";
import { filterListings, type ListingKind } from "@/components/swap/data";
import { ListingsSection } from "@/components/swap/listings-section";
import { QuickActions } from "@/components/swap/quick-actions";
import { SiteFooter, SiteHeader } from "@/components/swap/site-chrome";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — Trocas, serviços e projetos da Unifor` },
      {
        name: "description",
        content:
          "Sua assinatura parada vale mais trocada. Explore streaming, estudos, ferramentas e projetos na comunidade Unifor.",
      },
      { property: "og:title", content: `${BRAND_NAME} — Conexões que valem mais` },
      {
        property: "og:description",
        content:
          "Trocas, serviços e projetos entre alunos da Unifor. Encontre o que você precisa no mural da comunidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const state = useAppState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<ListingKind | "">("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<"newest" | "price">("newest");

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

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
  const chooseCategory = (category: string) => {
    state.setCategoryFilter(category);
    state.setView("mural");
    void navigate({ to: "/mural" });
  };
  const resetFilters = () => {
    state.setCategoryFilter("Todos");
    setSearch("");
    setKind("");
    setMaxPrice("");
    setSort("newest");
  };
  const selectView = (view: "mural" | "saved" | "mine") => {
    if (view !== "mural" && !state.user) {
      state.openLogin();
      return;
    }
    state.setView(view);
  };

  return (
    <>
      <SiteHeader
        onLogin={state.openLogin}
        onSignOut={state.signOut}
        onCreateListing={state.createListing}
        user={state.user}
      />
      <main>
        <HeroSection
          onChooseCategory={chooseCategory}
          onDiscover={state.discoverListing}
          onCreate={state.createListing}
        />
        <Ticker />
        <CategoryGrid onChooseCategory={chooseCategory} />
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
          onViewChange={selectView}
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
        <HowItWorksSection />
        <TrustSection />
        <MarketplaceSection onAction={() => state.createListing()} />
        <AffiliateSection onAction={() => void navigate({ to: "/parceiros" })} />
        <CommunityFeatures user={state.user} onLogin={state.openLogin} onToast={state.toast} />
      </main>
      <SiteFooter />
      <QuickActions
        onView={selectView}
        onCreate={state.createListing}
        onLogin={state.openLogin}
        onDiscover={state.discoverListing}
        onCategory={chooseCategory}
      />
    </>
  );
}
