import { createFileRoute } from "@tanstack/react-router";

import { AppPage } from "@/components/swap/app-page";
import { TrustSection } from "@/components/swap/landing-sections";
import { BRAND_NAME } from "@/lib/brand";

export const Route = createFileRoute("/seguranca")({
  head: () => ({
    meta: [
      { title: `Segurança — ${BRAND_NAME}` },
      { name: "description", content: "Boas práticas e regras para negociar com segurança." },
    ],
  }),
  component: Seguranca,
});

function Seguranca() {
  return (
    <AppPage>
      <TrustSection />
      <section className="market">
        <div className="container">
          <div className="section-eyebrow">Regras da comunidade</div>
          <h1>Combine com cuidado.</h1>
          <div className="market-grid">
            <article className="market-item">
              <h2>Proteja suas contas</h2>
              <p>Nunca compartilhe senhas nem venda contas pessoais.</p>
            </article>
            <article className="market-item">
              <h2>Confira antes de trocar</h2>
              <p>Converse diretamente e confirme os detalhes antes de qualquer acordo.</p>
            </article>
            <article className="market-item">
              <h2>Prévia demonstrativa</h2>
              <p>
                Anúncios, perfis, pagamentos e contatos não são verificados nem processados pela
                {` ${BRAND_NAME}`}.
              </p>
            </article>
          </div>
        </div>
      </section>
    </AppPage>
  );
}
