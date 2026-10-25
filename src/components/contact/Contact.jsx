import { useState } from "react";
import { Link } from "react-router-dom";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

const INFO = [
  {
    icon: "fa-solid fa-phone",
    title: "Call To Us",
    text: "We are available 24/7, 7 days a week.",
    label: "+1 234 567 890",
    href: "tel:+1234567890",
  },
  {
    icon: "fa-solid fa-envelope",
    title: "Write To Us",
    text: "Fill out the form and we will reply within 24 hours.",
    label: "support@exclusive.com",
    href: "mailto:support@exclusive.com",
  },
  {
    icon: "fa-solid fa-location-dot",
    title: "Visit Us",
    text: "Our flagship store and head office.",
    label: "111 Bashundhara, Dhaka 1215",
  },
];

const FIELD =
  "w-full rounded-lg border border-solid border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20";
const LABEL = "mb-1.5 block text-sm font-medium text-gray-700";

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet: acknowledge the submission and reset the form.
    setSent(true);
    setForm(EMPTY_FORM);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="mb-8 text-sm text-gray-500">
        <Link to="/" className="hover:text-brand">Home</Link> /{" "}
        <span className="text-gray-900">Contact</span>
      </p>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-gray-500">We would love to hear from you.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <aside className="h-fit rounded-xl bg-gray-50 p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <ul className="m-0 list-none divide-y divide-gray-200 p-0">
            {INFO.map((item) => (
              <li key={item.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <i className={item.icon}></i>
                </span>
                <div>
                  <h2 className="m-0 text-base font-semibold text-gray-900">{item.title}</h2>
                  <p className="my-1 text-sm text-gray-500">{item.text}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-gray-900 hover:text-brand">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8 lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="contact-name" className={LABEL}>Name *</label>
              <input id="contact-name" type="text" name="name" placeholder="John Doe"
                value={form.name} onChange={handleChange} required className={FIELD} />
            </div>
            <div>
              <label htmlFor="contact-email" className={LABEL}>Email *</label>
              <input id="contact-email" type="email" name="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} required className={FIELD} />
            </div>
            <div>
              <label htmlFor="contact-phone" className={LABEL}>Phone *</label>
              <input id="contact-phone" type="tel" name="phone" placeholder="+1 234 567 890"
                value={form.phone} onChange={handleChange} required className={FIELD} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className={LABEL}>Message *</label>
            <textarea id="contact-message" name="message" rows="8" placeholder="How can we help you?"
              value={form.message} onChange={handleChange} required
              className={`${FIELD} resize-y`} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-4">
            {sent && (
              <p role="status" className="m-0 mr-auto text-sm font-medium text-green-600">
                <i className="fa-solid fa-circle-check"></i> Thanks! Your message has been sent.
              </p>
            )}
            <button
              type="submit"
              className="cursor-pointer rounded-lg border-0 bg-brand px-8 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Contact;
