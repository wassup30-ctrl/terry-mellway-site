import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CATEGORY_DIRS = {
  'coloured-pencil': 'coloured-pencil',
  'watercolour': 'watercolour',
  'acrylic-oil': 'acrylic-oil',
  'blog': 'blog',
};

const PREFIXES = {
  'coloured-pencil': 'cp',
  'watercolour': 'wc',
  'acrylic-oil': 'ao',
  'blog': 'blog',
};

export async function POST(request) {
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

  const targetDir = path.join(process.cwd(), 'public/images', dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const ext = path.extname(file.name) || '.jpg';
  let filename;

  if (category === 'blog' && name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    filename = `blog-${slug}${ext}`;
  } else {
    const prefix = PREFIXES[category];
    const existing = fs.readdirSync(targetDir)
      .filter(f => f.startsWith(prefix + '-'))
      .map(f => {
        const match = f.match(new RegExp(`^${prefix}-(\\d+)`));
        return match ? parseInt(match[1], 10) : 0;
      });
    const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
    filename = `${prefix}-${String(next).padStart(2, '0')}${ext}`;
  }

  const bytes = await file.arrayBuffer();
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, Buffer.from(bytes));

  const publicPath = `/images/${dir}/${filename}`;
  return NextResponse.json({ path: publicPath, filename });
}
