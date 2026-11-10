import myImage from './assets/my 3.jpg';
import useScrollAnimation from './useScrollAnimation';
import { useState, useEffect } from 'react';
import { projectEntries, workOnlyEntries } from './projectsData';

const liveSites = projectEntries.filter((p) => !p.isFlyer).length;
const designs = [...projectEntries, ...workOnlyEntries].filter((p) => p.isFlyer).length;

const stats = [
  { value: `${liveSites}+`, label: 'Live websites' },
  { value: `${designs}+`, label: 'Flyer designs' },
  { value: 'BSc', label: 'Computer Science' },
];

const services = [
  {
    title: 'Frontend Development',
    text: 'Responsive, fast interfaces built with React, Vite and Tailwind CSS that look sharp on every screen.',
    icon: (
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" />
    ),
  },
  {
    title: 'Backend & Data',
    text: 'APIs, authentication and databases with Django, Supabase and MongoDB that keep apps reliable.',
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </>
    ),
  },
  {
    title: 'Flyer & Graphic Design',
    text: 'Event flyers and promotional graphics with clear messaging and layouts that make ideas stand out.',
    icon: (
      <>
        <path d="M12 3a9 9 0 100 18c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16a5 5 0 005-5c0-4.1-4-7.8-9-7.8z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10.5" cy="7.5" r="1" />
        <circle cx="15" cy="8" r="1" />
      </>
    ),
  },
];

const stack = [
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Django', 'REST APIs'] },
  { group: 'Database', items: ['MongoDB', 'Supabase'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
];

function About() {
  const [headRef, headVisible] = useScrollAnimation('about');
  const [imageRef, imageVisible] = useScrollAnimation('about');
  const [textRef, textVisible] = useScrollAnimation('about');
  const [servicesRef, servicesVisible] = useScrollAnimation('about');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (!isImageModalOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsImageModalOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isImageModalOpen]);

  return (
    <>
      <style>
        {`
          .about-reveal {
            opacity: 0;
            transform: translateY(32px);
            transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .about-reveal.visible { opacity: 1; transform: none; }
          .about-delay-1 { transition-delay: 0.15s; }
          .about-delay-2 { transition-delay: 0.3s; }
          @media (prefers-reduced-motion: reduce) {
            .about-reveal { opacity: 1; transform: none; transition: none; }
          }
        `}
      </style>

      <section id="about" className="relative bg-stone-50 text-slate-900 py-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Soft background accents */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-40 h-80 w-80 rounded-full bg-slate-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div ref={headRef} className={`about-reveal ${headVisible ? 'visible' : ''} mb-14 md:mb-20 text-center`}>
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
              <span className="h-px w-8 bg-yellow-500" />
              About Me
              <span className="h-px w-8 bg-yellow-500" />
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              I build websites people <span className="relative whitespace-nowrap">
                <span className="relative z-10">enjoy using</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-3 bg-yellow-300/70 -z-0" />
              </span>
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Portrait */}
            <div ref={imageRef} className={`about-reveal ${imageVisible ? 'visible' : ''} lg:col-span-5`}>
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div aria-hidden="true" className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-yellow-400" />
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="group relative block w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-900/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                  aria-label="View larger photo of Daniel"
                >
                  <img
                    src={myImage}
                    alt="Daniel Osei Kyem"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-5 text-left">
                    <p className="text-lg font-semibold text-white">Daniel Osei Kyem</p>
                    <p className="text-sm text-slate-200">Full-Stack Developer · Designer</p>
                  </div>
                </button>

                <div className="absolute -top-4 left-4 sm:-left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to remote work
                </div>
              </div>
            </div>

            {/* Story */}
            <div ref={textRef} className={`about-reveal about-delay-1 ${textVisible ? 'visible' : ''} lg:col-span-7`}>
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  I'm a <span className="font-semibold text-slate-900">Full-Stack Developer and Computer Science graduate</span> who
                  enjoys turning ideas into practical, user-friendly digital products — from business websites and online
                  stores to community platforms.
                </p>
                <p>
                  I build modern, responsive web apps, connect them to solid backends and databases, and care about the
                  small details that make an interface feel effortless. I'm always learning and keeping up with modern tools.
                </p>
                <p>
                  Alongside development, I design <span className="font-semibold text-slate-900">flyers and promotional graphics</span> that
                  bring clear messaging and engaging visuals to events and brands.
                </p>
              </div>

              {/* Stats */}
              <dl className="mt-8 flex gap-3 sm:gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-white px-3 py-4 sm:px-5 sm:py-5 text-center shadow-sm">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl sm:text-3xl font-bold text-slate-900">{s.value}</dd>
                    <dd className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</dd>
                  </div>
                ))}
              </dl>

              {/* Stack */}
              <div className="mt-8 space-y-3">
                {stack.map(({ group, items }) => (
                  <div key={group} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">{group}</span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What I do */}
          <div ref={servicesRef} className={`about-reveal about-delay-2 ${servicesVisible ? 'visible' : ''} mt-20 md:mt-28`}>
            <p className="mb-8 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">What I do</p>
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-500/10"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-400 group-hover:text-slate-900">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">{s.title}</h4>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsImageModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo of Daniel"
        >
          <div className="relative max-h-full max-w-4xl">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 z-10 text-2xl text-white transition-colors hover:text-yellow-400"
              aria-label="Close image"
            >
              ✕
            </button>
            <img
              src={myImage}
              alt="Daniel Osei Kyem (large view)"
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default About;
