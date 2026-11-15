import {
  ArrowLeftRight,
  ArrowUpRight,
  AudioLines,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Eye,
  FileText,
  GraduationCap,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import deskImage from "@/assets/community-desk.jpg";
import { categories, events } from "@/components/swap/data";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

type CategoryAction = {
  onChooseCategory: (name: string) => void;
};

export function HeroSection({
  onChooseCategory,
  onDiscover,
  onCreate,
}: CategoryAction & { onDiscover: () => void; onCreate: () => void }) {
  const floatingCategories = [
    {
      cls: "float-stream",
      icon: AudioLines,
      number: "01",
      cat: "STREAMING",
      name: "Vídeo & música",
      foot: "Explore no mural",
    },
    {
      cls: "float-tools",
      icon: Sparkles,
      number: "03",
      cat: "FERRAMENTAS",
      name: "IA & software",
      foot: "Explore no mural",
    },
    {
      cls: "float-study",
      icon: BookOpen,
      number: "02",
      cat: "ESTUDOS",
      name: "Cursos & idiomas",
      foot: "Explore no mural",
    },
    {
      cls: "float-service",
      icon: BriefcaseBusiness,
      number: "04",
      cat: "SERVIÇOS",
      name: "Projetos & freela",
      foot: "Explore no mural",
    },
  ];
  const categoryByLabel: Record<string, string> = {
    STREAMING: "Streaming",
    ESTUDOS: "Estudos",
    FERRAMENTAS: "Ferramentas",
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-meta reveal">
          <div className="hero-label">
            <span className="status-dot" /> CONEXÕES QUE VALEM MAIS
          </div>
          <div className="hero-meta-right">
            <span>FORTALEZA, CE</span>
            <span>UNIFOR / 2026</span>
          </div>
        </div>
        <div className="hero-stage reveal">
          <h1 className="hero-wordmark">
            {BRAND_NAME}
            <span className="wordmark-dot">.</span>
          </h1>
          {floatingCategories.map((category) => (
            <Link
              to="/mural"
              key={category.cls}
              onClick={() => {
                const selectedCategory = categoryByLabel[category.cat];
                if (selectedCategory) onChooseCategory(selectedCategory);
              }}
              className={`floating-card ${category.cls}`}
            >
              <div className="float-top">
                <category.icon />
                <span>
                  {category.number} <ArrowUpRight size={11} />
                </span>
              </div>
              <small>{category.cat}</small>
              <h3>{category.name}</h3>
              <div className="float-foot">
                <span>{category.foot}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="hero-bottom reveal">
          <h2>{BRAND_TAGLINE}</h2>
          <p>Troque assinaturas, compartilhe talentos e descubra possibilidades na Unifor.</p>
          <div className="hero-ctas">
            <Button variant="brand" asChild>
              <Link to="/mural" onClick={() => onChooseCategory("Todos")}>
                Explorar trocas <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" onClick={onCreate}>
              Anunciar o que tenho <Plus />
            </Button>
            <Button variant="ghost" onClick={onDiscover}>
              Descobrir uma troca <ArrowLeftRight />
            </Button>
          </div>
          <div className="hero-note">
            <ShieldCheck size={13} /> Sem custo para trocar. De aluno para aluno.
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-label="Atividades ilustrativas do mural">
      <div className="ticker-label">
        <i /> NO MURAL
      </div>
      <div className="ticker-track">
        {[...events, ...events].map((event, index) => (
          <span key={`${event}-${index}`}>
            {event}
            <b>↗</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CategoryGrid({
  onChooseCategory,
  primaryOnly = false,
}: CategoryAction & { primaryOnly?: boolean }) {
  const visibleCategories = primaryOnly ? categories.slice(0, 4) : categories;

  return (
    <section className="categories">
      <div className="container">
        <div className="section-eyebrow">Encontre sua próxima troca</div>
        <div className="category-grid">
          {visibleCategories.map((category) => (
            <Link
              to="/mural"
              onClick={() => onChooseCategory(category.name)}
              className="category"
              key={category.id}
            >
              <div className={`category-icon ${category.color}`}>
                <category.icon size={25} strokeWidth={1.5} />
              </div>
              <div>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
                <small>EXPLORAR CATEGORIA</small>
              </div>
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </div>
        {primaryOnly && (
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link to="/mural">Ver todas as categorias</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    [
      "Anuncie o que você tem",
      "Escolha a categoria, descreva o plano e diga o que você quer em troca.",
    ],
    ["Encontre um par", "Veja no mural quem tem o que você procura e precisa do que você oferece."],
    ["Conecte e combine", "Converse com a outra pessoa e combine os detalhes da troca."],
  ];

  return (
    <section className="how" id="como-funciona">
      <div className="container how-layout scroll-reveal">
        <div>
          <div className="section-eyebrow">Simples assim</div>
          <h2>
            Menos assinatura parada.
            <br />
            Mais possibilidades.
          </h2>
          {steps.map(([title, description], index) => (
            <div className="step" key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="how-photo">
          <img
            src={deskImage}
            alt="Fones de ouvido, notebook e materiais de estudo sobre uma mesa"
            loading="lazy"
            width={1536}
            height={1024}
          />
          <div className="photo-tag">
            <ArrowLeftRight size={23} />
            <span>
              O que conecta a gente
              <br />
              vai além da sala de aula.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="affiliate">
      <div className="container affiliate-layout">
        <div>
          <div className="section-eyebrow">Pronto para fazer uma troca?</div>
          <h2>Tem algo parado? Anuncie em um minuto.</h2>
          <Button variant="brand" onClick={onCreate}>
            Anunciar agora <ArrowUpRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Sem custo para trocar",
      desc: "Trocas entre assinaturas são gratuitas.",
    },
    { icon: Eye, title: "Mural aberto", desc: "Descubra oportunidades da comunidade." },
    { icon: Users, title: "De aluno para aluno", desc: "Feito para a comunidade Unifor." },
    {
      icon: LockKeyhole,
      title: "Sua segurança importa",
      desc: "Combine os detalhes antes de trocar.",
    },
  ];

  return (
    <section className="trust" id="seguranca">
      <div className="container trust-grid">
        {trustItems.map((item) => (
          <div className="trust-item" key={item.title}>
            <item.icon />
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type InfoAction = {
  onAction: (title: string) => void;
};

export function MarketplaceSection({ onAction }: InfoAction) {
  const opportunities = [
    {
      icon: Code2,
      title: "Projetos & código",
      desc: "Publique projetos prontos, scripts e templates para outros alunos.",
      cta: "Anunciar projeto",
    },
    {
      icon: BriefcaseBusiness,
      title: "Serviços",
      desc: "Ofereça freelas, aulas particulares e consultorias dentro da comunidade.",
      cta: "Oferecer serviço",
    },
    {
      icon: FileText,
      title: "Infoprodutos",
      desc: "Compartilhe e-books, resumos e materiais de estudo com outros alunos.",
      cta: "Publicar infoproduto",
    },
  ];

  return (
    <section className="market scroll-reveal" id="vender">
      <div className="container">
        <div className="section-eyebrow">Seu talento também tem espaço</div>
        <div className="section-head">
          <div>
            <h2>Mais que trocas. Oportunidades.</h2>
            <p>Transforme o que você sabe em algo que a comunidade precisa.</p>
          </div>
        </div>
        <div className="market-grid">
          {opportunities.map((item, index) => (
            <article className="market-item" key={item.title}>
              <div className="market-top">
                <span>0{index + 1}</span>
                <item.icon size={24} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Button
                variant="link"
                className="p-0 h-auto text-xs"
                onClick={() => onAction(item.cta)}
              >
                {item.cta} <ArrowUpRight />
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AffiliateSection({ onAction }: InfoAction) {
  return (
    <section className="affiliate" id="indique">
      <div className="container affiliate-layout scroll-reveal">
        <div>
          <div className="section-eyebrow mb-4">Boas conexões merecem retorno</div>
          <h2>
            Indique. Conecte.
            <br />
            <em>Ganhe com a comunidade.</em>
          </h2>
          <p>
            Compartilhe seu link de indicação. A cada duas vendas confirmadas pela sua indicação,
            você ganha comissão.
          </p>
          <Button variant="brand" onClick={() => onAction("Programa de indicação")}>
            Conhecer o programa <ArrowUpRight />
          </Button>
        </div>
        <div className="affiliate-stat">
          2×
          <small>
            VENDAS PARA LIBERAR
            <br />A PRIMEIRA COMISSÃO
          </small>
        </div>
      </div>
    </section>
  );
}
