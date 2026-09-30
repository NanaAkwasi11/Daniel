import { Fragment, useEffect, useState } from 'react';
import { projectEntries } from './projectsData';
import { getPublishedProjectAdditions } from './projectService';

function Work() {
  const [projects, setProjects] = useState(projectEntries);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const websiteProjects = projects.filter((project) => !project.isFlyer);
  const flyerProjects = projects.filter((project) => project.isFlyer);
  const groupedProjects = [...websiteProjects, ...flyerProjects];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between gap-4">
          <a href="/" className="font-semibold text-white hover:text-amber-300 transition-colors">
            Daniel <span className="text-amber-300">/</span> Portfolio
          </a>
          <a href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
            Back to home
          </a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
        <div className="mb-9 sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-3">
            Portfolio / {projects.length} selected works
          </p>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Selected Work</h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Websites, digital products, and flyer designs. Browse the work and open a live project or enlarge a flyer sample.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {groupedProjects.map((project, index) => (
            <Fragment key={project.id}>
              {index === 0 && (
                <div className="col-span-full border-b border-white/10 pb-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Digital work</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Websites &amp; Web Apps</h2>
                </div>
              )}
              {index === websiteProjects.length && flyerProjects.length > 0 && (
                <div className="col-span-full mt-5 border-y border-amber-300/30 py-5 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Visual design · {flyerProjects.length} samples</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Flyer Design</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
                    Promotional graphics and custom flyer concepts. Select a sample to view it larger.
                  </p>
                </div>
              )}
              <article className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <button
                type="button"
                onClick={() => setSelectedImage({ image: project.image, title: project.title })}
                className="block w-full overflow-hidden bg-black/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
                aria-label={`Enlarge image for ${project.title}`}
              >
                <div className="aspect-[16/10] w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`h-full w-full ${project.isFlyer ? 'object-contain bg-white p-2' : 'object-cover'} transition-transform duration-300 hover:scale-[1.02]`}
                  />
                </div>
              </button>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-300">{project.status}</span>
                  <span className="text-xs text-gray-400">{project.duration}</span>
                </div>
                <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
                <p className="text-sm text-gray-300 mb-4">{project.subtitle}</p>
                <p className="text-sm leading-relaxed text-gray-300 mb-5">{project.longDescription}</p>

                <div className="mb-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Highlights</h3>
                  <ul className="space-y-1.5 text-sm text-gray-300">
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded bg-white/10 px-2.5 py-1 text-xs text-gray-200">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                      Visit project <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                      View source <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.isFlyer && (
                    <button
                      type="button"
                      onClick={() => setSelectedImage({ image: project.image, title: project.title })}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                    >
                      View flyer <span aria-hidden="true">⤢</span>
                    </button>
                  )}
                </div>
              </div>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.title} image preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-sm font-medium text-white hover:text-amber-300"
            >
              Close
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} className="max-h-[85vh] max-w-full object-contain" />
            <p className="pt-3 text-center font-medium text-white">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Work;