import { createFileRoute } from "@tanstack/react-router";

import { AppPage } from "@/components/swap/app-page";
import { GiftsPage } from "@/components/swap/gifts-page";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/presentes")({
  head: () => ({
    meta: [
      { title: `Presentes — ${BRAND_NAME}` },
      {
        name: "description",
        content: "Escolha seus presentes de demonstração de boas-vindas e do evento.",
      },
    ],
  }),
  component: Presentes,
});

function Presentes() {
  return (
    <AppPage>
      <GiftsPage />
    </AppPage>
  );
}
