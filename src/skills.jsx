import React, { useState } from 'react';
import useScrollAnimation from './useScrollAnimation';

// Crisp SVG technology icons
const TechIcon = ({ name, color }) => {
  const icons = {
    React: (
      <svg className="w-5 h-5" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill={color} />
        <g stroke={color} strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    TypeScript: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 13.5v-1.8H7.2V9.5h10.4v2.2h-4.3v1.8h-1.8zm4 4.5c.9.6 2 .9 3.2.9 1.4 0 2.3-.5 2.3-1.4 0-1-.8-1.5-2.6-2.1-2.4-.8-3.9-1.9-3.9-3.9 0-2.3 1.9-4 4.9-4 1.3 0 2.4.3 3.3.8l-.9 2.1c-.8-.5-1.7-.8-2.5-.8-1.4 0-2.1.6-2.1 1.3 0 .9.8 1.4 2.5 2 2.6.9 4.1 2 4.1 4.1 0 2.5-2 4.1-5.3 4.1-1.6 0-3-.4-4-1l1-2.1z" fill="#FFF" />
      </svg>
    ),
    JavaScript: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 16.5c.8.5 1.7.9 2.7.9 1.5 0 2.3-.7 2.3-1.9v-6.3h-2.4v6.2c0 .4-.2.6-.7.6-.4 0-.8-.1-1.1-.3l-.8 1.1zm8.3.1c.9.5 2 .8 3.1.8 1.4 0 2.3-.6 2.3-1.6 0-1-.8-1.5-2.5-2.2-2.3-.9-3.8-1.9-3.8-3.8 0-2.2 1.8-3.8 4.7-3.8 1.3 0 2.4.3 3.2.8l-.8 1.9c-.7-.4-1.5-.7-2.4-.7-1.3 0-2 .6-2 1.3 0 .8.7 1.3 2.4 1.9 2.5 1 3.9 2.1 3.9 4.1 0 2.5-1.9 3.9-5.1 3.9-1.5 0-2.9-.4-3.9-1l.9-1.6z" fill="#000" />
      </svg>
    ),
    Tailwind: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
      </svg>
    ),
    Vite: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="m21.6 4-9.3 16.7c-.3.5-1 .5-1.3 0L1.7 4c-.3-.6.1-1.3.8-1.3h18.3c.7 0 1.1.7.8 1.3z" fill={color} opacity="0.25" />
        <path d="M14.5 2.5 6.8 12.2h5.1L8.5 21.5l10.2-11.7h-5.2l3.8-7.3h-2.8z" fill={color} />
      </svg>
    ),
    'Node.js': (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M12 2 3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm0 2.3 6.5 3.7v7.5L12 19.3 5.5 15.5V8.1L12 4.3z" />
      </svg>
    ),
    Express: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0F172A">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V13h2v3.5zm0-5.5h-2V7h2v4z" />
      </svg>
    ),
    Python: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M11.9 2c-3.1 0-5.1.7-5.1 2.3v1.9h5.3v.8H4.6C2.9 7 2 8.7 2 10.9c0 2.3 1.1 3.9 3.1 3.9h1.7v-2.2c0-1.8 1.5-3.3 3.3-3.3h5.2V7.1c0-1.5-1.9-2.3-5-2.3H8.7c0-.5.5-1.1 1.7-1.1h4.7V2h-3.2zm-2 2.1c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zM12 22c3.1 0 5.1-.7 5.1-2.3v-1.9h-5.3v-.8h7.5c1.7 0 2.6-1.7 2.6-3.9 0-2.3-1.1-3.9-3.1-3.9h-1.7v2.2c0 1.8-1.5 3.3-3.3 3.3H8.6v2.2c0 1.5 1.9 2.3 5 2.3h1.6c0 .5-.5 1.1-1.7 1.1H8.8V22H12zm2-2.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    ),
    'REST APIs': (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 12h16M16 6l6 6-6 6M8 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Auth: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    MongoDB: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M12 2s-.2 1.4-.4 2.2C10.7 7.7 8.2 11.2 8.2 14c0 3.2 2 5.9 4 7.6.2.2.3.4.4.4s.2-.2.4-.4c2-1.7 4-4.4 4-7.6 0-2.8-2.5-6.3-3.4-9.8C12.2 3.4 12 2 12 2zm-.2 17.5c-1.5-1.4-2.8-3.4-2.8-5.5 0-2.3 1.8-5.2 2.8-8 .1.4.1.7.2 1.1v12.4h-.2z" />
      </svg>
    ),
    PostgreSQL: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M12 3a9 9 0 0 0-9 9c0 3.9 2.5 7.2 6 8.5v-3.2c-1.4-.4-2.2-1.6-2.2-3 0-1.7 1.3-3 3-3 .5 0 1 .1 1.4.4V8.5C10.4 8.2 9.7 8 9 8c-2.2 0-4 1.8-4 4s1.8 4 4 4v2.9c-4-1.2-7-4.9-7-9.4 0-5.5 4.5-10 10-10s10 4.5 10 10c0 4.5-3 8.2-7 9.4V16c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.7 0-1.4.2-2.2.5v3.2c.4-.3.9-.4 1.4-.4 1.7 0 3 1.3 3 3 0 1.4-.8 2.6-2.2 3v3.2c3.5-1.3 6-4.6 6-8.5a9 9 0 0 0-9-9z" />
      </svg>
    ),
    Supabase: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M13.3 2.1c.5-.8 1.7-.5 1.7.5v9.1h6.6c1 0 1.6 1.1 1 1.9l-8.6 11.2c-.6.8-1.8.4-1.8-.6v-9.1H5.6c-1 0-1.6-1.1-1-1.9L13.3 2.1z" />
      </svg>
    ),
    Docker: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M13.9 8.2h2.2v2h-2.2zm-2.8 0h2.2v2h-2.2zm-2.8 0h2.2v2H8.3zm-2.8 0h2.2v2H5.5zm5.6-2.6h2.2v2h-2.2zm-2.8 0h2.2v2H8.3zm-2.8 0h2.2v2H5.5zm16 5.6c-.4-.3-1.4-.4-2.3-.2-.1-.8-.6-1.5-1.3-1.9l-.6-.4-.4.6c-.4.7-.6 1.6-.4 2.5-.5.3-1.3.4-2.1.4H2.4c-.2.9 0 2.2.7 3.5 1.1 1.9 3.2 3.1 6.3 3.1 6.5 0 11.1-3.6 12.3-8.8.7.1 1.5-.1 1.9-.4l.3-.2-.3-.4c-.5-.5-1.2-.7-1.9-.8z" />
      </svg>
    ),
    AWS: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="M18.8 17.2c-2.8 2-6.5 3.1-10.2 3.1-4.7 0-9-1.8-12.4-4.8-.3-.3-.1-.7.2-.5 4 2.5 8.8 4 13.8 4 3.7 0 7.6-1 10.9-2.9.5-.3.9.3.5.7l-2.8.4zm2.4-1.2c-.3-.4-2.1-.2-3.1-.1-.3 0-.4-.3-.1-.5 1.7-1.2 4.4-.9 4.7-.5.3.4-.2 3.2-1.9 4.6-.3.2-.5.1-.4-.2.4-.9 1.1-2.9.8-3.3zM9.5 8.8c0 1.2-.7 2-2 2H6.2v2.4H4.5V6.8h3c1.3 0 2 .8 2 2zm-1.7 0c0-.5-.3-.7-.8-.7H6.2v1.5h.8c.5 0 .8-.3.8-.8zm7 4.4h-1.6l-1.3-4.3-1.3 4.3h-1.6L7.4 6.8h1.6l1.4 4.5 1.4-4.5h1.5l1.4 4.5 1.4-4.5h1.6l-2.1 6.4zm5.8-1.5c0 1.4-1.1 2.3-2.6 2.3-1.3 0-2.3-.6-2.7-1.7l1.3-.7c.3.7.8 1.1 1.4 1.1.7 0 1.1-.4 1.1-1 0-.6-.4-.9-1.5-1.2-1.6-.4-2.4-1.1-2.4-2.3 0-1.4 1.1-2.3 2.5-2.3 1.1 0 2 .5 2.5 1.5l-1.3.7c-.2-.5-.6-.9-1.2-.9-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.1 1.8.5 2.5 1.2 2.5 2.5z" />
      </svg>
    ),
    Git: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
        <path d="m21.7 10.8-8.5-8.5c-.7-.7-1.9-.7-2.6 0l-2 2 3.2 3.2c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l3.1 3.1c.8-.3 1.7-.1 2.3.5.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.7-.7-.8-1.7-.4-2.5l-2.9-2.9v4.9c.2.2.4.6.4 1 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.6.3-1.2.8-1.5V11c-.5-.3-.8-.9-.8-1.5 0-.8.5-1.5 1.2-1.7L7.3 4.6 2.3 9.6c-.7.7-.7 1.9 0 2.6l8.5 8.5c.7.7 1.9.7 2.6 0l8.3-8.3c.7-.7.7-1.9 0-2.6z" />
      </svg>
    ),
    GitHub: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0F172A">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    Testing: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    'UI/UX': (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    Performance: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  };

  return icons[name] || (
    <span className="font-bold text-xs" style={{ color }}>
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
};

