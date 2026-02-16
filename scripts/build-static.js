/**
 * Build script for static export.
 * Temporarily moves admin routes and middleware out of the way so Next.js
 * static export doesn't choke on dynamic API routes.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const appDir = path.join(root, 'src', 'app');
const tmpDir = path.join(root, '.admin-backup');

const items = [
  { src: path.join(appDir, 'admin'), bak: path.join(tmpDir, 'admin') },
  { src: path.join(appDir, 'api', 'admin'), bak: path.join(tmpDir, 'api-admin') },
];

function moveAside() {
  fs.mkdirSync(tmpDir, { recursive: true });
  for (const { src, bak } of items) {
    if (fs.existsSync(src)) {
      fs.cpSync(src, bak, { recursive: true });
      fs.rmSync(src, { recursive: true, force: true });
    }
  }
}

function restore() {
  for (const { src, bak } of items) {
    if (fs.existsSync(bak)) {
      fs.cpSync(bak, src, { recursive: true });
    }
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

try {
  moveAside();
  execSync('npx next build', {
    stdio: 'inherit',
    cwd: root,
    env: { ...process.env, STATIC_EXPORT: '1' },
  });
} finally {
  restore();
}
