import useScrollAnimation from './useScrollAnimation';
import { useState } from 'react';
import { submitContactForm } from './supabaseClient';

const PHONE = '+233599739719';

const contactMethods = [
  {
    id: 'email',
    label: 'Email',
    value: 'kyemdaniel23@gmail.com',
    note: 'I reply within 24 hours',
    action: 'mailto:kyemdaniel23@gmail.com',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+233 599 739 719',
    note: 'Chat about your project',
    action: 'https://wa.me/233599739719',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1012 2.2zm0 17.9a8.1 8.1 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1112 20.1zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '0599739719 · 0540743641',
    note: 'Call to talk it through',
    action: `tel:${PHONE}`,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Connect with me',
    note: 'Professional opportunities',
    action: 'https://www.linkedin.com/feed/',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
      </svg>
    ),
  },
];

const subjects = ['General Inquiry', 'Project Collaboration', 'Job Opportunity', 'Freelance Work', 'Other'];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition focus:border-yellow-400 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-yellow-400/30';

function Contact() {
  const [headRef, headVisible] = useScrollAnimation('contact');
  const [bodyRef, bodyVisible] = useScrollAnimation('contact', 0.05);

  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'General Inquiry' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // On desktop a tel: link usually does nothing, so copy the number instead.
  const handlePhoneClick = async (event) => {
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) return;
    event.preventDefault();
    try {
      await navigator.clipboard?.writeText(PHONE);
    } catch {
      // Clipboard can be blocked; still show the number below.
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', subject: 'General Inquiry' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <>
      <style>
        {`
          .contact-reveal {
            opacity: 0;
            transform: translateY(32px);
            transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .contact-reveal.visible { opacity: 1; transform: none; }
          @media (prefers-reduced-motion: reduce) {
            .contact-reveal { opacity: 1; transform: none; transition: none; }
          }
        `}
      </style>

      <section id="contact" className="relative overflow-hidden bg-slate-950 pt-24 text-white md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div ref={headRef} className={`contact-reveal ${headVisible ? 'visible' : ''} mx-auto mb-14 max-w-2xl text-center md:mb-16`}>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400 sm:text-sm">
              <span className="h-px w-8 bg-yellow-400" />
              Contact
              <span className="h-px w-8 bg-yellow-400" />
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let's build something <span className="text-yellow-400">together</span>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              Need a website, a web app or a flyer for your next event? Tell me about it and I'll get back to you.
            </p>
          </div>

          <div ref={bodyRef} className={`contact-reveal ${bodyVisible ? 'visible' : ''} grid gap-8 lg:grid-cols-5 lg:gap-10`}>
            {/* Contact methods */}
            <div className="space-y-3 lg:col-span-2">
              {contactMethods.map((m) => {
                const external = m.action.startsWith('http');
                const isPhone = m.id === 'phone';
                return (
                  <a
                    key={m.id}
                    href={m.action}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    onClick={isPhone ? handlePhoneClick : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-400/40 hover:bg-white/[0.06] sm:p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-slate-900">
                      {m.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{m.label}</span>
                      <span className="block truncate font-semibold text-white">{m.value}</span>
                      <span className="block text-sm text-slate-400">
                        {isPhone && copiedPhone ? <span className="text-emerald-400">Number copied to clipboard</span> : m.note}
                      </span>
                    </span>
                    <svg className="h-5 w-5 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                );
              })}

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Available for freelance and remote work
              </div>
            </div>

            {/* Form */}
            <div id="contact-form" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-3">
              <h3 className="text-xl font-bold sm:text-2xl">Send me a message</h3>
              <p className="mt-1 text-sm text-slate-400">Fill in the form and it lands straight in my inbox.</p>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
                    <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="Your full name" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
                    <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-300">What's it about?</span>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Subject">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={formData.subject === s}
                        onClick={() => setFormData({ ...formData, subject: s })}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          formData.subject === s
                            ? 'bg-yellow-400 text-slate-900'
                            : 'bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required className={`${inputClass} resize-none`} placeholder="Tell me about your project or idea..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-4 text-base font-semibold text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                    </>
                  )}
                </button>

                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center text-sm text-emerald-300">
                      Message sent! I'll get back to you soon.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-center text-sm text-red-300">
                      Couldn't send your message. Please try again or reach me by email or WhatsApp.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative mt-24 border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} Daniel Osei Kyem. All rights reserved.</p>
            <p>Designed &amp; built by Daniel</p>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Contact;
