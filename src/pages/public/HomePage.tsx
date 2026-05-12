import {
  Apple,
  BadgeCheck,
  ChefHat,
  Clock,
  Download,
  Heart,
  Home,
  Leaf,
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
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-cream-dim">
        <div className="absolute inset-0">
          <img
            alt="Homemade cultural food spread"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1800&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-dim via-cream-dim/90 to-cream-dim/20" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-bold text-[#2a1700] shadow-ambient">
              <BadgeCheck size={18} />
              Verified local cooks, fresh homemade meals
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-ink md:text-7xl">
              Taste the heart of every home
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Discover authentic cultural dishes from trusted household cooks nearby, then track every order from
              kitchen acceptance to delivery.
            </p>

            <form
              className="mt-8 grid gap-3 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-lift md:grid-cols-[1fr_1fr_auto]"
              onSubmit={handleSearch}
            >
              <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-cream px-4 text-muted">
                <Search size={20} className="text-emerald" />
                <input
                  className="w-full border-0 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted focus:ring-0"
                  placeholder="Search biryani, tacos, dumplings"
                />
              </label>
              <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-cream px-4 text-muted">
                <MapPin size={20} className="text-emerald" />
                <input
                  className="w-full border-0 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted focus:ring-0"
                  placeholder="Enter ZIP or address"
                />
              </label>
              <Button type="submit" className="min-h-14 rounded-2xl px-8">
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

          <div className="hidden items-end justify-end lg:flex">
            <Card className="max-w-sm bg-white/95">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-soft text-emerald">
                  <Leaf size={24} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Live demo flow</p>
                  <p className="text-sm text-muted">Cooker accepted, delivery searching</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {["Order placed", "Cooker accepted", "Delivery assigned"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-muted">
                    <span className="h-3 w-3 rounded-full bg-emerald" />
                    {item}
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
              className="rounded-2xl border border-[#bbcabf]/70 bg-white/85 px-4 py-5 text-center text-sm font-bold text-ink shadow-ambient transition hover:-translate-y-1 hover:text-emerald hover:shadow-lift"
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
    <Card className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-soft text-emerald">{icon}</span>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </Card>
  );
}
