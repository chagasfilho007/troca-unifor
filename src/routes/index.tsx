import { createFileRoute } from "@tanstack/react-router";

import { IntroExperience } from "@/components/intro/intro-experience";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

import introCss from "../intro.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — ${BRAND_TAGLINE}` },
      {
        name: "description",
        content: "Conheça a comunidade de trocas, serviços e projetos entre alunos da Unifor.",
      },
      { property: "og:title", content: `${BRAND_NAME} — ${BRAND_TAGLINE}` },
      {
        property: "og:description",
        content: "Conecte o que você tem ao que precisa na comunidade Unifor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: introCss }],
  }),
  component: IntroRoute,
});

function IntroRoute() {
  return <IntroExperience />;
}
