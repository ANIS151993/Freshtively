import {
  AlertTriangle,
  BadgeCheck,
  ChefHat,
  ClipboardCheck,
  Clock3,
  CreditCard,
  FileCheck2,
  Headphones,
  HeartHandshake,
  HelpCircle,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  UserPlus,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";

type PublicPageKind = "about" | "how" | "safety" | "cooker" | "delivery" | "help" | "contact" | "discover";

type GuideItem = {
  title: string;
  body: string;
  steps?: string[];
  icon?: ReactNode;
};

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
    title: "Use Freshtively step by step, from signup to delivery.",
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

const accountGuides: GuideItem[] = [
  {
    title: "Customer account",
    body: "Use this account when you want to browse local homemade food, place orders, track delivery, review cookers, and contact support.",
    icon: <Users />,
    steps: [
      "Open Get started, choose Customer, and enter your name, email, phone number, password, and delivery address.",
      "Confirm your contact details so cookers, delivery partners, and support can reach you about an active order.",
      "Add food preferences, allergy notes, favorite cuisines, and saved addresses in your profile.",
      "Browse Discover or the customer dashboard, add dishes to cart, and review all order details before checkout.",
      "Track the timeline after checkout: order placed, cooker accepted, preparing, ready for pickup, picked up, and delivered.",
    ],
  },
  {
    title: "Cooker account",
    body: "Use this account when you want to sell homemade cultural dishes through a verified kitchen profile.",
    icon: <ChefHat />,
    steps: [
      "Open Get started, choose Cooker, and enter your profile, kitchen name, email, phone number, and password.",
      "Upload required kitchen information, food safety certificate number, kitchen photos, fridge photos, and sample food details.",
      "Wait for admin review. A cooker should not publish or accept orders until verification is approved.",
      "Create dishes with clear names, photos, prices, ingredients, allergy warnings, portion details, prep time, and availability.",
      "When an order arrives, accept only if ingredients, kitchen time, and pickup timing are available.",
    ],
  },
  {
    title: "Delivery partner account",
    body: "Use this account when you want to receive delivery requests, pick up packed food from cookers, and deliver it to customers.",
    icon: <Truck />,
    steps: [
      "Open Get started, choose Delivery Partner, and enter your name, email, phone number, password, and service area.",
      "Add vehicle type, license, insurance, registration, and any required identity or safety information.",
      "Wait for verification before accepting delivery requests.",
      "Turn availability on, review pickup and drop-off information, then accept only deliveries you can complete on time.",
      "Confirm pickup, keep the package closed and upright, follow the route, confirm drop-off, and report any issue immediately.",
    ],
  },
];

const orderGuides: GuideItem[] = [
  {
    title: "Customer places an order",
    body: "The customer controls the order until checkout and can use notes to communicate food preferences or allergies.",
    icon: <CreditCard />,
    steps: [
      "Search by dish, cooker, cuisine, location, or cultural food type.",
      "Open a dish and check ingredients, allergy warnings, price, portion size, prep time, cooker profile, and reviews.",
      "Add the dish to cart, adjust quantity, and write important notes such as spice level or allergy concerns.",
      "Review delivery address, delivery fee, tip, estimated time, and total cost before placing the order.",
      "Place the order and watch status updates in Orders or Tracking.",
    ],
  },
  {
    title: "Cooker accepts and prepares",
    body: "The cooker is responsible for confirming that the order can be prepared safely, accurately, and on time.",
    icon: <Utensils />,
    steps: [
      "Open the cooker dashboard and review new order details, customer notes, allergies, quantities, and requested timing.",
      "Accept the order only if all ingredients, kitchen capacity, and safety requirements are ready.",
      "Set or confirm the ready time so the customer and delivery partner can follow the handoff.",
      "Prepare food in the verified kitchen, pack it securely, label allergy-sensitive items, and keep it at a safe temperature.",
      "Mark the order ready for pickup and hand it only to the assigned delivery partner.",
    ],
  },
  {
    title: "Delivery partner receives and delivers",
    body: "The delivery partner handles the physical handoff and must keep the order secure from pickup to drop-off.",
    icon: <PackageCheck />,
    steps: [
      "Open delivery requests and review distance, pickup location, drop-off area, timing, and special instructions.",
      "Accept the request only if you can arrive safely and on time.",
      "At pickup, confirm the order number, customer name, package count, and any handling notes with the cooker.",
      "Mark picked up, follow the route, keep food sealed, and avoid opening or changing the package.",
      "At drop-off, follow the customer instruction, mark delivered, and report delays, damage, missing items, or safety concerns.",
    ],
  },
];

const ruleGuides: GuideItem[] = [
  {
    title: "Customer conditions and rules",
    body: "Customers must use accurate account and delivery information and should review food information before ordering.",
    icon: <ListChecks />,
    steps: [
      "Provide a real name, reachable phone number, active email, and correct delivery address.",
      "Read dish ingredients and allergy notes before checkout. Tell the cooker about serious allergies in the order notes.",
      "Do not request unsafe, illegal, abusive, or off-platform transactions.",
      "Be available during delivery and use support if an order is late, incorrect, damaged, unsafe, or missing.",
      "Reviews must be honest and based on the actual order experience.",
    ],
  },
  {
    title: "Cooker conditions and rules",
    body: "Cookers must meet verification, food safety, listing accuracy, and handoff expectations before serving customers.",
    icon: <ShieldCheck />,
    steps: [
      "Use the approved cooker profile and keep safety certificate, kitchen, and contact information current.",
      "List only food you can prepare legally, safely, and consistently from the verified kitchen.",
      "Disclose ingredients, allergens, portion size, prep time, price, and availability accurately.",
      "Accept orders only when you can prepare them on time. Cancel or contact support early if a problem appears.",
      "Package food securely and hand it only to the assigned delivery partner or approved pickup person.",
    ],
  },
  {
    title: "Delivery partner conditions and rules",
    body: "Delivery partners must protect the order, customer privacy, and handoff timing.",
    icon: <Route />,
    steps: [
      "Keep license, insurance, vehicle, and profile information current before going online.",
      "Accept only requests you can complete safely within the expected pickup and delivery window.",
      "Never open, taste, repackage, or alter a customer's food.",
      "Use only the order information needed to complete the delivery and protect customer privacy.",
      "Report wrong addresses, unsafe locations, damaged packages, missing items, or emergencies through support.",
    ],
  },
];

const publicPageGuides: GuideItem[] = [
  {
    title: "About",
    body: "Read this page first to understand Freshtively's mission, who the platform serves, and why cultural homemade food is the center of the product.",
    icon: <Sparkles />,
    steps: [
      "Open About from the top navigation or footer.",
      "Review the mission and marketplace explanation.",
      "Use Get started when you are ready to choose customer, cooker, or delivery partner signup.",
    ],
  },
  {
    title: "Safety",
    body: "Use Safety to understand verification, food handling, document review, support reporting, and the basic trust rules for the marketplace.",
    icon: <ShieldCheck />,
    steps: [
      "Open Safety before placing orders, cooking, or delivering.",
      "Review cooker verification, delivery verification, allergy disclosure, packaging, and incident reporting.",
      "Contact the care center for unsafe food, illness concerns, harassment, damaged packages, or urgent order risks.",
    ],
  },
  {
    title: "Founder",
    body: "Use Founder to see the creator profile, ownership information, portfolio links, research links, and public professional identity behind Freshtively.",
    icon: <BadgeCheck />,
    steps: [
      "Open Founder from the navigation.",
      "Review the creator name, ownership message, and project highlights.",
      "Use the LinkedIn, GitHub, Google Scholar, ResearchGate, or portfolio links for external verification.",
    ],
  },
  {
    title: "Developer",
    body: "Use Developer to access the private developer portal for marketplace monitoring, admin-style visibility, system metrics, and owner controls.",
    icon: <FileCheck2 />,
    steps: [
      "Open Developer or Developer portal.",
      "Enter the private developer credential when authorized.",
      "Review marketplace users, orders, dishes, support, commissions, and operational data from the developer dashboard.",
    ],
  },
  {
    title: "Become a cooker",
    body: "Use Become a cooker when you want to sell homemade food through a verified kitchen workflow.",
    icon: <ChefHat />,
    steps: accountGuides[1].steps,
  },
  {
    title: "Help",
    body: "Use Help when you need step-by-step guidance before contacting support.",
    icon: <HelpCircle />,
    steps: [
      "Open Help and choose the closest question for your role.",
      "Follow the account, order, cooker verification, delivery, or payment explanation.",
      "Use the care center if the guide does not solve the issue.",
    ],
  },
  {
    title: "Contact",
    body: "Use Contact when you need to send Freshtively a direct support or partnership message.",
    icon: <Mail />,
    steps: [
      "Open Contact.",
      "Enter your name, email, role, optional order number, and message.",
      "Include the clearest issue details so customer care can route the request to the right workflow.",
    ],
  },
];

const pageGuides: Record<Exclude<PublicPageKind, "discover">, GuideItem[]> = {
  about: [
    {
      title: "What Freshtively is",
      body: "Freshtively is a marketplace for homemade cultural food. It connects customers, verified household cookers, delivery partners, and admins in one workflow.",
      icon: <Sparkles />,
    },
    {
      title: "Who uses it",
      body: "Customers order food, cookers prepare dishes, delivery partners complete handoffs, and the platform owner monitors safety, support, and marketplace health.",
      icon: <Users />,
    },
    {
      title: "Important information",
      body: "The app is built in phases. Some payment, ticket, and production operations may appear as placeholder interfaces until final integrations are connected.",
      icon: <AlertTriangle />,
    },
  ],
  how: [],
  safety: [
    {
      title: "Verification",
      body: "Cookers and delivery partners submit documents before they should operate. Admin review helps reduce risk before orders move through the marketplace.",
      icon: <FileCheck2 />,
    },
    {
      title: "Food safety",
      body: "Cookers should keep kitchens clean, separate allergens when possible, disclose ingredients, use secure packaging, and prepare orders only from approved locations.",
      icon: <ShieldCheck />,
    },
    {
      title: "Incident handling",
      body: "Customers, cookers, and delivery partners should contact care support for unsafe food, illness concerns, damaged packages, harassment, or delivery emergencies.",
      icon: <Headphones />,
    },
  ],
  cooker: [
    {
      title: "Become a cooker",
      body: "Start with cooker signup, complete profile and kitchen verification, create accurate menu items, then accept orders only when your kitchen is ready.",
      icon: <ChefHat />,
      steps: accountGuides[1].steps,
    },
    {
      title: "Menu quality",
      body: "Strong dish listings include clear photos, cultural origin, ingredients, allergens, portion size, preparation time, and availability windows.",
      icon: <ClipboardCheck />,
    },
    {
      title: "Cooker support",
      body: "Use the care center for document review questions, order cancellation, customer notes, payout issues, safety concerns, or delivery handoff problems.",
      icon: <MessageCircle />,
    },
  ],
  delivery: [
    {
      title: "Become a delivery partner",
      body: "Start with delivery signup, submit vehicle and identity information, wait for verification, then go online when you are ready to accept requests.",
      icon: <Truck />,
      steps: accountGuides[2].steps,
    },
    {
      title: "Handoff quality",
      body: "The delivery partner should confirm order identity, keep food sealed, avoid unnecessary delays, and complete the drop-off exactly as instructed.",
      icon: <PackageCheck />,
    },
    {
      title: "Delivery support",
      body: "Contact support for pickup delays, wrong addresses, unavailable customers, damaged packaging, safety concerns, or payout questions.",
      icon: <Headphones />,
    },
  ],
  help: [
    {
      title: "How to use Help",
      body: "Use Help when you need fast guidance before contacting support. Start with your role, then follow the account, order, safety, or payment topic.",
      icon: <HelpCircle />,
    },
    {
      title: "When to contact care",
      body: "Contact the care center when a live order is blocked, a document is rejected, a delivery is unsafe, an order is wrong, or account access fails.",
      icon: <Headphones />,
    },
  ],
  contact: [
    {
      title: "How to contact Freshtively",
      body: "Send your name, email, role, order number if available, and a clear description of the issue. Include screenshots or document details when relevant.",
      icon: <Mail />,
    },
    {
      title: "Urgent information",
      body: "For active order safety issues, contact support immediately from the account area when available. For emergencies, use local emergency services first.",
      icon: <AlertTriangle />,
    },
  ],
};

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
              <Button leftIcon={<UserPlus size={18} />}>Get started</Button>
            </Link>
            <Link to="/discover">
              <Button variant="secondary" leftIcon={<Search size={18} />}>
                Explore food
              </Button>
            </Link>
          </div>
        </div>
        <img alt="" className="aspect-[4/3] w-full rounded-lg border border-[#d8dfd8] object-cover shadow-sm" src={content.image} />
      </section>

      {kind === "how" ? <HowItWorksSection /> : null}
      {kind === "contact" ? <ContactSection /> : null}
      {kind === "help" ? <HelpSection /> : null}
      {kind === "discover" ? <DiscoverSection /> : null}
      {kind !== "contact" && kind !== "help" && kind !== "discover" && kind !== "how" ? <StoryGrid kind={kind} /> : null}
      {kind !== "discover" ? <PageGuideSection kind={kind} /> : null}
      {kind !== "discover" ? <CustomerCareCenter /> : null}
    </>
  );
}

