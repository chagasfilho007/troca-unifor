import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Gift,
  Menu,
  Moon,
  Plus,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/swap/data";
import { BRAND_NAME } from "@/lib/brand";

export function Logo() {
  return (
    <Link to="/inicio" className="logo" aria-label={`${BRAND_NAME}, início`}>
      <ArrowLeftRight className="logo-mark" />
      {BRAND_NAME}
      <span className="logo-dot">.</span>
    </Link>
  );
}

type SiteHeaderProps = {
  onLogin: () => void;
  onSignOut: () => void;
  onCreateListing: () => void;
  user: DemoUser | null;
};

export function SiteHeader({ onLogin, onSignOut, onCreateListing, user }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
  const [sound, setSound] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("troca-theme");
      if (saved === "dark" || saved === "light" || saved === "auto") {
        setTheme(saved);
        document.documentElement.dataset.theme = saved;
      }
      setSound(localStorage.getItem("troca-snd") !== "off");
    } catch {
      document.documentElement.dataset.theme = "auto";
    }
  }, []);

  useEffect(() => {
    if (!sound) return;
    let context: AudioContext | null = null;
    const playButtonTone = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("button")) return;
      try {
        context ??= new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 660;
        gain.gain.setValueAtTime(0.025, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.06);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.07);
      } catch {
        // Audio is an optional browser effect.
      }
    };
    document.addEventListener("click", playButtonTone);
    return () => {
      document.removeEventListener("click", playButtonTone);
      void context?.close();
    };
  }, [sound]);

  const toggleTheme = () => {
    const next = theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("troca-theme", next);
    } catch {
      // Theme selection still works for the current page when storage is unavailable.
    }
  };
  const toggleSound = () => {
    setSound((enabled) => !enabled);
    try {
      localStorage.setItem("troca-snd", sound ? "off" : "on");
    } catch {
      // The sound preference remains active for the current page.
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>FEITO POR ALUNOS. PARA ALUNOS.</span>
          <div className="topbar-links">
            <Link to="/presentes">PRESENTES</Link>
            <a href="https://www.unifor.br" target="_blank" rel="noreferrer">
              COMUNIDADE UNIFOR <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav">
          <div className="nav-left">
            <Logo />
            <nav className="nav-links" aria-label="Principal">
              <Link to="/mural">Mural</Link>
              <Link to="/loja">Loja</Link>
              <Link to="/presentes">Presentes</Link>
              <Link to="/parceiros">Parceiros</Link>
              <Link to="/inicio" hash="como-funciona">
                Como funciona
              </Link>
            </nav>
          </div>
          <div className="nav-actions">
            <Button variant="ghost" className="nav-login" onClick={user ? onSignOut : onLogin}>
              {user ? `Sair (${user.name.split(" ")[0]})` : "Entrar"} <ArrowUpRight />
            </Button>
            <Button variant="ink" onClick={onCreateListing}>
              Anunciar <Plus />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Alternar tema"
              title={`Tema: ${theme}`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={sound ? "Desligar sons" : "Ligar sons"}
              aria-pressed={sound}
              onClick={toggleSound}
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="menu-trigger"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Menu móvel">
            <Link to="/mural" onClick={() => setMenuOpen(false)}>
              Mural
            </Link>
            <Link to="/loja" onClick={() => setMenuOpen(false)}>
              Loja
            </Link>
            <Link to="/presentes" onClick={() => setMenuOpen(false)}>
              Presentes
            </Link>
            <Link to="/parceiros" onClick={() => setMenuOpen(false)}>
              Parceiros
            </Link>
            <Link to="/inicio" hash="como-funciona" onClick={() => setMenuOpen(false)}>
              Como funciona
            </Link>
            <button
              type="button"
              className="mobile-menu-action"
              onClick={() => {
                setMenuOpen(false);
                onCreateListing();
              }}
            >
              <Plus size={15} /> Anunciar
            </button>
            <button
              type="button"
              className="mobile-menu-action"
              onClick={() => {
                setMenuOpen(false);
                if (user) onSignOut();
                else onLogin();
              }}
            >
              {user ? "Sair do perfil demo" : "Entrar na demonstração"}
            </button>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Trocas, serviços e projetos entre alunos da Unifor. Conexões que fazem a vida
              universitária render mais.
            </p>
          </div>
          <div className="footer-col">
            <h3>Explore</h3>
            <Link to="/mural">Mural</Link>
            <Link to="/loja">Loja</Link>
            <Link to="/presentes">Presentes</Link>
          </div>
          <div className="footer-col">
            <h3>Na comunidade</h3>
            <Link to="/parceiros">Parceiros</Link>
            <Link to="/seguranca">Segurança e regras</Link>
          </div>
          <div className="footer-col">
            <h3>{BRAND_NAME}</h3>
            <Link to="/inicio" hash="como-funciona">
              Como funciona
            </Link>
            <a href="https://www.unifor.br" target="_blank" rel="noreferrer">
              Conheça a Unifor ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {BRAND_NAME}. FEITO POR ALUNOS DA UNIFOR.</span>
          <span>
            FORTALEZA — CE <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
