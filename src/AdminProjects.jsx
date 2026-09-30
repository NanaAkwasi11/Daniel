import { useEffect, useState } from 'react';
import {
  addPortfolioProject,
  deletePortfolioProject,
  getAdminProjectAdditions,
  getPortfolioProjectImageUrl
} from './projectService';

const emptyForm = {
  project_type: 'website',
  title: '',
  subtitle: '',
  description: '',
  long_description: '',
  demo_url: '',
  source_url: '',
  technologies: '',
  features: '',
  status: 'Live',
  duration: 'Website project'
};

const splitList = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refreshProjects = async () => {
    setLoading(true);
    setError('');
    try {
      setProjects(await getAdminProjectAdditions());
    } catch (loadError) {
      setError(loadError.message || 'Could not load portfolio projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');

    if (!imageFile) {
      setError('Choose an image for this project.');
      return;
    }
    if (imageFile.size > 10 * 1024 * 1024) {
      setError('The image must be 10 MB or smaller.');
      return;
    }
    if (form.project_type === 'website' && !form.demo_url.trim()) {
      setError('Add the live project URL for website projects.');
      return;
    }

    setSaving(true);
    try {
      await addPortfolioProject({
        project_type: form.project_type,
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        description: form.description.trim(),
        long_description: form.long_description.trim(),
        demo_url: form.demo_url.trim() || null,
        source_url: form.source_url.trim() || null,
        technologies: splitList(form.technologies),
        features: splitList(form.features),
        status: form.project_type === 'flyer' ? 'Design Sample' : form.status,
        duration: form.duration.trim() || (form.project_type === 'flyer' ? 'Graphic design' : 'Website project'),
        color: form.project_type === 'flyer' ? 'from-pink-500 to-rose-600' : 'from-cyan-500 to-blue-600',
        is_published: true
      }, imageFile);

      setForm(emptyForm);
      setImageFile(null);
      setImagePreview('');
      setNotice('Project added to the portfolio.');
      await refreshProjects();
    } catch (saveError) {
      setError(saveError.message || 'Could not add this project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Remove ${project.title} from the portfolio?`)) return;

    setDeletingId(project.id);
    setError('');
    setNotice('');
    try {
      await deletePortfolioProject(project.id);
      setProjects((current) => current.filter((item) => item.id !== project.id));
      setNotice('Project removed from the portfolio.');
    } catch (deleteError) {
      setError(deleteError.message || 'Could not remove this project.');
      await refreshProjects();
    } finally {
      setDeletingId(null);
    }
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Portfolio content</p>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-600 mt-1">New entries appear after the built-in projects on the public portfolio.</p>
        </div>
        <span className="text-sm text-gray-500">{projects.length} added project{projects.length === 1 ? '' : 's'}</span>
      </header>

      {error && <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
      {notice && <div role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-5 sm:p-7 space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add a project</h3>
          <span className="text-xs text-gray-500">Required fields marked *</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Project type *
            <select name="project_type" value={form.project_type} onChange={updateField} className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="website">Website / digital project</option>
              <option value="flyer">Flyer design</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Title *
            <input name="title" value={form.title} onChange={updateField} required maxLength={120} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
            Subtitle *
            <input name="subtitle" value={form.subtitle} onChange={updateField} required maxLength={160} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
            Short description
            <textarea name="description" value={form.description} onChange={updateField} rows={2} maxLength={500} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
            Project information *
            <textarea name="long_description" value={form.long_description} onChange={updateField} required rows={4} maxLength={3000} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Live project URL {form.project_type === 'website' && '*'}
            <input name="demo_url" type="url" value={form.demo_url} onChange={updateField} required={form.project_type === 'website'} placeholder="https://example.com" className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Source code URL
            <input name="source_url" type="url" value={form.source_url} onChange={updateField} placeholder="https://github.com/..." className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
            Image * <span className="font-normal text-gray-500">PNG, JPEG, WebP, or GIF; max 10 MB</span>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} required className="mt-1.5 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:font-medium file:text-gray-700 hover:file:bg-gray-200" />
            {imagePreview && <img src={imagePreview} alt="Selected project preview" className="mt-3 h-36 w-56 rounded border border-gray-200 object-contain bg-gray-50" />}
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Technologies <span className="font-normal text-gray-500">comma separated</span>
            <input name="technologies" value={form.technologies} onChange={updateField} placeholder="React, Supabase, Tailwind" className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Highlights <span className="font-normal text-gray-500">comma separated</span>
            <input name="features" value={form.features} onChange={updateField} placeholder="Responsive design, Online booking" className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Status
            <input name="status" value={form.project_type === 'flyer' ? 'Design Sample' : form.status} onChange={updateField} disabled={form.project_type === 'flyer'} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 disabled:bg-gray-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Project type label
            <input name="duration" value={form.duration} onChange={updateField} placeholder="E-commerce website" className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </label>
        </div>

        <div className="flex justify-end border-t border-gray-200 pt-4">
          <button type="submit" disabled={saving} className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
            {saving ? 'Adding project…' : 'Add project'}
          </button>
        </div>
      </form>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Added projects</h3>
        {loading ? (
          <p className="text-sm text-gray-500">Loading added projects…</p>
        ) : projects.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500">No additional projects yet.</p>
        ) : (
          <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                    <img src={getPortfolioProjectImageUrl(project.image_path)} alt={project.title} className="h-14 w-20 shrink-0 rounded border border-gray-200 bg-gray-50 object-contain" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{project.title}</p>
                    <p className="text-sm text-gray-500">{project.project_type === 'flyer' ? 'Flyer design' : 'Website / digital project'} · {project.status}</p>
                  </div>
                </div>
                <button type="button" onClick={() => handleDelete(project)} disabled={deletingId === project.id} className="self-start rounded border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 sm:self-auto">
                  {deletingId === project.id ? 'Removing…' : 'Remove'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default AdminProjects;