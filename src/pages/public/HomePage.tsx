import {
  BadgeCheck,
  ChefHat,
  Clock,
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
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";

const categories = [
  {
    name: "Bangladeshi",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Caribbean",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Middle Eastern",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ethiopian",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Korean",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
  },
];

const marketplaceStats = [
  ["3 roles", "Customer, cooker, delivery"],
  ["Live flow", "Order-to-handoff tracking"],
  ["Verified", "Kitchen and delivery review"],
];

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

const featuredSlides = [
  {
    title: "Homemade Beef Biryani",
    subtitle: "Ayesha Rahman Kitchen",
    meta: "Bangladeshi • 32 min • 4.9",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Chicken Mole Plate",
    subtitle: "Lucia Martinez",
    meta: "Mexican • 28 min • 4.8",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Handmade Dumpling Box",
    subtitle: "Mei Chen",
    meta: "Korean • 24 min • New",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1000&q=80",
  },
];

const cookers = [
  {
    name: "Ayesha Rahman",
    cuisine: "Bangladeshi home kitchen",
    rating: "4.9",
    orders: "128 orders",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Lucia Martinez",
    cuisine: "Mexican family recipes",
    rating: "4.8",
    orders: "94 orders",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Mariam Haddad",
    cuisine: "Levant comfort food",
    rating: "4.9",
    orders: "111 orders",
    image: "https://images.unsplash.com/photo-1556911073-52527ac43761?auto=format&fit=crop&w=700&q=80",
  },
];

const rolePanels = [
  {
    title: "Customer",
    text: "Search dishes, compare kitchens, place orders, and follow delivery status.",
    icon: <ShoppingBag />,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Cooker",
    text: "Publish menus, manage preparation windows, accept orders, and track payouts.",
    icon: <ChefHat />,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Delivery",
    text: "Review delivery requests, coordinate pickup, complete drop-off, and monitor earnings.",
    icon: <Truck />,
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=700&q=80",
  },
];

const trustPanels = [
  {
    title: "Verification",
    text: "Cooker and delivery onboarding supports safety and document review.",
    icon: <ShieldCheck />,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Live order states",
    text: "Every handoff is designed around visible status updates.",
    icon: <Clock />,
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Reviews and support",
    text: "Ratings, support tickets, and admin monitoring are core workflows.",
    icon: <Heart />,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % featuredSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/discover");
  }

  const slide = featuredSlides[activeSlide];

  return (
    <>
      <section className="relative overflow-hidden bg-[#f6f7f4]">
        <SafeImage
          alt=""
          className="absolute inset-0 h-full w-full"
          src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1800&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6f7f4] via-[#f6f7f4]/95 to-[#f6f7f4]/75" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#d8dfd8] bg-white px-3 py-2 text-sm font-bold text-emerald shadow-sm">
              <BadgeCheck size={18} />
              Verified local cooks, fresh homemade meals
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink md:text-6xl">
              Order homemade cultural food from trusted local kitchens.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Freshtively connects customers, household cookers, and delivery partners through one clear marketplace
              workflow.
            </p>

            <form
              className="mt-7 grid gap-3 rounded-lg border border-[#d8dfd8] bg-white p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
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

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
              <div className="group overflow-hidden rounded-lg border border-[#d8dfd8] bg-white shadow-sm">
                <div className="relative">
                  <SafeImage
                    alt="Fresh homemade meal"
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105 md:h-80"
                    fallbackLabel={slide.title}
                    src={slide.image}
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-emerald shadow-sm">
                    Featured now
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-extrabold text-ink">{slide.title}</p>
                      <p className="mt-1 text-sm font-semibold text-muted">{slide.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-[#edf6ef] px-3 py-1 text-sm font-extrabold text-emerald">
                      {activeSlide + 1}/{featuredSlides.length}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#e7ece7] pt-4 text-sm font-bold text-muted">
                    <span>{slide.meta}</span>
                    <Link className="text-emerald hover:underline" to="/discover">Order</Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-lg border border-[#d8dfd8] bg-white p-5 shadow-sm">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-emerald">Order flow</p>
                  <div className="mt-4 grid gap-3">
                    {[
                      ["Order placed", "Customer checkout"],
                      ["Kitchen accepted", "Cooker preparing"],
                      ["Courier matched", "Delivery assigned"],
                    ].map(([title, text]) => (
                      <div key={title} className="flex items-center gap-3 rounded-lg border border-[#edf1ed] bg-[#fbfcfa] p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
                        <div>
                          <p className="text-sm font-extrabold text-ink">{title}</p>
                          <p className="text-xs font-bold text-muted">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {featuredSlides.map((item, index) => (
                    <button
                      key={item.title}
                      aria-label={`Show ${item.title}`}
                      className={`h-2 flex-1 rounded-full transition ${index === activeSlide ? "bg-emerald" : "bg-[#d8dfd8]"}`}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {marketplaceStats.map(([value, label]) => (
                    <div key={value} className="rounded-lg border border-[#d8dfd8] bg-white p-3 shadow-sm">
                      <p className="text-base font-extrabold text-ink">{value}</p>
                      <p className="mt-1 text-[11px] font-bold leading-4 text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicSection eyebrow="Portals" title="One system for every marketplace role">
        <div className="grid gap-5 md:grid-cols-3">
          {rolePanels.map((panel) => (
            <FeatureCard
              key={panel.title}
              icon={panel.icon}
              image={panel.image}
              title={panel.title}
              text={panel.text}
            />
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Cultural categories" title="Food that feels personal">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              className="group overflow-hidden rounded-lg border border-[#d8dfd8] bg-white text-sm font-bold text-ink shadow-sm transition hover:-translate-y-1 hover:border-emerald hover:text-emerald hover:shadow-lg"
              to="/discover"
            >
              <SafeImage
                alt={category.name}
                className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                fallbackLabel={category.name}
                src={category.image}
              />
              <span className="block px-4 py-3 text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Popular dishes" title="Homemade plates ready to discover">
        <div className="grid gap-5 md:grid-cols-3">
          {dishes.map((dish) => (
            <Card key={dish.name} className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:border-emerald hover:shadow-lg">
              <SafeImage
                alt={dish.name}
                className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                fallbackLabel={dish.name}
                src={dish.image}
              />
              <div className="p-5">
                <p className="text-lg font-extrabold text-ink">{dish.name}</p>
                <p className="mt-1 text-sm text-muted">{dish.cook}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-ink">{dish.price}</span>
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
            <Card key={cook.name} className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:border-emerald hover:shadow-lg">
              <SafeImage
                alt={cook.name}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                src={cook.image}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-saffron-soft text-saffron-dark">
                    <Home size={24} />
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-soft px-3 py-1 text-sm font-bold text-emerald">
                    <Star size={15} fill="currentColor" /> {cook.rating}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{cook.name}</h3>
                <p className="mt-2 text-sm text-muted">{cook.cuisine}</p>
                <p className="mt-4 text-sm font-semibold text-saffron-dark">{cook.orders}</p>
              </div>
            </Card>
          ))}
        </div>
      </PublicSection>

      <PublicSection eyebrow="Safety and trust" title="Built for confidence before the first bite">
        <div className="grid gap-5 md:grid-cols-3">
          {trustPanels.map((panel) => (
            <FeatureCard
              key={panel.title}
              icon={panel.icon}
              image={panel.image}
              title={panel.title}
              text={panel.text}
            />
          ))}
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

function FeatureCard({
  icon,
  image,
  title,
  text,
}: {
  icon: ReactNode;
  image: string;
  title: string;
  text: string;
}) {
  return (
    <Card className="group overflow-hidden p-0 transition duration-200 hover:-translate-y-1 hover:border-emerald hover:shadow-lg">
      <SafeImage
        alt={title}
        className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
        src={image}
      />
      <div className="p-5">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#edf6ef] text-emerald">{icon}</span>
        <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
      </div>
    </Card>
  );
}

function SafeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#e8eee8] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6f1e8] via-white to-[#f7eadf]">
        <div className="absolute left-5 top-5 h-16 w-16 rounded-full bg-emerald/15" />
        <div className="absolute bottom-5 right-5 h-20 w-20 rounded-full bg-[#d26b2d]/15" />
        <div className="absolute inset-x-6 bottom-7 h-2 rounded-full bg-white/70" />
      </div>
      {!failed ? (
        <img
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
          src={src}
        />
      ) : null}
    </div>
  );
}
