export const VALID_ROUTE_SEGMENTS = ['home', 'about', 'projects', 'skills', 'contact', 'admin', 'work'];

export function resolveRoute(pathname = '/', hash = '') {
  const normalizedPath = pathname ? pathname.replace(/\/+$/, '') : '/';
  const normalizedHash = typeof hash === 'string' ? hash.replace(/^#/, '').trim().toLowerCase() : '';

  const pathSegment = normalizedPath === '/' || normalizedPath === ''
    ? 'home'
    : normalizedPath.split('/').filter(Boolean).pop()?.toLowerCase() || 'home';

  const route = normalizedHash || pathSegment || 'home';
  return VALID_ROUTE_SEGMENTS.includes(route) ? route : 'home';
}

export function buildRoutePath(route = 'home') {
  const normalizedRoute = route?.toLowerCase();
  return normalizedRoute === 'home' || !normalizedRoute ? '/' : `/${normalizedRoute}`;
}

export function normalizeLocationUrl(pathname = window.location.pathname, hash = window.location.hash) {
  const route = resolveRoute(pathname, hash);
  const cleanPath = buildRoutePath(route);

  if (window.location.pathname !== cleanPath || window.location.hash) {
    window.history.replaceState({}, '', cleanPath);
  }

  return cleanPath;
}
