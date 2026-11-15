import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Command, Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { categories } from "@/components/swap/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type View = "mural" | "saved" | "mine";

const destinations = [
  { title: "Início", to: "/inicio" },
  { title: "Loja e combos", to: "/loja" },
  { title: "Programa de parceiros", to: "/parceiros" },
  { title: "Presentes", to: "/presentes" },
  { title: "Segurança", to: "/seguranca" },
  { title: "Como funciona", to: "/inicio", hash: "como-funciona" },
] as const;

export function QuickActions({
  onView,
  onCreate,
  onLogin,
  onDiscover,
  onCategory,
}: {
  onView: (view: View) => void;
  onCreate: () => void;
  onLogin: () => void;
  onDiscover: () => void;
  onCategory: (category: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const actions = useMemo(
    () => [
      { title: "Anunciar algo", run: onCreate },
      { title: "Descobrir uma troca aleatória", run: onDiscover },
      { title: "Entrar na demonstração", run: onLogin },
      ...[
        ["Mural", "mural"],
        ["Salvos", "saved"],
        ["Meus anúncios", "mine"],
      ].map(([title, view]) => ({ title, run: () => onView(view as View) })),
      ...destinations.map((destination) => ({
        title: destination.title,
        run: () =>
          void navigate(
            "hash" in destination
              ? { to: destination.to, hash: destination.hash }
              : { to: destination.to },
          ),
      })),
      ...categories.map(({ name }) => ({
        title: `Categoria: ${name}`,
        run: () => onCategory(name),
      })),
    ],
    [navigate, onCategory, onCreate, onDiscover, onLogin, onView],
  );
  const visibleActions = actions.filter((action) =>
    action.title.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR")),
  );

  useEffect(() => {
    let goPrefixAt = 0;
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        setQuery("");
        return;
      }
      const target = event.target;
      if (open) return;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      )
        return;
      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        void navigate({ to: "/mural" });
      } else if (event.key.toLowerCase() === "n") {
        onCreate();
      } else if (event.key.toLowerCase() === "g") {
        goPrefixAt = Date.now();
      } else if (Date.now() - goPrefixAt < 900) {
        const view = { m: "mural", s: "saved", a: "mine" }[event.key.toLowerCase()] as
          View | undefined;
        if (view) onView(view);
        goPrefixAt = 0;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate, onCreate, onView, open]);

  return (
    <>
      <Button
        className="quick-search-trigger"
        variant="ink"
        onClick={() => {
          setOpen(true);
          setQuery("");
        }}
        aria-label="Abrir busca rápida"
      >
        <Search size={16} /> <span>Buscar</span> <kbd>Ctrl K</kbd>
      </Button>
      <nav className="mobile-tabs" aria-label="Atalhos">
        <button type="button" onClick={() => onView("mural")}>
          ⌂<small>Mural</small>
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setQuery("");
          }}
        >
          ⌕<small>Buscar</small>
        </button>
        <button type="button" onClick={onCreate}>
          ＋<small>Anunciar</small>
        </button>
        <button type="button" onClick={() => onView("saved")}>
          ♡<small>Salvos</small>
        </button>
        <button type="button" onClick={() => onView("mine")}>
          ☰<small>Meus</small>
        </button>
      </nav>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="quick-actions-dialog">
          <DialogHeader>
            <DialogTitle>
              <Command size={17} /> Busca rápida
            </DialogTitle>
            <DialogDescription>Busque seções e ações · Esc fecha</DialogDescription>
          </DialogHeader>
          <label className="listing-search">
            <Search size={16} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar uma ação ou seção..."
            />
          </label>
          <div className="quick-action-list">
            {visibleActions.map((action) => (
              <button
                type="button"
                key={action.title}
                onClick={() => {
                  setOpen(false);
                  action.run();
                }}
              >
                <span>{action.title}</span>
                <ArrowUp size={13} />
              </button>
            ))}
            {!visibleActions.length && <p>Nenhuma ação encontrada.</p>}
          </div>
          <p className="prototype-note">
            Atalhos: Ctrl/⌘ K abre a busca, / vai para pesquisar anúncios, N abre anúncio e G
            seguido de M/S/A muda a lista.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