function HowItWorksSection() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
        <SectionHeading
          eyebrow="Interactive account setup"
          title="Create the right account for your role"
          description="Open each role to see the full signup flow, what information is needed, and what happens before the account can be used."
        />
        <GuideAccordion items={accountGuides} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
        <SectionHeading
          eyebrow="Order journey"
          title="From customer order to kitchen acceptance to delivery"
          description="These steps explain the complete marketplace handoff so every user knows what to do and when to use support."
        />
        <GuideAccordion items={orderGuides} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
        <SectionHeading
          eyebrow="Conditions and rules"
          title="Rules for customers, cookers, and delivery partners"
          description="Freshtively works only when every role keeps account details accurate, communicates clearly, and follows safety expectations."
        />
        <GuideAccordion items={ruleGuides} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
        <SectionHeading
          eyebrow="Public page guide"
          title="Where to find About, Safety, Founder, Developer, Help, and Contact"
          description="These page notes explain what each public section is for and what information users should look for there."
        />
        <GuideAccordion items={publicPageGuides} />
      </section>
    </>
  );
}

function StoryGrid({ kind }: { kind: PublicPageKind }) {
  const isCooker = kind === "cooker";
  const isDelivery = kind === "delivery";
  const cards = isCooker
    ? [
        ["Verify your kitchen", "Upload food safety and kitchen documentation for admin review.", <ClipboardCheck />],
        ["Build your menu", "List dishes, prices, prep windows, ingredients, allergens, and availability.", <ChefHat />],
        ["Manage orders", "Accept requests, set ready times, and coordinate delivery handoffs.", <Utensils />],
      ]
    : isDelivery
      ? [
          ["Verify documents", "Add license, vehicle, insurance, registration, and service area information.", <ClipboardCheck />],
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

function PageGuideSection({ kind }: { kind: Exclude<PublicPageKind, "discover"> }) {
  const guides = pageGuides[kind];
  if (!guides.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
      <SectionHeading
        eyebrow="Important information"
        title={`${pageContent[kind].eyebrow} guide`}
        description="Use these notes as a practical checklist before you move to the next page or contact support."
      />
      <GuideAccordion items={guides} />
    </section>
  );
}

function HelpSection() {
  const faqs: GuideItem[] = [
    {
      title: "How do customers order?",
      body: "Search food, choose a dish, review checkout details, place the order, then track the order timeline.",
      icon: <Search />,
      steps: orderGuides[0].steps,
    },
    {
      title: "How are cookers verified?",
      body: "Cookers provide profile, safety certificate, kitchen, fridge, and sample food information for admin review.",
      icon: <ChefHat />,
      steps: accountGuides[1].steps,
    },
    {
      title: "How does delivery work?",
      body: "Delivery partners accept available requests, confirm pickup from the cooker, keep food sealed, and complete drop-off.",
      icon: <Truck />,
      steps: orderGuides[2].steps,
    },
    {
      title: "Is payment live?",
      body: "Payment is a placeholder UI for now. Real payment integration is intentionally deferred until the production payment phase.",
      icon: <CreditCard />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
      <SectionHeading
        eyebrow="Frequently asked questions"
        title="Quick answers by workflow"
        description="Open each topic for step-by-step help before submitting a support request."
      />
      <GuideAccordion items={faqs} />
    </section>
  );
}

function CustomerCareCenter() {
  const careCards = [
    {
      title: "Customer care",
      text: "Order missing, late delivery, wrong item, allergy concern, refund question, account access, or review issue.",
      icon: <Users />,
    },
    {
      title: "Cooker care",
      text: "Verification review, dish listing help, order cancellation, customer note, payout placeholder, or kitchen safety report.",
      icon: <ChefHat />,
    },
    {
      title: "Delivery care",
      text: "Pickup delay, unavailable customer, wrong address, damaged package, route issue, document review, or earnings question.",
      icon: <Truck />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
      <Card className="bg-[#f8fbf8]">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-emerald text-white">
              <Headphones />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-saffron-dark">Customer care center</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink">Support for every Freshtively role</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Include your role, order number if available, screenshots, document details, and the clearest description
              of what happened. For immediate danger or medical emergencies, contact local emergency services first.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-emerald">
              <span className="inline-flex items-center gap-2">
                <Mail size={16} /> support@freshtively.com
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={16} /> In-app support ticket
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} /> Active order issues first
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {careCards.map((card) => (
              <div key={card.title} className="rounded-lg border border-[#d8dfd8] bg-white p-5">
                <span className="text-emerald">{card.icon}</span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
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
              This contact form is a placeholder UI. Message submission will connect to support tickets in a later
              workflow.
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
              <li>Customer: include order number, dish name, and delivery address area.</li>
              <li>Cooker: include kitchen name, document status, or order number.</li>
              <li>Delivery partner: include pickup time, drop-off area, and delivery request details.</li>
            </ul>
          </div>
          <form className="space-y-4">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Role" placeholder="Customer, cooker, or delivery partner" />
            <Input label="Order number" placeholder="Optional" />
            <Textarea label="Message" placeholder="How can Freshtively help?" />
            <Button type="button" leftIcon={<MessageCircle size={18} />}>
              Submit placeholder
            </Button>
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

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted md:text-base">{description}</p>
    </div>
  );
}

function GuideAccordion({ items }: { items: GuideItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <details
          key={item.title}
          className="group rounded-lg border border-[#d8dfd8] bg-white p-5 shadow-sm open:border-emerald open:bg-[#fbfdfb]"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
            <span className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#edf6ef] text-emerald">
                {item.icon ?? <HelpCircle />}
              </span>
              <span>
                <span className="block text-lg font-extrabold text-ink">{item.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{item.body}</span>
              </span>
            </span>
            <span className="mt-1 rounded-full border border-[#cfd8d0] px-3 py-1 text-xs font-bold text-muted group-open:bg-emerald group-open:text-white">
              Open
            </span>
          </summary>
          {item.steps ? (
            <ol className="mt-5 grid gap-3 border-t border-[#edf0ed] pt-5">
              {item.steps.map((step, stepIndex) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron text-xs font-extrabold text-[#241400]">
                    {stepIndex + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </details>
      ))}
    </div>
  );
}
