import type { Dispatch, SetStateAction } from "react";
import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";

const eventGifts = [
  "1 mês de streaming",
  "1 mês de ferramenta de IA, design ou produtividade",
  "1 mês de curso ou preparação para provas",
];

type GiftsContentProps = {
  gameItems: string[];
  welcomeGift: string[];
  setWelcomeGift: Dispatch<SetStateAction<string[]>>;
  claimedWelcomeGift: string[] | null;
  setClaimedWelcomeGift: Dispatch<SetStateAction<string[] | null>>;
  eventGift: string | null;
  setEventGift: Dispatch<SetStateAction<string | null>>;
  requireUser: (action: () => void) => void;
  onToast: (message: string) => void;
};

export function GiftsContent({
  gameItems,
  welcomeGift,
  setWelcomeGift,
  claimedWelcomeGift,
  setClaimedWelcomeGift,
  eventGift,
  setEventGift,
  requireUser,
  onToast,
}: GiftsContentProps) {
  return (
    <>
      <section className="market community-extras" id="gift">
        <div className="container">
          <div className="section-eyebrow">
            <Gift size={14} /> Presente de boas-vindas
          </div>
          <h2>Escolha 2 assinaturas de demonstração</h2>
          <p>Uma escolha por perfil local. Nenhuma assinatura será entregue automaticamente.</p>
          {claimedWelcomeGift ? (
            <p className="prototype-note">
              Seleção de demonstração: {claimedWelcomeGift.join(" e ")}.
            </p>
          ) : (
            <>
              <div className="combo-options">
                {gameItems.map((item) => {
                  const checked = welcomeGift.includes(item);
                  return (
                    <button
                      className={`combo-option${checked ? " selected" : ""}`}
                      key={item}
                      type="button"
                      aria-pressed={checked}
                      disabled={!checked && welcomeGift.length >= 2}
                      onClick={() =>
                        setWelcomeGift((current) =>
                          checked ? current.filter((entry) => entry !== item) : [...current, item],
                        )
                      }
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="brand"
                disabled={welcomeGift.length !== 2}
                onClick={() =>
                  requireUser(() => {
                    setClaimedWelcomeGift(welcomeGift);
                    onToast("Presente salvo nesta sessão de demonstração");
                  })
                }
              >
                Resgatar meu presente
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="market community-extras" id="presente-evento">
        <div className="container event-panel">
          <div className="section-eyebrow">
            <Gift size={14} /> Ação no campus
          </div>
          <h2>Presente do evento</h2>
          {eventGift ? (
            <p>Você escolheu: {eventGift}.</p>
          ) : (
            <>
              <p>Escolha 1 opção de demonstração. Uma escolha local por perfil.</p>
              <div className="combo-options">
                {eventGifts.map((item) => (
                  <button
                    className="combo-option"
                    key={item}
                    type="button"
                    onClick={() =>
                      requireUser(() => {
                        setEventGift(item);
                        onToast("Presente escolhido nesta sessão");
                      })
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
