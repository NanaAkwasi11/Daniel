import React, { useState, useEffect } from 'react';
import useScrollAnimation from './useScrollAnimation';

// Import project images
import ecommerceImage from './assets/E-Commerce Platform.jpeg';
import taskManagementImage from './assets/Task Management App.jpeg';
import weatherDashboardImage from './assets/Weather Dashboard.jpeg';
import africaOshImage from './assets/african.png';
import talentedBrainzImage from './assets/talented.png';
import jassanImage from './assets/jassn.PNG';
import mindMateImage from './assets/mindmate.png';
import greenfieldImage from './assets/greenfled.png';

function Projects() {
  const [titleRef, titleVisible] = useScrollAnimation('projects');
  const [projectsRef, projectsVisible] = useScrollAnimation('projects');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const openImageModal = (image, title) => setSelectedImage({ image, title });
  const closeImageModal = () => setSelectedImage(null);

  // Featured client projects and real work samples
  const projects = [
    {
      id: 1,
      title: "AfricaOSH",
      subtitle: "Open Science & Innovation Ecosystem",
      description: "A community-led platform for African open science, research collaboration, makerspaces, and innovation partnerships across the continent.",
      longDescription: "AfricaOSH promotes open science hardware, collaborative innovation, and accessible scientific tools across Africa. The platform highlights community growth, partnerships, summits, and initiatives that help researchers, makers, institutions, and innovators work together to advance practical science for real world impact.",
      technologies: ["Web Platform", "Community Growth", "Open Science", "Partnerships", "Events", "Innovation"],
      image: africaOshImage,
      github: "",
      demo: "https://www.africaosh.com/",
      status: "Live",
      duration: "Community platform",
      features: ["Open Science Advocacy", "Summits & Events", "Innovation Network", "Strategic Partnerships"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      title: "Talented Brainz Tech Hub",
      subtitle: "Tech Education & Youth Empowerment",
      description: "A modern digital presence for a Ghana-based innovation hub focused on AI, robotics, digital skills, and entrepreneurship for young people.",
      longDescription: "Talented Brainz Tech Hub supports Ghanaian youth with digital skills training, AI and robotics education, makerspace learning, business consulting, and practical innovation programs designed to bridge the digital divide and create opportunity across communities.",
      technologies: ["Education", "AI", "Robotics", "IoT", "Makerspace", "Branding"],
      image: talentedBrainzImage,
      github: "",
      demo: "https://www.talentedbrainztech.com/",
      status: "Live",
      duration: "Training platform",
      features: ["Digital Skills Training", "Robotics & IoT", "Makers Lodge", "Business Consulting"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      title: "JASSAN Technologies",
      subtitle: "STEM Education & Engineering Services",
      description: "An innovation and electrical services company delivering STEM education, research, automation, and practical engineering solutions for African communities.",
      longDescription: "JASSAN Technologies and Electrical Services combines hands-on STEM education, electrical and electronics services, curriculum development, IoT and smart automation, research, and component sales to help organizations and learners transform ideas into practical solutions.",
      technologies: ["STEM", "Research", "IoT", "Automation", "Electrical", "Curriculum"],
      image: jassanImage,
      github: "",
      demo: "https://jassan-innovations-hub.vercel.app/",
      status: "Live",
      duration: "Active business",
      features: ["Robotics Education", "Electrical Services", "IoT Automation", "Research & Development"],
      color: "from-violet-500 to-fuchsia-600"
    },
    {
      id: 4,
      title: "MindMate",
      subtitle: "Mental Wellness Web App",
      description: "A privacy-focused wellness web application that helps users track emotions, reflect on daily experiences, and access anonymous support in a safe digital space.",
      longDescription: "MindMate is a web application designed to support emotional wellbeing through mood tracking, anonymous peer support, guided reflection, and motivational encouragement. It focuses on making mental health support more approachable, private, and user-friendly for people who want help without pressure or exposure.",
      technologies: ["Web App", "Mental Wellness", "Anonymous Support", "Mood Tracking", "UX", "Wellbeing"],
      image: mindMateImage,
      github: "",
      demo: "https://minemate-phi.vercel.app/",
      status: "Live",
      duration: "Wellness web app",
      features: ["Mood Tracking", "Anonymous Support", "Private Experience", "Daily Guidance"],
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 5,
      title: "Greenfield Academy",
      subtitle: "School Brand & Student Experience",
      description: "A polished school website that presents admissions, academics, events, and student life while reinforcing a high-quality educational brand.",
      longDescription: "Greenfield Academy presents a strong educational identity with a focus on admissions, academics, STEM learning, school culture, and a bright student experience. The platform helps families and students understand the school’s values, programs, and community experience.",
      technologies: ["Education", "Admissions", "STEM", "School Brand", "Events", "Student Life"],
      image: greenfieldImage,
      github: "",
      demo: "https://greenfieldacademy.vercel.app/",
      status: "Live",
      duration: "School website",
      features: ["Admissions", "Academics", "STEM Lab", "Student Life"],
      color: "from-amber-500 to-orange-600"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && projectsVisible) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, projectsVisible, projects.length]);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const selectProject = (index) => {
    setActiveProject(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes staggerFadeIn {
            0% {
              transform: translateY(30px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.1s ease, transform 0.1s ease;
          }

          .animate-fade-in-up.visible {
            animation: fadeInUp 1s ease-out forwards;
          }

          .animate-stagger-1 {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.1s ease, transform 0.1s ease;
          }

          .animate-stagger-1.visible {
            animation: staggerFadeIn 0.8s ease-out forwards;
            animation-delay: 0.2s;
          }

          .animate-stagger-2 {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.1s ease, transform 0.1s ease;
          }

          .animate-stagger-2.visible {
            animation: staggerFadeIn 0.8s ease-out forwards;
            animation-delay: 0.4s;
          }

          .animate-stagger-3 {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.1s ease, transform 0.1s ease;
          }

          .animate-stagger-3.visible {
            animation: staggerFadeIn 0.8s ease-out forwards;
            animation-delay: 0.6s;
          }
        `}
      </style>

      <section id="projects" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 md:pt-32 text-white">
        <div className="w-screen max-w-none px-0 sm:px-4" style={{ width: '100vw' }}>
          <h2
            ref={titleRef}
            className={`text-xl sm:text-2xl lg:text-4xl font-bold text-center mb-4 sm:mb-8 lg:mb-16 text-white animate-fade-in-up ${titleVisible ? 'visible' : ''}`}
          >
            Featured Projects
          </h2>

          {/* Main Project Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div ref={projectsRef} className="relative">
              {/* Project Carousel */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r shadow-2xl" style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                '--tw-gradient-from': projects[activeProject].color.includes('blue') ? '#3b82f6' :
                                     projects[activeProject].color.includes('green') ? '#10b981' : '#f59e0b',
                '--tw-gradient-to': projects[activeProject].color.includes('blue') ? '#8b5cf6' :
                                   projects[activeProject].color.includes('green') ? '#06b6d4' : '#ef4444'
              }}>
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Project Info */}
                  <div className={`space-y-6 animate-slide-in-left ${projectsVisible ? 'visible' : ''}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          projects[activeProject].status === 'Completed'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {projects[activeProject].status}
                        </span>
                        <span className="text-white/70 text-sm">{projects[activeProject].duration}</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white">
                        {projects[activeProject].title}
                      </h3>
                      <p className="text-xl text-white/80 font-medium">
                        {projects[activeProject].subtitle}
                      </p>
                    </div>

                    <p className="text-white/90 text-lg leading-relaxed">
                      {projects[activeProject].longDescription}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {projects[activeProject].features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-white/90 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[activeProject].technologies.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {projects[activeProject].github && (
                        <a
                          href={projects[activeProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-lg text-center hover:bg-white/30 transition-all duration-300 font-medium"
                        >
                          View Code
                        </a>
                      )}
                      <a
                        href={projects[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${projects[activeProject].github ? 'flex-1' : 'w-full'} bg-white text-gray-900 py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-all duration-300 font-medium`}
                      >
                        {projects[activeProject].github ? 'Live Demo' : projects[activeProject].title === 'MindMate' ? 'Visit Web App' : 'Visit Website'}
                      </a>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className={`animate-slide-in-right ${projectsVisible ? 'visible' : ''}`}>
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => openImageModal(projects[activeProject].image, projects[activeProject].title)}
                    >
                      <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm"></div>
                      <img
                        src={projects[activeProject].image}
                        alt={projects[activeProject].title}
                        className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  onClick={prevProject}
                  className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  ←
                </button>

                {/* Project Indicators */}
                <div className="flex gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectProject(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeProject
                          ? 'bg-white scale-125'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextProject}
                  className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  →
                </button>
              </div>

              {/* Auto-play Toggle */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Image Modal */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        onClick={closeImageModal}
      >
        <div className="relative max-w-6xl max-h-full">
          {/* Close button */}
          <button
            onClick={closeImageModal}
            className="absolute -top-12 right-0 text-white text-2xl hover:text-yellow-400 transition-colors duration-300 z-10"
            aria-label="Close image"
          >
            ✕
          </button>

          {/* Large image */}
          <div className="relative">
            <img
              src={selectedImage.image}
              alt={`${selectedImage.title} (Large View)`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
              <p className="text-white text-center font-semibold">{selectedImage.title}</p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Projects;
