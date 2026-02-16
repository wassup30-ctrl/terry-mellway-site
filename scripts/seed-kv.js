/**
 * Seed Cloudflare KV with initial gallery and blog data.
 * Run: node scripts/seed-kv.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const KV_ID = '79e46690f7db4e8789c27f32a80148d5';

const gallery = fs.readFileSync(path.join(__dirname, '..', 'src/data/gallery.json'), 'utf-8');
const blog = fs.readFileSync(path.join(__dirname, '..', 'src/data/blog.json'), 'utf-8');

console.log('Seeding gallery data...');
execSync(`npx wrangler kv key put --namespace-id ${KV_ID} "gallery" '${gallery.replace(/'/g, "'\\''")}'`, { stdio: 'inherit' });

console.log('Seeding blog data...');
execSync(`npx wrangler kv key put --namespace-id ${KV_ID} "blog" '${blog.replace(/'/g, "'\\''")}'`, { stdio: 'inherit' });

console.log('Done!');