export default function Skills() {
  const [titleRef, titleVisible] = useScrollAnimation('skills');
  const [skillsRef, skillsVisible] = useScrollAnimation('skills', 0.01);
  const [activeTab, setActiveTab] = useState('All');

  const skillGroups = [
    {
      category: 'Frontend',
      badge: 'Client & UI',
      accent: 'from-cyan-500 to-blue-600',
      pillBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      borderHover: 'hover:border-cyan-400 hover:shadow-cyan-100/60',
      skills: [
        { name: 'React', level: 'Expert', tag: 'UI Library', color: '#0284C7', percent: 92 },
        { name: 'JavaScript', level: 'Expert', tag: 'ES6+ / Core', color: '#CA8A04', percent: 90 },
        { name: 'TypeScript', level: 'Advanced', tag: 'Type-Safe', color: '#2563EB', percent: 88 },
        { name: 'Tailwind', level: 'Expert', tag: 'Styling', color: '#0891B2', percent: 90 },
        { name: 'Vite', level: 'Advanced', tag: 'Tooling', color: '#9333EA', percent: 84 },
      ]
    },
    {
      category: 'Backend',
      badge: 'APIs & Systems',
      accent: 'from-emerald-500 to-teal-600',
      pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      borderHover: 'hover:border-emerald-400 hover:shadow-emerald-100/60',
      skills: [
        { name: 'Node.js', level: 'Advanced', tag: 'Runtime', color: '#16A34A', percent: 88 },
        { name: 'Express', level: 'Advanced', tag: 'Framework', color: '#334155', percent: 86 },
        { name: 'Python', level: 'Proficient', tag: 'Scripting', color: '#0284C7', percent: 78 },
        { name: 'REST APIs', level: 'Expert', tag: 'Architecture', color: '#059669', percent: 90 },
        { name: 'Auth', level: 'Advanced', tag: 'OAuth & JWT', color: '#0D9488', percent: 82 },
      ]
    },
    {
      category: 'Data & Cloud',
      badge: 'Storage & Ops',
      accent: 'from-violet-500 to-purple-600',
      pillBg: 'bg-violet-50 text-violet-700 border-violet-200',
      borderHover: 'hover:border-violet-400 hover:shadow-violet-100/60',
      skills: [
        { name: 'MongoDB', level: 'Proficient', tag: 'NoSQL', color: '#15803D', percent: 80 },
        { name: 'PostgreSQL', level: 'Proficient', tag: 'Relational', color: '#2563EB', percent: 76 },
        { name: 'Supabase', level: 'Advanced', tag: 'BaaS & Realtime', color: '#059669', percent: 82 },
        { name: 'Docker', level: 'Proficient', tag: 'Containers', color: '#0284C7', percent: 76 },
        { name: 'AWS', level: 'Proficient', tag: 'Infrastructure', color: '#EA580C', percent: 70 },
      ]
    },
    {
      category: 'Workflow',
      badge: 'DevOps & Quality',
      accent: 'from-amber-500 to-orange-500',
      pillBg: 'bg-amber-50 text-amber-700 border-amber-200',
      borderHover: 'hover:border-amber-400 hover:shadow-amber-100/60',
      skills: [
        { name: 'Git', level: 'Expert', tag: 'Version Control', color: '#EA580C', percent: 92 },
        { name: 'GitHub', level: 'Expert', tag: 'CI/CD & Actions', color: '#0F172A', percent: 90 },
        { name: 'Testing', level: 'Proficient', tag: 'Unit & E2E', color: '#E11D48', percent: 80 },
        { name: 'UI/UX', level: 'Advanced', tag: 'Design Systems', color: '#D97706', percent: 84 },
        { name: 'Performance', level: 'Advanced', tag: 'Optimization', color: '#7C3AED', percent: 82 },
      ]
    }
  ];

  const categories = ['All', ...skillGroups.map(g => g.category)];

  const filteredGroups = activeTab === 'All'
    ? skillGroups
    : skillGroups.filter(g => g.category === activeTab);

  return (
    <section id="skills" className="relative min-h-screen bg-gray-100 py-20 sm:py-28 text-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${
            titleVisible !== false ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-900 bg-white mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
              DEVELOPER TOOLKIT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Core Engineering Skills
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Designing and shipping modern web products with strong frontend craft, reliable backend systems, and scalable delivery workflows.
          </p>

          {/* Category Filter Pills with explicit high-contrast inline styles */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isSelected = activeTab === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  style={{
                    backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    borderColor: '#0f172a',
                  }}
                  className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 border-2 cursor-pointer shadow-sm hover:opacity-90"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div
          ref={skillsRef}
          className={`mt-12 transition-all duration-700 ease-out ${
            skillsVisible !== false ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`grid gap-6 ${
            filteredGroups.length === 1 ? 'max-w-xl mx-auto grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
          }`}>
            {filteredGroups.map((group) => (
              <div
                key={group.category}
                className="group relative rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mb-4 h-1.5 w-full rounded-full bg-gradient-to-r ${group.accent}`} />
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{group.category}</h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-1 uppercase tracking-[0.12em]">
                      {group.badge}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-slate-900 shrink-0">
                            <TechIcon name={skill.name} color={skill.color} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900 truncate">{skill.name}</div>
                            <div className="text-[11px] text-slate-600 font-medium truncate">{skill.tag}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-900 text-white whitespace-nowrap">
                          {skill.level}
                        </span>
                      </div>

                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${skill.percent}%`,
                            backgroundColor: skill.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
