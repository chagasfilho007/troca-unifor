import { CommunityFeatures } from "@/components/swap/community-features";
import { useAppState } from "@/components/swap/app-state-context";

export function PartnersPage() {
  const { user, openLogin, toast } = useAppState();
  return <CommunityFeatures user={user} onLogin={openLogin} onToast={toast} page="partners" />;
}
