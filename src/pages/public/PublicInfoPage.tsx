import {
  BadgeCheck,
  ChefHat,
  ClipboardCheck,
  HeartHandshake,
  HelpCircle,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";

type PublicPageKind = "about" | "how" | "safety" | "cooker" | "delivery" | "help" | "contact" | "discover";

const pageContent = {
  about: {
    eyebrow: "Our mission",
    title: "Bringing neighborly warmth to every table.",
    description:
      "Freshtively is built around the idea that the most meaningful food often comes from home kitchens, family recipes, and cultural memory.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80",
  },
  how: {
    eyebrow: "How it works",
    title: "From local kitchen to your door, with every handoff visible.",
    description:
      "Customers discover food, cookers accept and prepare orders, and delivery partners complete pickup and drop-off with clear status updates.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80",
  },
  safety: {
    eyebrow: "Safety and trust",
    title: "Verification, visibility, and support are part of the product.",
    description:
      "Cooker documents, delivery documents, reviews, support tickets, and admin monitoring keep the marketplace accountable.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
  },
  cooker: {
    eyebrow: "Cook with Freshtively",
    title: "Share your cultural cooking as a trusted local kitchen.",
    description:
      "Create a profile, verify your kitchen, list dishes, set availability, accept orders, and build a flexible food business.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=80",
  },
  delivery: {
    eyebrow: "Deliver with Freshtively",
    title: "Help homemade food move through the neighborhood.",
    description:
      "Verify your vehicle documents, set availability, accept nearby requests, and complete careful food handoffs.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1400&q=80",
  },
  help: {
    eyebrow: "Help center",
    title: "Answers for customers, cookers, and delivery partners.",
    description:
      "Find quick guidance on accounts, ordering, verification, delivery handoffs, support tickets, and safety workflows.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch with Freshtively.",
    description:
      "Reach out for support, cooker onboarding, delivery partnerships, or local community launch questions.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  },
  discover: {
    eyebrow: "Discover",
    title: "Explore homemade cultural food near you.",
    description:
      "Search and filter UI is live as a public preview. Firestore-powered discovery is connected in the consumer dashboard phase.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
  },
} satisfies Record<PublicPageKind, { eyebrow: string; title: string; description: string; image: string }>;

export default function PublicInfoPage({ kind }: { kind: PublicPageKind }) {
  const content = pageContent[kind];

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-10 md:py-20 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">{content.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-6xl">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/role-selection">
              <Button>Get started</Button>
            </Link>
            <Link to="/discover">
              <Button variant="secondary">Explore food</Button>
            </Link>
          </div>
        </div>
        <img alt="" className="aspect-[4/3] w-full rounded-lg border border-[#d8dfd8] object-cover shadow-sm" src={content.image} />
      </section>

      {kind === "contact" ? <ContactSection /> : null}
      {kind === "help" ? <HelpSection /> : null}
      {kind === "discover" ? <DiscoverSection /> : null}
      {kind !== "contact" && kind !== "help" && kind !== "discover" ? <StoryGrid kind={kind} /> : null}
    </>
  );
}

function StoryGrid({ kind }: { kind: PublicPageKind }) {
  const isCooker = kind === "cooker";
  const isDelivery = kind === "delivery";
  const cards = isCooker
    ? [
        ["Verify your kitchen", "Upload food safety and kitchen documentation for review.", <ClipboardCheck />],
        ["Build your menu", "List dishes, prices, prep windows, ingredients, and availability.", <ChefHat />],
        ["Manage orders", "Accept requests, set ready times, and coordinate delivery handoffs.", <Utensils />],
      ]
    : isDelivery
      ? [
          ["Verify documents", "Add license, vehicle, insurance, and registration information.", <ClipboardCheck />],
          ["Accept requests", "Receive nearby delivery requests with pickup and drop-off context.", <Truck />],
          ["Complete handoffs", "Confirm pickup, mark delivered, and track earnings placeholders.", <MapPin />],
        ]
      : [
          ["Cultural discovery", "Find dishes that match origin, favorites, location, and search intent.", <Sparkles />],
          ["Verified workflows", "Role-based onboarding supports trust across the marketplace.", <BadgeCheck />],
          ["Human support", "Support tickets, reviews, and admin tools keep operations visible.", <HeartHandshake />],
        ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(([title, text, icon]) => (
          <Card key={title as string} className="transition duration-200 hover:border-emerald">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#edf6ef] text-emerald">{icon}</span>
            <h2 className="mt-5 text-xl font-extrabold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HelpSection() {
  const faqs = [
    ["How do consumers order?", "Search food, choose a dish, review checkout details, then track the order timeline."],
    ["How are cookers verified?", "Cookers provide profile, safety certificate, kitchen, fridge, and sample food information."],
    ["Is payment live?", "Payment is a placeholder UI for now. Real payment integration is intentionally deferred."],
    ["How does support work?", "Users create support tickets that admins can review and update in later phases."],
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-10 md:py-16">
      <div className="space-y-4">
        {faqs.map(([question, answer]) => (
          <Card key={question}>
            <div className="flex gap-4">
              <HelpCircle className="mt-1 shrink-0 text-emerald" />
              <div>
                <h2 className="text-lg font-bold text-ink">{question}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{answer}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:px-10 md:py-16">
      <Card>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Mail className="text-emerald" size={32} />
            <h2 className="mt-4 text-2xl font-bold text-ink">Send a message</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              This is a Phase 5 contact UI. Message submission will connect to support tickets in a later workflow.
            </p>
          </div>
          <form className="space-y-4">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Textarea label="Message" placeholder="How can Freshtively help?" />
            <Button type="button">Submit placeholder</Button>
          </form>
        </div>
      </Card>
    </section>
  );
}

function DiscoverSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {["Homemade Beef Biryani", "Chicken Tehari", "Fresh Pupusas"].map((dish) => (
          <Card key={dish}>
            <ShieldCheck className="text-emerald" />
            <h2 className="mt-5 text-xl font-bold text-ink">{dish}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Public preview item. Live Firestore discovery is scheduled for the consumer dashboard phase.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
