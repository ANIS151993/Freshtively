import { ArrowRight, BadgeCheck, ChefHat, Clock, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  {
    title: "Food consumer",
    description: "Order nearby homemade cultural food and track delivery.",
    helper: "Browse dishes, checkout, reorder, and follow order status.",
    to: "/signup/consumer",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80",
    accent: "bg-emerald",
  },
  {
    title: "Household cooker",
    description: "List your cultural dishes, accept orders, and manage prep.",
    helper: "Create menus, manage availability, orders, reviews, and payouts.",
    to: "/signup/cooker",
    icon: ChefHat,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
    accent: "bg-[#d26b2d]",
  },
  {
    title: "Delivery partner",
    description: "Accept local delivery requests and complete handoffs.",
    helper: "Handle pickup, drop-off, route flow, earnings, and documents.",
    to: "/signup/delivery",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80",
    accent: "bg-[#202a24]",
  },
];

export default function RoleSelectionPage() {
  return (
    <section className="w-full">
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-lg border border-[#d8dfd8] bg-[#111915] p-6 text-white shadow-sm sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(135deg,#111915_0%,#17231d_56%,#0d5f35_140%)] bg-[length:40px_40px,40px_40px,auto]" />
          <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#d26b2d]/25 blur-3xl freshtively-brand-pulse" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-extrabold">
                Create your account
              </div>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                Choose how you want to use Freshtively.
              </h1>
              <p className="mt-4 text-sm leading-6 text-[#d8e6dc] sm:text-base">
                Each account type gets a dedicated dashboard, permissions, and workflow connected to the same homemade
                food marketplace.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                ["Verified onboarding", BadgeCheck],
                ["Role-based dashboard", ShoppingBag],
                ["Live order workflow", Clock],
              ].map(([label, Icon]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                  <Icon className="shrink-0 text-[#f3a21b]" size={20} />
                  <span className="text-sm font-extrabold">{String(label)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {roles.map((role) => (
          <Link
            key={role.to}
            className="group overflow-hidden rounded-lg border border-[#d8dfd8] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
            to={role.to}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={role.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <span className={`absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-lg ${role.accent} text-white shadow-lg`}>
                <role.icon size={24} />
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-extrabold text-ink">{role.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">{role.description}</p>
              <p className="mt-4 border-t border-[#e5ebe5] pt-4 text-sm leading-6 text-muted">{role.helper}</p>
              <div className="mt-5 flex items-center justify-between text-sm font-extrabold text-emerald">
                <span>Continue</span>
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
