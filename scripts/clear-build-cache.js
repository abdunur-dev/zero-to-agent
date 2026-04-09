import fs from 'fs';
import path from 'path';

const cacheDir = path.join(process.cwd(), '.next');
const nodeCacheDir = path.join(process.cwd(), 'node_modules', '.cache');

try {
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('[v0] Cleared .next cache');
  }
} catch (e) {
  console.error('[v0] Failed to clear .next:', e.message);
}

try {
  if (fs.existsSync(nodeCacheDir)) {
    fs.rmSync(nodeCacheDir, { recursive: true, force: true });
    console.log('[v0] Cleared node_modules/.cache');
  }
} catch (e) {
  console.error('[v0] Failed to clear node_modules cache:', e.message);
}

console.log('[v0] Cache cleared successfully');
