import galleryJson from '@/data/gallery.json';
import blogJson from '@/data/blog.json';

async function getKV() {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext();
    return env.DATA || null;
  } catch {
    return null;
  }
}

// ── Gallery ──────────────────────────────────────────────────────────

export async function getGalleryData() {
  const kv = await getKV();
  if (kv) {
    const data = await kv.get('gallery', 'json');
    if (data) return data;
  }
  return galleryJson;
}

export async function setGalleryData(data) {
  const kv = await getKV();
  if (kv) {
    await kv.put('gallery', JSON.stringify(data));
    return;
  }
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/gallery.json'),
    JSON.stringify(data, null, 2) + '\n'
  );
}

// ── Blog ─────────────────────────────────────────────────────────────

export async function getBlogData() {
  const kv = await getKV();
  if (kv) {
    const data = await kv.get('blog', 'json');
    if (data) return data;
  }
  return blogJson;
}

export async function setBlogData(data) {
  const kv = await getKV();
  if (kv) {
    await kv.put('blog', JSON.stringify(data));
    return;
  }
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/blog.json'),
    JSON.stringify(data, null, 2) + '\n'
  );
}
