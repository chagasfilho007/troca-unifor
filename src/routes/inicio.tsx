import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { AppPage } from "@/components/swap/app-page";
import {
  CategoryGrid,
  FinalCTASection,
  HeroSection,
  HowItWorksSection,
} from "@/components/swap/landing-sections";
import { useAppState } from "@/components/swap/app-state-context";
import { filterListings } from "@/components/swap/data";
import { FeaturedListingsSection } from "@/components/swap/listings-section";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — Comunidade Unifor` },
      {
        name: "description",
        content: "Troque o que você não usa, encontre novas possibilidades na comunidade Unifor.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const state = useAppState();
  const navigate = useNavigate();
  const visibleListings = filterListings(state.listings, "Todos", "", state.savedIds);
  const chooseCategory = (category: string) => {
    state.setCategoryFilter(category);
    state.setView("mural");
    void navigate({ to: "/mural" });
  };

  return (
    <AppPage>
      <HeroSection
        onChooseCategory={chooseCategory}
        onDiscover={state.discoverListing}
        onCreate={state.createListing}
      />
      <CategoryGrid onChooseCategory={chooseCategory} primaryOnly />
      <FeaturedListingsSection
        listings={visibleListings}
        savedIds={state.savedIds}
        onSavedToggle={state.toggleSaved}
        onListingSelect={state.selectListing}
      />
      <HowItWorksSection />
      <FinalCTASection onCreate={state.createListing} />
    </AppPage>
  );
}
