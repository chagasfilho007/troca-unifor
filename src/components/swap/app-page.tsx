import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { QuickActions } from "@/components/swap/quick-actions";
import { useAppState } from "@/components/swap/app-state-context";
import { SiteFooter, SiteHeader } from "@/components/swap/site-chrome";

export function AppPage({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const state = useAppState();

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const chooseView = (view: "mural" | "saved" | "mine") => {
    if (view !== "mural" && !state.user) {
      state.openLogin();
      return;
    }
    state.setView(view);
    void navigate({ to: "/mural" });
  };
  const chooseCategory = (category: string) => {
    state.setCategoryFilter(category);
    state.setView("mural");
    void navigate({ to: "/mural" });
  };

  return (
    <>
      <SiteHeader
        onLogin={state.openLogin}
        onSignOut={state.signOut}
        onCreateListing={state.createListing}
        user={state.user}
      />
      <main>{children}</main>
      <SiteFooter />
      <QuickActions
        onView={chooseView}
        onCreate={state.createListing}
        onLogin={state.openLogin}
        onDiscover={state.discoverListing}
        onCategory={chooseCategory}
      />
    </>
  );
}
