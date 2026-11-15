import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

import { categories, filterListings, listings } from "@/components/swap/data";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { getSceneProgress } from "@/components/intro/scene-progress";

const SCENE_COUNT = 7;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function IntroExperience() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Replace the mock frames with videos in public/intro/ and map each video's currentTime to --p.
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let frame = 0;

    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const range = scrollContainer.offsetHeight - window.innerHeight;
        const progress =
          range > 0
            ? Math.min(1, Math.max(0, -scrollContainer.getBoundingClientRect().top / range))
            : 0;
        scrollContainer.style.setProperty("--p", String(progress));
        for (let index = 0; index < SCENE_COUNT; index += 1) {
          const sceneProgress = getSceneProgress(progress, index, SCENE_COUNT);
          const opacity =
            index === 0
              ? Math.max(0, 1 - sceneProgress * 2)
              : index === SCENE_COUNT - 1
                ? sceneProgress
                : Math.max(0, 1 - Math.abs(sceneProgress - 0.5) * 2);
          scrollContainer.style.setProperty(`--scene-${index}`, String(sceneProgress));
          scrollContainer.style.setProperty(`--scene-${index}-opacity`, String(opacity));
          scrollContainer.style.setProperty(
            `--scene-${index}-y`,
            `${(1 - opacity) * (index === 0 ? -40 : 24)}px`,
          );
          if (index === 0) {
            scrollContainer.style.setProperty("--scene-0-scale", String(1 - sceneProgress * 0.45));
          }
          if (index === 1) {
            scrollContainer.style.setProperty(
              "--typed-opacity",
              String(clamp01((sceneProgress - 0.2) / 0.35)),
            );
            scrollContainer.style.setProperty(
              "--new-listing-opacity",
              String(clamp01((sceneProgress - 0.68) / 0.25)),
            );
          }
          if (index === 4) {
            for (let item = 0; item < 3; item += 1) {
              const entrance = clamp01((sceneProgress - item * 0.2) / 0.3);
              scrollContainer.style.setProperty(`--product-${item}-opacity`, String(entrance));
              scrollContainer.style.setProperty(`--product-${item}-y`, `${(1 - entrance) * 18}px`);
              scrollContainer.style.setProperty(
                `--cart-${item}-opacity`,
                String(sceneProgress > 0.28 + item * 0.17 ? 1 : 0),
              );
              scrollContainer.style.setProperty(
                `--combo-${item}-opacity`,
                String(sceneProgress > 0.42 + item * 0.14 ? 1 : 0),
              );
            }
          }
          if (index === 5) {
            scrollContainer.style.setProperty(
              "--gift-0-rotation",
              `${Math.min(180, sceneProgress * 360)}deg`,
            );
            scrollContainer.style.setProperty(
              "--gift-1-rotation",
              `${Math.min(180, Math.max(0, (sceneProgress - 0.24) * 360))}deg`,
            );
          }
        }
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const sceneListings = listings.slice(0, 3);
  const searchListings = filterListings(listings, "Todos", "inglês", [], { sort: "price" });

  return (
    <div className="intro-scroll" ref={scrollRef}>
      <header className="intro-top">
        <span className="intro-logo" aria-hidden="true">
          {BRAND_NAME}
        </span>
        <Link to="/inicio" className="intro-skip">
          Pular intro
        </Link>
        <Link to="/inicio" className="intro-start">
          Iniciar
        </Link>
      </header>
      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
      <div className="intro-stage">
        <section className="intro-scene intro-scene-0">
          <div className="intro-opening">
            <h1 tabIndex={0}>{BRAND_NAME}</h1>
            <p>{BRAND_TAGLINE}</p>
            <span>
              ROLE PARA DESCOBRIR <b aria-hidden="true">↓</b>
            </span>
          </div>
          <div className="intro-opening-cards" aria-hidden="true">
            {categories.slice(0, 3).map((category, index) => (
              <div className={`intro-float intro-float-${index}`} key={category.id}>
                <category.icon />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="intro-scene intro-scene-1">
          <div className="intro-copy">
            <span>01 — ANUNCIE</span>
            <h2>Anuncie o que você tem</h2>
            <p>Conte o que está parado e diga o que gostaria de encontrar.</p>
          </div>
          <div className="intro-frame" aria-hidden="true">
            <div className="intro-window-bar">
              <i />
              <i />
              <i />
              <span>hubora.app/mural</span>
            </div>
            <div className="intro-demo-layout">
              <div className="intro-demo-form">
                <b>Novo anúncio</b>
                <small>O que você tem?</small>
                <div className="intro-demo-field">
                  Curso de <span className="intro-typed">inglês avançado</span>
                </div>
                <small>O que procura?</small>
                <div className="intro-demo-field">Curso de espanhol</div>
                <span className="intro-demo-submit">Publicar anúncio</span>
              </div>
              <div className="intro-demo-listing">
                <span>ESTUDOS</span>
                <b>{sceneListings[2].name}</b>
                <small>Troca ou venda · demonstração</small>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-scene intro-scene-2">
          <div className="intro-copy">
            <span>02 — ENCONTRE</span>
            <h2>Encontre um par</h2>
            <p>Pesquise, compare e salve os anúncios que combinam com você.</p>
          </div>
          <div className="intro-frame" aria-hidden="true">
            <div className="intro-window-bar">
              <i />
              <i />
              <i />
              <span>Busca no mural</span>
            </div>
            <div className="intro-demo-search">
              ⌕ <b>inglês</b>
              <span>{searchListings.length} resultados</span>
            </div>
            <div className="intro-demo-results">
              {searchListings.map((listing, index) => (
                <div className="intro-result" key={listing.id}>
                  <span className={`intro-result-icon ${listing.color}`}>
                    <listing.icon />
                  </span>
                  <div>
                    <small>{listing.cat}</small>
                    <b>{listing.name}</b>
                  </div>
                  <span className={`intro-heart${index === 0 ? " intro-heart-saved" : ""}`}>
                    {index === 0 ? "♥" : "♡"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intro-scene intro-scene-3">
          <div className="intro-copy">
            <span>03 — CONECTE</span>
            <h2>Conecte e combine</h2>
            <p>Converse sobre os detalhes e combine tudo entre vocês.</p>
          </div>
          <div className="intro-frame intro-phone" aria-hidden="true">
            <div className="intro-window-bar">
              <i />
              <i />
              <i />
              <span>Prévia de conversa</span>
            </div>
            <div className="intro-chat-title">{sceneListings[2].name}</div>
            <div className="intro-chat-bubble">Oi! Tenho interesse no seu anúncio.</div>
            <div className="intro-chat-bubble intro-chat-bubble-own">
              Legal! Vamos combinar os detalhes.
            </div>
            <div className="intro-demo-contact">
              Chamar no WhatsApp <span>→</span>
            </div>
            <small className="intro-demo-note">Conversa simulada · nenhum contato é aberto</small>
          </div>
        </section>

        <section className="intro-scene intro-scene-4">
          <div className="intro-copy">
            <span>04 — EXPLORE</span>
            <h2>Loja e combos</h2>
            <p>Descubra produtos ilustrativos e monte seu combo.</p>
          </div>
          <div className="intro-frame" aria-hidden="true">
            <div className="intro-window-bar">
              <i />
              <i />
              <i />
              <span>Loja de demonstração</span>
            </div>
            <div className="intro-demo-products">
              {["Jogos para PC", "Streaming", "Curso de inglês"].map((item, index) => (
                <div className={`intro-product intro-product-${index}`} key={item}>
                  <span>{index === 0 ? "▧" : index === 1 ? "♫" : "Aa"}</span>
                  <b>{item}</b>
                  <small>Produto ilustrativo</small>
                </div>
              ))}
            </div>
            <div className="intro-demo-cart">
              Carrinho
              <b className="intro-cart-count">
                {[0, 1, 2].map((item) => (
                  <span key={item}>{item + 1}</span>
                ))}
              </b>
            </div>
            <div className="intro-demo-combo">
              Combo selecionado
              <span className="intro-combo-checks">
                {[0, 1, 2].map((item) => (
                  <b key={item}>✓</b>
                ))}
              </span>
            </div>
          </div>
        </section>

        <section className="intro-scene intro-scene-5">
          <div className="intro-copy">
            <span>05 — COMPARTILHE</span>
            <h2>Presentes e parceiros</h2>
            <p>Escolhas de demonstração e um código para compartilhar.</p>
          </div>
          <div className="intro-frame" aria-hidden="true">
            <div className="intro-window-bar">
              <i />
              <i />
              <i />
              <span>Comunidade HuBora</span>
            </div>
            <div className="intro-demo-gifts">
              <div className="intro-gift-card intro-gift-card-0">
                <span>
                  ✦<b>Streaming</b>
                  <small>Presente de boas-vindas</small>
                </span>
              </div>
              <div className="intro-gift-card intro-gift-card-1">
                <span>
                  ✧<b>Estudos</b>
                  <small>Presente do evento</small>
                </span>
              </div>
            </div>
            <div className="intro-referral">
              <small>SEU CÓDIGO DE INDICAÇÃO</small>
              <b>HUBORA-DEMO</b>
            </div>
            <small className="intro-demo-note">Sem entrega de assinatura ou comissão real</small>
          </div>
        </section>

        <section className="intro-scene intro-scene-6">
          <div className="intro-finale">
            <span>HU BORA · UNIFOR</span>
            <h2>Pronto para começar?</h2>
            <p>{BRAND_TAGLINE}</p>
            <Link to="/inicio" className="intro-final-button">
              Iniciar <b>↗</b>
            </Link>
          </div>
          <div className="intro-finale-glow" aria-hidden="true" />
        </section>
      </div>
    </div>
  );
}
