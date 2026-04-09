import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(__dirname, '..');

try {
  console.log('[v0] Starting git operations...');
  
  // Change to project directory
  process.chdir(projectDir);
  
  // Stage all changes
  console.log('[v0] Staging changes...');
  execSync('git add -A', { stdio: 'inherit' });
  
  // Commit changes
  console.log('[v0] Committing changes...');
  execSync('git commit -m "chore: update GitHub links to abdunur-dev/zero-to-agent"', { stdio: 'inherit' });
  
  // Push to remote
  console.log('[v0] Pushing to GitHub...');
  execSync('git push origin portless-proxy-start', { stdio: 'inherit' });
  
  console.log('[v0] Success! Changes pushed to GitHub. Vercel deployment will update automatically.');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
