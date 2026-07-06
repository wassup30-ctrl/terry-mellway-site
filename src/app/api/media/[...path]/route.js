// Public route that streams uploaded images out of the DATA KV namespace.
// Uploaded images are stored in KV on production under media/<dir>/<file> keys;
// existing bundled images under /images/... are still served as static assets
// and never reach this route.

export const dynamic = 'force-dynamic';

export async function GET(request, ctx) {
  const { path } = await ctx.params;
  const rel = (Array.isArray(path) ? path.join('/') : path || '').replace(/^\/+/, '');
  if (!rel) return new Response('Not found', { status: 404 });

  let env;
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    ({ env } = await getCloudflareContext());
  } catch {
    // No Cloudflare context (e.g. local dev) — images are served statically there.
    return new Response('Not found', { status: 404 });
  }

  const kv = env?.DATA;
  if (!kv) return new Response('Not found', { status: 404 });

  const { value, metadata } = await kv.getWithMetadata(`media/${rel}`, { type: 'arrayBuffer' });
  if (!value) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  headers.set('Content-Type', metadata?.contentType || 'image/jpeg');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(value, { headers });
}
