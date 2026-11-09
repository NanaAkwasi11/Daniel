import { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';
import { projectEntries } from './projectsData';
import { getPublishedProjectAdditions } from './projectService';

const ArrowIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const linkLabel = (p) => (p.title === 'MindMate' ? 'Visit web app' : 'Visit website');

function ProjectImage({ project, onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className={`group/img relative block w-full overflow-hidden rounded-xl bg-slate-800 ring-1 ring-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 ${className}`}
      aria-label={`Enlarge image of ${project.title}`}
    >
      {!project.isFlyer && (
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-900 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
      )}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className={`w-full transition-transform duration-700 group-hover/img:scale-[1.03] ${
          project.isFlyer ? 'aspect-[4/5] object-contain bg-slate-800 p-3' : 'aspect-[16/10] object-cover object-top'
        }`}
      />
    </button>
  );
}

function Projects() {
  const [headRef, headVisible] = useScrollAnimation('projects');
  const [featuredRef, featuredVisible] = useScrollAnimation('projects');
  const [gridRef, gridVisible] = useScrollAnimation('projects', 0.05);
  const [projects, setProjects] = useState(projectEntries);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    getPublishedProjectAdditions()
      .then((additions) => {
        if (isCurrent) setProjects([...projectEntries, ...additions]);
      })
      .catch((error) => console.error('Unable to load additional projects:', error));
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const websites = projects.filter((p) => !p.isFlyer);
  const designs = projects.filter((p) => p.isFlyer);
  const [featured, ...rest] = websites;

  // If the last card would sit alone on its row, stretch it across the row
  // and lay it out side by side so the grid ends cleanly.
  const aloneAtSm = rest.length % 2 === 1;
  const aloneAtLg = rest.length % 3 === 1;
  const lastCardClass = [
    aloneAtSm && 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-6',
    aloneAtLg ? 'lg:col-span-3 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8' : aloneAtSm && 'lg:col-span-1 lg:flex',
  ].filter(Boolean).join(' ');

  return (
    <>
      <style>
        {`
          .proj-reveal {
            opacity: 0;
            transform: translateY(32px);
            transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .proj-reveal.visible { opacity: 1; transform: none; }
          @media (prefers-reduced-motion: reduce) {
            .proj-reveal { opacity: 1; transform: none; transition: none; }
          }
        `}
      </style>

      <section id="projects" className="relative overflow-hidden bg-slate-950 py-24 text-white md:pt-36 md:pb-32">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div ref={headRef} className={`proj-reveal ${headVisible ? 'visible' : ''} mb-14 flex flex-col items-center gap-6 text-center md:mb-16 md:flex-row md:items-end md:justify-between md:text-left`}>
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400 sm:text-sm">
                <span className="h-px w-8 bg-yellow-400" />
                Selected Work
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Featured projects</h2>
              <p className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
                Real websites I've designed and built for businesses, schools and communities — all live and in use.
              </p>
            </div>
            <a
              href="/work"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              View all work
              <ArrowIcon />
            </a>
          </div>

          {/* Featured project */}
          {featured && (
            <article
              ref={featuredRef}
              className={`proj-reveal ${featuredVisible ? 'visible' : ''} grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 lg:grid-cols-12 lg:gap-12 lg:p-8`}
            >
              <div className="lg:col-span-7">
                <ProjectImage project={featured} onOpen={setSelected} />
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                  <span className="rounded-full bg-yellow-400 px-3 py-1 text-slate-900">Latest</span>
                  <span className="text-slate-400">{featured.duration}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{featured.title}</h3>
                <p className="mt-1 font-medium text-yellow-400">{featured.subtitle}</p>
                <p className="mt-4 leading-relaxed text-slate-300">{featured.longDescription || featured.description}</p>
                {featured.features?.length > 0 && (
                  <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    {featured.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.technologies?.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">{t}</span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {featured.demo && (
                    <a href={featured.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
                      {linkLabel(featured)} <ArrowIcon />
                    </a>
                  )}
                  {featured.github && (
                    <a href={featured.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold transition hover:border-white/40">
                      View code
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Project grid */}
          <div ref={gridRef} className={`proj-reveal ${gridVisible ? 'visible' : ''} mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
            {rest.map((p, i) => (
              <article
                key={p.id}
                className={`group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/[0.05] ${
                  i === rest.length - 1 ? lastCardClass : ''
                }`}
              >
                <ProjectImage project={p} onOpen={setSelected} />
                <div className="flex flex-1 flex-col px-1 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{p.duration}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-sm font-medium text-yellow-400/90">{p.subtitle}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies?.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400 ring-1 ring-white/10">{t}</span>
                    ))}
                  </div>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-white transition group-hover:text-yellow-400"
                    >
                      {linkLabel(p)} <ArrowIcon />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Design work */}
          {designs.length > 0 && (
            <div className="mt-20">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">Flyer &amp; graphic design</h3>
                  <p className="mt-1 text-sm text-slate-400">A few promotional designs. Tap any one to view it full size.</p>
                </div>
              </div>
              <div className="flex gap-4 sm:grid sm:grid-cols-3 lg:max-w-3xl">
                {designs.map((p) => (
                  <div key={p.id} className="min-w-0 flex-1">
                    <ProjectImage project={p} onOpen={setSelected} />
                    <p className="mt-2 truncate text-sm font-medium text-slate-300">{p.title}</p>
                  </div>
                ))}
                <a
                  href="/work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hidden aspect-[4/5] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 text-center text-slate-400 transition hover:border-yellow-400 hover:text-yellow-400 sm:flex"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition group-hover:bg-yellow-400 group-hover:text-slate-900">
                    <ArrowIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold">See all designs</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div className="relative max-h-full max-w-6xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 z-10 text-2xl text-white transition-colors hover:text-yellow-400"
              aria-label="Close image"
            >
              ✕
            </button>
            <img
              src={selected.image}
              alt={`${selected.title} (large view)`}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-3 text-center font-semibold text-white">{selected.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;
