import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import CountUp from "../animations/CountUp";
import { fadeUp, scaleIn, slideLeft, slideRight, staggerContainer } from "../animations/variants";

// "10.5k" -> { to: 10.5, decimals: 1, suffix: "k" }
const parseStat = (value) => {
  const m = /^([\d.]+)(.*)$/.exec(value);
  return { to: parseFloat(m[1]), decimals: (m[1].split(".")[1] || "").length, suffix: m[2] };
};

const stats = [
  { id: 0, icon: "fa-solid fa-shop", value: "10.5k", label: "Active sellers on our site" },
  { id: 1, icon: "fa-solid fa-dollar-sign", value: "33k", label: "Monthly product sales" },
  { id: 2, icon: "fa-solid fa-bag-shopping", value: "45.5k", label: "Active customers" },
  { id: 3, icon: "fa-solid fa-sack-dollar", value: "25k", label: "Annual gross revenue" },
];

const features = [
  { id: 0, icon: "fa-solid fa-truck-fast", title: "Free and Fast Delivery", desc: "Free delivery for all orders over $140" },
  { id: 1, icon: "fa-solid fa-headset", title: "24/7 Customer Service", desc: "Friendly 24/7 customer support" },
  { id: 2, icon: "fa-solid fa-shield-halved", title: "Money Back Guarantee", desc: "We return money within 30 days" },
];

function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="mb-8 text-sm text-gray-500">
        <Link to="/" className="hover:text-brand">Home</Link> /{" "}
        <span className="text-gray-900">About</span>
      </p>

      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal variants={slideRight}>
          <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Our story
          </span>
          <h1 className="mb-4 mt-4 text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
            About Exclusive
          </h1>
          <p className="mb-4 leading-7 text-gray-600">
            Exclusive is your one-stop online shop for electronics, fashion,
            home essentials and more, delivered with fast shipping and friendly
            support.
          </p>
          <p className="mb-8 leading-7 text-gray-600">
            We work with trusted brands to bring you quality products at fair
            prices, and we are always growing our catalogue so there is
            something for everyone.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-white no-underline shadow-sm transition hover:bg-red-600"
          >
            Start shopping <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </Reveal>

        <Reveal variants={slideLeft} className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-red-50 to-white p-8 ring-1 ring-red-100">
          <img
            src="assets/photos/Side Image.png"
            alt="Shopping cart, shopping bags and a smartphone"
            className="h-auto max-h-[420px] w-full rounded-xl object-contain"
          />
        </Reveal>
      </section>

      <Reveal as="section" variants={staggerContainer(0.12)} aria-label="Key metrics" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={fadeUp} className="flex">
          <div
            className="group w-full flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:bg-brand hover:shadow-lg hover:ring-brand"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-brand transition group-hover:bg-white/20 group-hover:text-white">
              <i className={stat.icon}></i>
            </span>
            <h2 className="m-0 text-3xl font-bold text-gray-900 transition group-hover:text-white"><CountUp {...parseStat(stat.value)} /></h2>
            <p className="mt-2 text-sm text-gray-500 transition group-hover:text-white/90">{stat.label}</p>
          </div>
          </motion.div>
        ))}
      </Reveal>

      <Reveal as="section" variants={staggerContainer(0.15)} aria-label="Our services" className="mt-16 grid grid-cols-1 gap-8 rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-100 md:grid-cols-3">
        {features.map((f) => (
          <motion.div key={f.id} variants={scaleIn} className="flex flex-col items-center text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-xl text-white">
              <i className={f.icon}></i>
            </span>
            <h3 className="m-0 text-sm font-semibold uppercase tracking-wide text-gray-900">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </Reveal>
    </main>
  );
}

export default About;
