/**
 * Seed Cloudflare KV with initial gallery and blog data.
 * Run: node scripts/seed-kv.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const KV_ID = 'caf5ce3b1d2a45b3a6e4799c95155849';

const gallery = fs.readFileSync(path.join(__dirname, '..', 'src/data/gallery.json'), 'utf-8');
const blog = fs.readFileSync(path.join(__dirname, '..', 'src/data/blog.json'), 'utf-8');

console.log('Seeding gallery data...');
execSync(`npx wrangler kv key put --namespace-id ${KV_ID} "gallery" '${gallery.replace(/'/g, "'\\''")}'`, { stdio: 'inherit' });

console.log('Seeding blog data...');
execSync(`npx wrangler kv key put --namespace-id ${KV_ID} "blog" '${blog.replace(/'/g, "'\\''")}'`, { stdio: 'inherit' });

console.log('Done!');
