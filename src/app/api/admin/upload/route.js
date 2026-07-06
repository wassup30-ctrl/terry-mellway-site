import { NextResponse } from 'next/server';
import { verifyAuth, unauthorized } from '@/lib/auth';

const CATEGORY_DIRS = {
  'coloured-pencil': 'coloured-pencil',
  'watercolour': 'watercolour',
  'acrylic-oil': 'acrylic-oil',
  'blog': 'blog',
  'landing': 'misc',
};

const PREFIXES = {
  'coloured-pencil': 'cp',
  'watercolour': 'wc',
  'acrylic-oil': 'ao',
  'blog': 'blog',
  'landing': 'landing',
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getExt(filename) {
  const i = filename.lastIndexOf('.');
  return i > 0 ? filename.slice(i) : '.jpg';
}

async function getDataKV() {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext();
    return env.DATA || null;
  } catch {
    return null;
  }
}

// Choose a unique filename given the names that already exist in a directory.
function pickName(existingNames, category, name, ext) {
  if (category === 'blog' && name) {
    const base = `blog-${slugify(name)}`;
    let filename = `${base}${ext}`;
    let n = 2;
    while (existingNames.includes(filename)) {
      filename = `${base}-${n}${ext}`;
      n++;
    }
    return filename;
  }
  const prefix = PREFIXES[category];
  const nums = existingNames.map(f => {
    const match = f.match(new RegExp(`^${prefix}-(\\d+)`));
    return match ? parseInt(match[1], 10) : 0;
  });
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${prefix}-${String(next).padStart(2, '0')}${ext}`;
}

export async function POST(request) {
  if (!(await verifyAuth(request))) return unauthorized();

  const formData = await request.formData();
  const file = formData.get('file');
  const category = formData.get('category');
  const name = formData.get('name');

  if (!file || !category) {
    return NextResponse.json({ error: 'file and category are required' }, { status: 400 });
  }

  const dir = CATEGORY_DIRS[category];
  if (!dir) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const ext = getExt(file.name || '');
  const bytes = await file.arrayBuffer();

  // Production (Cloudflare Workers): store the image in the DATA KV namespace
  // under a media/<dir>/<file> key and serve it back via /api/media/<dir>/<file>.
  const kv = await getDataKV();
  if (kv) {
    const prefix = `media/${dir}/`;
    const listed = await kv.list({ prefix });
    const existingNames = listed.keys.map(k => k.name.slice(prefix.length));
    const filename = pickName(existingNames, category, name, ext);
    await kv.put(`${prefix}${filename}`, bytes, {
      metadata: { contentType: file.type || 'image/jpeg' },
    });
    return NextResponse.json({ path: `/api/media/${dir}/${filename}`, filename });
  }

  // Local dev: write to public/images and serve statically.
  let fs, path;
  try {
    fs = require('fs');
    path = require('path');
  } catch {
    return NextResponse.json(
      { error: 'No image storage available in this environment.' },
      { status: 501 }
    );
  }

  const targetDir = path.join(process.cwd(), 'public/images', dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const existingNames = fs.readdirSync(targetDir);
  const filename = pickName(existingNames, category, name, ext);
  fs.writeFileSync(path.join(targetDir, filename), Buffer.from(bytes));

  return NextResponse.json({ path: `/images/${dir}/${filename}`, filename });
}
