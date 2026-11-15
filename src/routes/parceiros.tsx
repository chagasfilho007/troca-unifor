import { createFileRoute } from "@tanstack/react-router";

import { AppPage } from "@/components/swap/app-page";
import { PartnersPage } from "@/components/swap/partners-page";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: `Parceiros — ${BRAND_NAME}` },
      {
        name: "description",
        content: "Conheça o programa de indicação ilustrativo da comunidade.",
      },
    ],
  }),
  component: Parceiros,
});

function Parceiros() {
  return (
    <AppPage>
      <PartnersPage />
    </AppPage>
  );
}
