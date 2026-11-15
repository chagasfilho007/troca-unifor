import { createFileRoute } from "@tanstack/react-router";

import { AppPage } from "@/components/swap/app-page";
import { StorePage } from "@/components/swap/store-page";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: `Loja e combos — ${BRAND_NAME}` },
      { name: "description", content: "Explore produtos e combos ilustrativos da comunidade." },
    ],
  }),
  component: Loja,
});

function Loja() {
  return (
    <AppPage>
      <StorePage />
    </AppPage>
  );
}
