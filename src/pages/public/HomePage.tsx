import {
  Apple,
  BadgeCheck,
  ChefHat,
  Clock,
  Download,
  ExternalLink,
  Github,
  Heart,
  Home,
  Linkedin,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";

const categories = ["Bangladeshi", "Mexican", "Caribbean", "Middle Eastern", "Ethiopian", "Korean"];

const dishes = [
  {
    name: "Homemade Beef Biryani",
    cook: "Ayesha Rahman",
    price: "$16.99",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chicken Mole Plate",
    cook: "Lucia Martinez",
    price: "$14.50",
    image:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Handmade Dumpling Box",
    cook: "Mei Chen",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80",
  },
];

const cookers = [
  { name: "Ayesha Rahman", cuisine: "Bangladeshi home kitchen", rating: "4.9", orders: "128 orders" },
  { name: "Lucia Martinez", cuisine: "Mexican family recipes", rating: "4.8", orders: "94 orders" },
  { name: "Mariam Haddad", cuisine: "Levant comfort food", rating: "4.9", orders: "111 orders" },
];

export default function HomePage() {
  const navigate = useNavigate();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/discover");
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#f6f7f4]">
        <div className="absolute inset-0">
          <img
            alt="Homemade cultural food spread"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1800&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f6f7f4] via-[#f6f7f4]/95 to-[#f6f7f4]/55" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-10 px-4 py-12 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#d8dfd8] bg-white px-3 py-2 text-sm font-bold text-emerald shadow-sm">
              <BadgeCheck size={18} />
              Verified local cooks, fresh homemade meals
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-tight text-ink md:text-7xl">
              Freshtively brings local home kitchens online.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              A professional food marketplace for customers, verified household cookers, and delivery partners with
              clear ordering, kitchen operations, delivery tracking, and owner oversight.
            </p>

            <form
              className="mt-8 grid gap-3 rounded-lg border border-[#d8dfd8] bg-white p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
              onSubmit={handleSearch}
            >
              <label className="flex min-h-14 items-center gap-3 rounded-md border border-[#e2e8e2] bg-[#fbfcfa] px-4 text-muted">
                <Search size={20} className="text-emerald" />
                <input
                  className="w-full border-0 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted focus:ring-0"
                  placeholder="Search biryani, tacos, dumplings"
                />
              </label>
              <label className="flex min-h-14 items-center gap-3 rounded-md border border-[#e2e8e2] bg-[#fbfcfa] px-4 text-muted">
                <MapPin size={20} className="text-emerald" />
                <input
                  className="w-full border-0 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted focus:ring-0"
                  placeholder="Enter ZIP or address"
                />
              </label>
              <Button type="submit" className="min-h-14 px-8">
                Find Food
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/discover">
                <Button leftIcon={<ShoppingBag size={18} />}>Order Homemade Food</Button>
              </Link>
              <Link to="/become-a-cooker">
                <Button variant="secondary" leftIcon={<ChefHat size={18} />}>
                  Become a Cooker
                </Button>
              </Link>
              <Link to="/become-a-delivery-person">
                <Button variant="ghost" leftIcon={<Truck size={18} />}>
                  Become a Delivery Partner
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden items-center justify-end lg:flex">
            <Card className="w-full max-w-md bg-white/95 p-0">
              <div className="border-b border-[#e1e7e1] p-5">
                <p className="text-sm font-extrabold text-ink">Live marketplace snapshot</p>
                <p className="mt-1 text-sm text-muted">Customer, cooker, and delivery flow</p>
              </div>
              <div className="grid gap-0">
                {[
                  ["Order placed", "Customer checkout completed", "10:24 AM"],
                  ["Kitchen accepted", "Cooker confirmed prep time", "10:27 AM"],
                  ["Courier matched", "Pickup route ready", "10:43 AM"],
                ].map(([title, text, time]) => (
                  <div key={title} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#eef1ee] p-5 last:border-b-0">
                    <div className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald" />
                      <div>
                        <p className="text-sm font-extrabold text-ink">{title}</p>
                        <p className="mt-1 text-sm text-muted">{text}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-muted">{time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <PublicSection
        eyebrow="How it works"
        title="A connected food workflow for every role"
        description="Freshtively is designed around the real handoffs between customer, cooker, and delivery partner."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon={<Search />} title="Discover" text="Search cultural dishes, nearby cooks, and favorites by location." />
          <FeatureCard icon={<ChefHat />} title="Cook" text="Verified household cooks accept orders and set ready times." />
          <FeatureCard icon={<Truck />} title="Deliver" text="Nearby delivery partners coordinate pickup and drop-off." />
        </div>
      </PublicSection>

      <PublicSection eyebrow="Cultural categories" title="Food that feels personal">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category}
              className="rounded-lg border border-[#d8dfd8] bg-white px-4 py-5 text-center text-sm font-bold text-ink shadow-sm transition hover:border-emerald hover:text-emerald"
              to="/discover"
            >
              {category}
            </Link>
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Popular dishes" title="Homemade plates ready to discover">
        <div className="grid gap-5 md:grid-cols-3">
          {dishes.map((dish) => (
            <Card key={dish.name} className="overflow-hidden p-0">
              <img alt={dish.name} className="h-52 w-full object-cover" src={dish.image} />
              <div className="p-5">
                <p className="text-lg font-bold text-ink">{dish.name}</p>
                <p className="mt-1 text-sm text-muted">{dish.cook}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-clay">{dish.price}</span>
                  <Link to="/discover">
                    <Button className="px-4 py-2">View</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Featured cookers" title="Local kitchens with trusted taste">
        <div className="grid gap-5 md:grid-cols-3">
          {cookers.map((cook) => (
            <Card key={cook.name}>
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-saffron-soft text-saffron-dark">
                  <Home size={26} />
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-soft px-3 py-1 text-sm font-bold text-emerald">
                  <Star size={15} fill="currentColor" /> {cook.rating}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">{cook.name}</h3>
              <p className="mt-2 text-sm text-muted">{cook.cuisine}</p>
              <p className="mt-4 text-sm font-semibold text-saffron-dark">{cook.orders}</p>
            </Card>
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Safety and trust" title="Built for confidence before the first bite">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon={<ShieldCheck />} title="Verification" text="Cooker and delivery onboarding supports safety and document review." />
          <FeatureCard icon={<Clock />} title="Live order states" text="Every handoff is designed around visible status updates." />
          <FeatureCard icon={<Heart />} title="Reviews and support" text="Ratings, support tickets, and admin monitoring are core workflows." />
        </div>
      </PublicSection>

      <PublicSection
        eyebrow="Creator"
        title="Built by Md Anisur Rahman Chowdhury"
        description="Freshtively is owned, designed, and developed by Md Anisur Rahman Chowdhury, with public profiles connected for professional, academic, and research context."
      >
        <Card>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-ink">Md Anisur Rahman Chowdhury</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Creator and copyright holder of Freshtively, a role-based Firebase marketplace system for homemade
                cultural food discovery, ordering, cooking operations, delivery handoffs, and admin oversight.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/founder">
                <Button leftIcon={<ExternalLink size={18} />}>Founder Profile</Button>
              </Link>
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-saffron px-5 py-2.5 text-sm font-semibold text-ink shadow-ambient transition duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                href="https://github.com/ANIS151993"
                rel="noreferrer"
                target="_blank"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-transparent px-5 py-2.5 text-sm font-semibold text-muted transition duration-200 hover:bg-emerald-soft"
                href="https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a"
                rel="noreferrer"
                target="_blank"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </Card>
      </PublicSection>

      <PublicSection eyebrow="Community voices" title="What Freshtively is built to make possible">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "I can find food that tastes like home without waiting for a festival.",
            "My kitchen can become a flexible local business on my own schedule.",
            "The delivery workflow makes every pickup and drop-off clear.",
          ].map((quote) => (
            <Card key={quote}>
              <Star className="text-saffron" fill="currentColor" />
              <p className="mt-5 text-base leading-7 text-muted">"{quote}"</p>
            </Card>
          ))}
        </div>
      </PublicSection>

      <section className="bg-emerald px-4 py-16 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-soft">App download placeholder</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Freshtively is ready for web first.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-soft">
              Mobile app links are placeholder UI for Phase 5 and can connect to real app stores later.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" leftIcon={<Apple size={18} />}>
              App Store
            </Button>
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20" leftIcon={<Download size={18} />}>
              Google Play
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function PublicSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function FeatureCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <Card className="transition duration-200 hover:border-emerald">
      <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#edf6ef] text-emerald">{icon}</span>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </Card>
  );
}
