import { supabase } from './supabaseClient';

const PROJECTS_TABLE = 'portfolio_projects';
const PROJECTS_BUCKET = 'portfolio-project-images';

export const getPortfolioProjectImageUrl = (imagePath) => (
  supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(imagePath).data.publicUrl
);

const mapProjectRow = (row) => {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    longDescription: row.long_description,
    technologies: row.technologies || [],
    image: getPortfolioProjectImageUrl(row.image_path),
    github: row.source_url || '',
    demo: row.demo_url || '',
    status: row.status,
    duration: row.duration,
    features: row.features || [],
    isFlyer: row.project_type === 'flyer',
    color: row.color || 'from-cyan-500 to-blue-600'
  };
};

export const getPublishedProjectAdditions = async () => {
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data || []).map(mapProjectRow);
};

export const isPortfolioProjectAdmin = async () => {
  const { data, error } = await supabase.rpc('is_portfolio_project_admin');
  if (error) throw error;
  return data === true;
};

export const getAdminProjectAdditions = async () => {
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addPortfolioProject = async (project, imageFile) => {
  const extension = imageFile.name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') || 'img';
  const imagePath = `${crypto.randomUUID()}.${extension}`;
  const storage = supabase.storage.from(PROJECTS_BUCKET);

  const { error: uploadError } = await storage.upload(imagePath, imageFile, {
    cacheControl: '3600',
    upsert: false
  });

  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .insert({ ...project, image_path: imagePath })
    .select('*')
    .single();

  if (error) {
    await storage.remove([imagePath]);
    throw error;
  }

  return data;
};

export const deletePortfolioProject = async (projectId) => {
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select('image_path')
    .eq('id', projectId)
    .single();

  if (error) throw error;

  const { error: deleteError } = await supabase
    .from(PROJECTS_TABLE)
    .delete()
    .eq('id', projectId);

  if (deleteError) throw deleteError;

  const { error: storageError } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .remove([data.image_path]);

  if (storageError) throw storageError;
};