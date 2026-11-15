import type { Dispatch, SetStateAction } from "react";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/swap/data";

type PartnersContentProps = {
  user: DemoUser | null;
  onLogin: () => void;
  onToast: (message: string) => void;
  referralCode: string;
  referrals: number;
  setReferrals: Dispatch<SetStateAction<number>>;
  referralTarget: number;
  sales: number;
  setSales: Dispatch<SetStateAction<number>>;
  salesTarget: number;
  commission: number;
  rewardItems: string[];
  reward: string | null;
  setReward: Dispatch<SetStateAction<string | null>>;
};

export function PartnersContent({
  user,
  onLogin,
  onToast,
  referralCode,
  referrals,
  setReferrals,
  referralTarget,
  sales,
  setSales,
  salesTarget,
  commission,
  rewardItems,
  reward,
  setReward,
}: PartnersContentProps) {
  return (
    <section className="affiliate community-affiliate" id="partners">
      <div className="container">
        <div className="affiliate-layout">
          <div>
            <div className="section-eyebrow">
              <Users size={14} /> Programa de parceiros
            </div>
            <h2>
              Indique. Conecte.
              <br />
              <em>Ganhe com a comunidade.</em>
            </h2>
            <p>
              Progresso e recompensas são apenas uma simulação local, sem vendas nem comissão reais.
            </p>
            {!user ? (
              <Button variant="brand" onClick={onLogin}>
                Entrar na demonstração
              </Button>
            ) : (
              <div className="partner-progress">
                <strong>Seu código: {referralCode}</strong>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.clipboard)
                      void navigator.clipboard.writeText(referralCode).then(
                        () => onToast("Código copiado"),
                        () => onToast(`Seu código: ${referralCode}`),
                      );
                    else onToast(`Seu código: ${referralCode}`);
                  }}
                >
                  Copiar código
                </Button>
                <Button variant="outline" onClick={() => setReferrals((value) => value + 1)}>
                  Simular indicação
                </Button>
                <p>
                  Indicações: {referrals}/{referralTarget} · vendas: {sales}/{salesTarget} ·
                  comissão demonstrativa: {commission}%
                </p>
                <Button variant="outline" onClick={() => setSales((value) => value + 1)}>
                  Simular venda confirmada
                </Button>
                {referrals >= referralTarget && !reward && (
                  <div className="combo-options">
                    <p>Escolha sua recompensa de demonstração:</p>
                    {rewardItems.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="combo-option"
                        onClick={() => {
                          setReward(item);
                          onToast("Recompensa escolhida nesta sessão");
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
                {reward && <p>Recompensa selecionada: {reward}.</p>}
              </div>
            )}
          </div>
          <div className="affiliate-stat">
            2×<small>VENDAS PARA LIBERAR A COMISSÃO</small>
          </div>
        </div>
      </div>
    </section>
  );
}
